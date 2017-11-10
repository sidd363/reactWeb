var React = require('react/addons');
var requestLib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');
var UserShortDisplay = require("../common/UserShortDisplay.jsx");
var _ = require('lodash');

var FilteredSearchResults = React.createClass({
    onHandlePostedJobs: function(e) {
        // var userid = $('').data("userid");
        var puserid = $(e.currentTarget).data("puserid");
        var pid = $(e.currentTarget).data("pid");
        var headers = {"Content-Type": "application/json"};
        var shortlistUrl = config.baseUrl + "/jobs/" + puserid + "/" + pid + "/shortlist";
        requestLib.post(shortlistUrl, {}, headers, function(err, response) {
            if (err) {
                swal('Error', err, 'error');
            } else {
                swal('Success', response.body.message, 'success');
            }
        });
    },

    render: function() {
        var that = this;
        var searchResults = this.props.searchResultsData || [];
        var postedJobsData = this.props.postedJobsData || [];
        var colleges = "",
            collegeString = "";
        var postedJobsDataList = null;

        var SearchResults = searchResults.map(function(item, index) {
            return (
              <UserShortDisplay item ={item} jobList = {postedJobsData} key={index} type="search" openUserProfile={that.props.openUserProfile} />
            );
        });

        return (
            <div className="sfsearchright">
                <div className="row mrbt10">
                    <div className="col-xs-12 col-sm-12">
                        {searchResults.length > 0 && <div className="white-content pd10 mrbt15 clearfix">
                            <div className="sfsrchselect" style={{display: "flex", flexFlow: "row nowrap"}}>
                                <h4>{searchResults.length} Shrofile Searched.</h4>
                            </div>
                        </div>}
                    </div>
                </div>
                {SearchResults}
            </div>
        );
    }
});

module.exports = FilteredSearchResults;
