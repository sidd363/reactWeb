var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var BusinessCount = require('./../BusinessCount.jsx');
var BusinessSearch = require('./../common/BusinessSearch.jsx');
var MyJobsListCard = require('./../common/MyJobsListCard.jsx');
var MySavedSearchesListCard = require('./../common/MySavedSearchesListCard.jsx');
var MySelectionsListCard = require('./../common/MySelectionsListCard.jsx');
var AddJobModal = require('./../MyJobs/AddJobModal.jsx');
var ProfileStore = require('./../../../stores/ProfileStore.js');
var ProfileActions = require('./../../../actions/ProfileActions.js');
var RecentSearches = require('../SearchPeople/RecentSearches.jsx');
var requestLib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');

var BusinessHome = React.createClass({
    getInitialState: function() {
        return {
            showModal: false,
            postedJobs: ProfileStore.getState().jobposts,
            savedSearches: ProfileStore.getState().savedSearches,
            mySelections: ProfileStore.getState().mySelections
        }
    },

    componentWillMount: function() {
        var that = this;
        ProfileStore.listen(function(state) {
            that.setState({postedJobs: state.jobposts, savedSearches: state.savedSearches, mySelections: state.mySelections});
        });
    },

    componentDidMount: function() {
        ProfileActions.loadJobPosts();
        ProfileActions.loadSavedSearches();
        ProfileActions.loadMySelections();
    },

    componentWillUnmount: function() {
        ProfileStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState({postedJobs: state.jobposts, savedSearches: state.savedSearches, mySelections: state.mySelections});
    },

    handleHideModal: function() {
      ProfileActions.loadJobPosts();
        this.setState({
            showModal: false
        })
    },

    handleShowModal: function() {
        var modalTitle = "Add a Job";

        this.setState({
            showModal: true,
            modalTitle: modalTitle,
        });
    },

    handleNewJobPost: function(newJobPost) {
        var jobPosts = this.state.postedJobs || [];
        jobPosts.unshift(newJobPost);
        this.setState({postedJobs: jobPosts});
    },
    onHandleRecentSearches:function(searchResultsData){
      this.props.updateParentSection(2,searchResultsData,"")
    },
    handleAdvancedSearch:function(){
      this.props.updateParentSection(2,[],"")
    },
    displayAllJobs:function(){
      this.props.updateParentSection(3,[],"")
    },
    showAllSelections:function(){
      this.props.updateParentSection(4,[],"")
    },
    render: function() {
        return (
            <div id="sfhome" className="tab-pane">
                <div className="row">
                    <div className="col-xs-12 mpdfix">
                        <div className="white-content sfdheader">
                            <BusinessSearch updateParentSection ={this.props.updateParentSection} />
                        </div>
                    </div>
                </div>

                <div className="row mrtp10">
                    <div className="col-xs-12 col-sm-9 pdrg10">
                        <div className="white-content sfduserdls">
                            <BusinessCount />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-3 pdlt0 pdrg15 mpd">
                        <a href="#" className="btnhl red">
                            <span className="left icon fa fa-send-o"></span>
                            <span className="right title" data-toggle="modal" data-target="#AddJobModal" onClick={this.handleShowModal}>Post Job</span>
                        </a>
                        <a href="#" className="btnhl green mrtp20" onClick={this.handleAdvancedSearch}>
                          <span className="left icon fa fa-tachometer"></span>
                          <span className="right title">Advanced Search</span>
                        </a>
                    </div>
                </div>

                <div className="row mrtp10">
                    <div className="col-xs-12 col-sm-4 pdlt15 pdrg10">
                        <MyJobsListCard postedJobs={this.state.postedJobs} displayAllJobs={this.displayAllJobs} />
                    </div>
                    <div className="col-xs-12 col-sm-4 pdlt0 pdrg0">
                        <RecentSearches onHandleRecentSearches = {this.onHandleRecentSearches} type="home" showallRecentsearches={this.handleAdvancedSearch} />
                    </div>
                    <div className="col-xs-12 col-sm-4 pdlt10">
                        <MySelectionsListCard mySelections={this.state.mySelections} openUserProfile={this.props.openUserProfile} showAllSelections={this.showAllSelections} />
                    </div>
                </div>
                {this.state.showModal
                ? <AddJobModal handleNewJobPost={this.handleNewJobPost} modalTitle={this.state.modalTitle} handleHideModal={this.handleHideModal} />
                : null}
            </div>
        );
    }
});

module.exports = BusinessHome;
