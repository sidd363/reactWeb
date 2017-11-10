var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var BusinessSearch = require('./../common/BusinessSearch.jsx');
var RecentSearches = require('./RecentSearches.jsx');
var OthersSearching = require('./OthersSearching.jsx');
var FilterSearch = require('./FilterSearch.jsx');
var FilteredSearchResults = require('./FilteredSearchResults.jsx');

var requestLib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');
var _ = require('lodash');

var SearchPeople = React.createClass({

    getInitialState: function () {
        console.log(this);
        return {searchResultsData: [], filterPayload: {}};
    },

    componentWillMount: function () {
        var that = this;
        // var postedJobs = [];
        var jobdata = [];
        requestLib.get(config.baseUrl + '/jobs/posted', function (err, response) {
            if (!err && response.body) {
                that.setState({postedJobs: response.body});
                jobdata = _.map(response.body, function (obj) {
                    return _.pick(obj, 'title', 'id', 'userId');
                });
                console.log(jobdata);
                that.setState({postedJobsData: jobdata, searchResultsData: that.props.searchResultsData});
            }
        });
    },

    onHandleRecentSearches: function (payLoad, results) {
        console.log("Recent Searches:", results);
        this.setState({searchResultsData: results, filterPayload: payLoad});
    },

    onHandleBusinessSearch: function (results) {
        this.setState({searchResultsData: results});
    },

    onHandleFilterSearch: function (payLoad, results) {
        this.setState({searchResultsData: results, filterPayload: payLoad});
    },

    render: function () {
        return (
            <div id="sfsp" className="tab-pane">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="white-content sfdheader">
                            <BusinessSearch
                                onHandleBusinessSearch={this.onHandleBusinessSearch}
                                onHandleFilterSearch={this.onHandleFilterSearch}
                                searchTerm={this.props.searchTerm}/>
                        </div>
                    </div>
                </div>

                <div className="row mrtp10">
                    <div className="col-xs-12 col-sm-6 pdrg0">
                        <RecentSearches onHandleRecentSearches={this.onHandleRecentSearches}/>
                    </div>
                    <div className="col-xs-12 col-sm-6 pdlt10"></div>
                </div>

                <div className="row mrtp10" id="hashHeader">
                    <div className="col-xs-12 col-sm-12">
                    <div className="white-content pd15 clearfix">
                        <h3 className="sfsubtitle">Here are some profile that match your requirement</h3>
                    </div>
                    </div>
                </div>

                <div className="row mrtp10">
                    <div className="col-xs-12 col-sm-12">
                        <div className="sfsearchresults">
                            <div className="sfsearchright">
                                {/* Search Results */}
                                {this.state.searchResultsData
                                    ? <FilteredSearchResults
                                            postedJobsData={this.state.postedJobsData}
                                            searchResultsData={this.state.searchResultsData}
                                            openUserProfile={this.props.openUserProfile}/>
                                    : null}
                            </div>
                            <div className="sfsearchfilter">
                                <div className="white-content pd10 mrbt15 clearfix">
                                    <div className="sfsrchselect clearfix height42">
                                        <i className="fa fa-sliders filters mrtp2"></i>
                                        <h4>Filter</h4>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <FilterSearch
                                    filterPayload={this.state.filterPayload}
                                    onHandleFilterSearch={this.onHandleFilterSearch}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SearchPeople;
