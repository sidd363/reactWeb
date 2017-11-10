var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var moment = require('moment');
var Dropzone = require('react-dropzone');
var request = require('superagent');
var config= require('../../../config.js');
var requestlib = require('../../../controllers/request.js');
var browserHistory = require('react-router').browserHistory;
var utils = require('./../../utils/helper.js');

var Header = require('./../Header.jsx');

// Business Dashboard Views
var BusinessLeftPanel = require('./BusinessLeftPanel.jsx');
var BusinessHome = require('./BusinessHome/BusinessHome.jsx');
var SearchPeople = require('./SearchPeople/SearchPeople.jsx');
var AdminSection = require('./AdminSection/AdminSection.jsx');
var MyJobs = require('./MyJobs/MyJobs.jsx');
var MySavedSearches = require('./MySavedSearches/MySavedSearches.jsx');
var MySelections = require('./MySelections/MySelections.jsx');
var MyCompany = require('./MyCompany/MyCompany.jsx');
var MyProfile = require('./MyProfile/MyProfile.jsx');
var ProfileViewModal = require("../Business/common/ProfileModalComponent.jsx")

var BusinessDashboardView = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState: function() {
        console.log("[BusinessDashboardView] | getInitialState");
        var currentState=0;
        return {"currentState":currentState,"showProfileModal":false};
    },
    updateSection:function(e){
       var newState = $(e.currentTarget).data("index");
       this.setState({"currentState":newState});
    },
    componentWillMount:function(){
        // TODO redirect to login page
        var isLoggedIn = utils.isLoggedIn();
        if (!isLoggedIn) {
            // window.location.href = '/business/login';
        }
    },
    updateParentSection:function(secNumber,searchResultsData,searchTerm){
      this.setState({"currentState":secNumber,searchResultsData:searchResultsData,searchTerm:searchTerm});
    },
    openUserProfileModal:function(userId){
      this.setState({"showProfileModal":true,"userId":userId});
    },
    handleProfileHideModal:function(){
      this.setState({"showProfileModal":false});
    },
    render: function() {
        // console.log($);
        console.log("[BusinessDashboardView] | render");
        var searchResultsData = this.state.searchResultsData || [];
        var searchTerm = this.state.searchTerm || "";
        var sectionArr=[<AdminSection />,
                        <BusinessHome
                            updateParentSection={this.updateParentSection}
                            openUserProfile={this.openUserProfileModal} />,
                        <SearchPeople
                            searchResultsData={searchResultsData}
                            searchTerm={searchTerm}
                            openUserProfile={this.openUserProfileModal} />,
                        <MyJobs
                            openUserProfile={this.openUserProfile} />,
                        <MySelections
                            openUserProfile={this.openUserProfileModal} />,
                        ];
        var desiredSection = sectionArr[this.state.currentState];
        return (
            <div className="container-fluid hgt100 BusinessDashboardViewContent">
                <div className="row hgt100">
                    <div className="tab-content hgt100 pdtp51">
                        <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2 hgt100 pdallnone">
                            <BusinessLeftPanel clickEvent={this.updateSection} currentState={this.state.currentState} />
                        </div>
                        <div className="col-xs-12 col-sm-8 col-md-9 col-lg-10 hgt100 pdlt10 pdrg10">
                            {desiredSection}
                        </div>
                    </div>
                </div>
                {this.state.showProfileModal
                  ? <ProfileViewModal userId={this.state.userId} handleProfileHideModal={this.handleProfileHideModal}  />
                  : null}
            </div>
        );
    }
});

module.exports = BusinessDashboardView;
