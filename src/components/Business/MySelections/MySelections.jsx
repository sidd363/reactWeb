var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var requestLib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');
var _ = require('lodash');

var MySelectionsList = require('./../common/MySelectionsList.jsx');
var SelectionsAccordian = require('./SelectionsAccordian.jsx');
var MultiSelectionView = require('./MultiSelectionView.jsx');

var MySelections = React.createClass({

    getInitialState: function() {
        return {
          "status": "shortlisted"
        };
    },
    componentWillMount: function() {
        var that = this;
        requestLib.get(config.baseUrl + '/jobs/posted', function(err,response){
          if(!err && response.body) {
            that.setState({postedJobs: response.body, filteredJobs: response.body});
          }
        });
    },
    onHandleStatusChange:function(e){
      var status = $(e.currentTarget).data("type");
      var postedJobs = this.state.postedJobs;
      this.setState({status: status});
      if (status !== "all") {
        var filteredPostedJobs = postedJobs.filter(function(item) {
          return item.counts ? item.counts[status] : null;
        });
        console.log("filteredjobs---->", filteredPostedJobs, this.state.postedJobs);
        this.setState({filteredJobs: filteredPostedJobs});
      } else {
        status = status === "all" ? "All Jobs" : "";
        this.setState({filteredJobs: postedJobs});
      }
      $(".filterJobsBtn").text(status.toUpperCase())
    },
    render: function() {
        var postedJobsData = this.state.filteredJobs || [];
        var that = this;
        var nAccordians = postedJobsData.map(function(item, index) {
            var title = item.title;
            return (
                <div key={index} className="col-xs-12 col-md-12">
                    <SelectionsAccordian index={index} item={item} jobId={item.id} status={that.state.status} openUserProfile={that.props.openUserProfile} />
                </div>
            );
        });
        return (
            <div>
                <div className="row mrtp10 mrbt10">
                  <div className="col-xs-12 col-md-12">
                    <div className="white-content pd15 clearfix">
                      <h3 className="sfsubtitle">Application Review</h3>
                      <div className="sfdwcustom dropdown sfspage">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                        <span className="filterJobsBtn">All Jobs</span>
                        <span className="caret"></span></button>

                        <ul className="dropdown-menu">
                          <li key="all">
                            <a style={{
                              cursor: "pointer",
                              "text-align":"left"
                            }} data-type="all" onClick={this.onHandleStatusChange}>All Jobs</a>
                          </li>
                          <li key="shortlisted">
                            <a style={{
                              cursor: "pointer",
                              "text-align":"left"
                            }} data-type="shortlisted" onClick={this.onHandleStatusChange}>Shortlisted</a>
                          </li>
                          <li key="waitlisted">
                            <a style={{
                              cursor: "pointer",
                              "text-align":"left"
                            }} data-type="waitlisted" onClick={this.onHandleStatusChange}>Waitlisted</a>
                          </li>
                          <li key="rejected">
                            <a style={{
                              cursor: "pointer",
                              "text-align":"left"
                            }} data-type="rejected" onClick={this.onHandleStatusChange}>Rejected</a>
                          </li>
                          <li key="applied">
                            <a style={{
                              cursor: "pointer",
                              "text-align":"left"
                            }} data-type="applied" onClick={this.onHandleStatusChange}>Applied</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mrtp10">
                    {nAccordians}
                </div>
                {/* <MultiSelectionView /> */}
            </div>
        );
    }
});

module.exports = MySelections;
