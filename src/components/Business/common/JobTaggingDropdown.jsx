var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var config = require('./../../../../config.js');
var requestLib = require('./.././../../../controllers/request.js');

var JobTaggingDropdown = React.createClass({
  onHandlePostedJobs: function(e) {
    // var userid = $('').data("userid");
    var puserid = $(e.currentTarget).data("puserid");
    var pid = $(e.currentTarget).data("pid");
    var headers = {
      "Content-Type": "application/json"
    };
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
    var postedJobsData = this.props.jobList;
    var userId = this.props.iUserId;
    var that = this;
    var postedJobsDataList = postedJobsData.map(function(pItem, pIndex) {
      return (
        <li key={pIndex}>
          <a style={{
            cursor: "pointer"
          }} data-puserid={userId} data-pid={pItem.id} onClick={that.onHandlePostedJobs}>{pItem.title}</a>
        </li>
      );
    });
    return (
      <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle shortlistBtn" type="button" data-toggle="dropdown">Shortlist for a Job&nbsp;
          <span className="caret"></span></button>
            <ul className="dropdown-menu">
              {postedJobsDataList}
            </ul>
      </div>

    );
  }
});

module.exports = JobTaggingDropdown;
