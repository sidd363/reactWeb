var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var JobTaggingDropdown = require("./JobTaggingDropdown.jsx");
var config = require('./../../../../config.js');
var requestLib = require('./.././../../../controllers/request.js');
var ChangeStatusComponent = require("./ChangeStatusComponent.jsx");
var UserShortDisplay = React.createClass({
    openUserProfile:function(e){
      var userId = $(e.currentTarget).data("userid");
      this.props.openUserProfile(userId);
    },
    render: function() {
      var colleges = "",
          collegeString = "";
          var item = this.props.item;
        //   console.log("useritem====",item)
          if (item.college) {
              colleges = item.college.replace(/,\s*$/, "").split(',') || [];
            //   console.log("colleges====",colleges)
              collegeString = colleges.map(function(cItem, cIndex) {
                  return( <small>{cItem}</small>)
              });
          }
          var userId = item.userid || item.userId
          var slug = this.props.item.firstName.toLowerCase()+"-"+this.props.item.lastName.toLowerCase()+"-"+userId;
          var profileUrl = '/profile/' + slug;
        return (
          <div className="srtile clearfix" key={this.props.key}>
              <div className="srtiletop">
                  <img src={item.image_url ? item.image_url : ""} alt="" />
                  <div className="dfffrnjcsb">
                      <h2><a href="#" data-toggle="modal" data-target="#profileViewModal" onClick={this.openUserProfile} data-userid={userId}>{item.displayname ? item.displayname : ""}</a></h2>
                      {this.props.type=="search" && <JobTaggingDropdown iUserId = {userId} jobList = {this.props.jobList} /> }
                      {this.props.type=="selection" && <ChangeStatusComponent userId={userId} applicantName={item.firstName} status={this.props.status} id={item.id} /> }
                  </div>
                  <div className="emdes">{item.designation ? item.designation : ""} {item.designation ? "at" : ""} {item.company ? item.company : ""}</div>
                  <div className="emdes">{item.searchLocation ? item.searchLocation : ""}</div>
              </div>
              {collegeString.length>0 && <div className="srtilebottom">
                  <div className="eminfo">
                      <span className="emlabel">College</span>
                      {collegeString}
                  </div>
              </div>}

          </div>
        );
    }
});

module.exports = UserShortDisplay;
