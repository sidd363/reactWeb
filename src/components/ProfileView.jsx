var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var ProfileStore = require('../stores/ProfileStore');
var FeedTileView = require('./FeedTileView.jsx');
var moment = require("moment");
var ChangeStatusComponent = require("../components/Business/common/ChangeStatusComponent.jsx");
var ProfileView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    ProfileStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    ProfileStore.unlisten(this.onChange);
  },

  onChange: function(state) {
    if($('#profileViewModal').length){
      $('#profileViewModal').modal('show');
    }
    this.setState(state);
  },

  getInitialState: function() {
    return ProfileStore.getState();
  },
  render: function() {
    var profile = this.state.profile ||{url:"",educationList:[],workList:[]};
    var videoDiv = "";
    var introVideoDiv = "";
    var author = profile.firstName + " " + profile.lastName;
    var sectionFeed = {};
    if (profile.url.length > 0) {
      var videoName = "Short Introduction by " + profile.firstName + " " + profile.lastName;
      var videoDescription = profile.firstName + " " + profile.lastName + " giving an introduction about passion,profession and location";
      var submittedAt = "";
      var commentCount = 0;
      var likeCount = 0;
      introVideoDiv = <div className="col-xs-12 col-sm-8">

        <div className="introvideo" itemProp="video" itemScope itemType="http://schema.org/VideoObject">
          <meta itemProp="name" content={videoName}/>
          <meta itemProp="description" content={videoDescription}/>
          <meta itemProp="thumbnailURL" content={profile.coverImage}/>
          <meta itemProp="contentURL" content={profile.url}/>
          <meta itemProp="uploadDate" content={submittedAt}/>
          <meta itemProp="duration" content="T30S"/>
          <div itemProp="author" itemScope itemType="http://schema.org/Person">
            <meta itemProp="name" content={author}/>
          </div>

          <div itemProp="interactionStatistic" itemScope itemType="http://schema.org/InteractionCounter">
            <link itemProp="interactionType" href="http://schema.org/LikeAction"/>
            <meta itemProp="userInteractionCount" content={likeCount}/>
          </div>
          <div itemProp="interactionStatistic" itemScope itemType="http://schema.org/InteractionCounter">
            <link itemProp="interactionType" href="http://schema.org/CommentAction"/>
            <meta itemProp="userInteractionCount" content={commentCount}/>
          </div>
          <video key={profile.id} controls controlsList="nodownload" preload="none" poster={profile.coverImage} className="fullscreen">
            <source key={profile.id} src={profile.url} type="video/mp4"/>
          </video>
        </div>
      </div>
    }
    for (var index in profile.feed) {
      var activity = profile.feed[index];
      if (activity.qorder == 1) {
        submittedAt = activity.submittedAt;
        commentCount = activity.resourceInfo.commentCount;
        likeCount = activity.resourceInfo.likeCount;
      }
      if (activity.resourceInfo.answerType == "Video") {
        if (!sectionFeed[activity.resourceInfo.section]) {
          sectionFeed[activity.resourceInfo.section] = [];
        }

        sectionFeed[activity.resourceInfo.section].push(activity)
      }
    }
    var pro_profile = <div className="pro-profile">
      <div className="top-photo">
        <img itemProp="image" src={profile.image_url}/>
        <h1 itemProp="name" className="pro-name">{profile.firstName} {profile.lastName}</h1>
        <h2>
          <small itemProp="jobTitle">{profile.identity}</small>
          <span itemProp="workLocation">{profile.location}</span>
        </h2>
      </div>
      <ul className="pro-list">
        <li className="pro-list-elem">
          <a href="#" className="pro-list-elem-anchor">
            <span className="pro-list-elem-span">{profile.followers} Followers</span>
          </a>
        </li>
        <li className="pro-list-elem">
          <a href="#" className="pro-list-elem-anchor">
            <span className="pro-list-elem-span">{profile.views} Views</span>
          </a>
        </li>
      </ul>
    </div>;

    var tagLineText = <div className="tagline">{profile.tagLine}</div>

    var moreInfo = <div className="moreinfobtn" id="moreinfobtn">
      <i className="fa fa-angle-down"/>
    </div>;
    var workList = [];
    var educationList = [];
    if (profile.experienceList && profile.experienceList.length) {
      workList = profile.experienceList.map(function(work) {
        var from = moment.utc(work.from * 1000).format('MMMM YYYY');
        var to = "Present";
        if (work.to > 0) {
          to = moment.utc(work.to * 1000).format('MMMM YYYY');
        }
        return (
          <li itemProp="memberOf" itemScope itemType="http://schema.org/Organization">
            <span className="wltitle" itemProp="name">{work.company}</span>
            <div itemProp="member" itemScope itemType="http://schema.org/OrganizationRole">
              <span itemProp="roleName">{work.title}</span>
              <small itemProp="startDate">{from} - {to}</small>
            </div>
            <small>{work.location}</small>
          </li>
        )
      })
    }

    if (profile.educationList && profile.educationList.length) {
      educationList = profile.educationList.map(function(edu) {
        var from = moment.utc(edu.from * 1000).format('MMMM YYYY');
        var to = "Present";
        if (edu.to > 0) {
          to = moment.utc(edu.to * 1000).format('MMMM YYYY');
        }
        return (
          <li itemProp="alumniOf" itemScope itemType="http://schema.org/CollegeOrUniversity">
            <span className="wltitle" itemProp="name">{edu.institution}</span>
            <span className="course">{edu.course}</span>
            <div itemProp="alumni" itemScope itemType="http://schema.org/OrganizationRole">
              <small itemProp="startDate">{from} - {to}</small>
            </div>
          </li>
        )
      })
    }

    var basicinfo = <div className="col-xs-12 col-sm-4 basicinfo" itemProp="user" itemScope itemType="http://schema.org/Person">
      <div className="white-content clearfix top-intro">
        {pro_profile}
        {tagLineText}
      </div>
      <div className="clearfix"></div>
      {workList.length > 0 && <div className="white-content pd510 mrbt15 clearfix">
        <h3 className="sfsubtitle bdbtlgt pdbt10">Work Information</h3>
        <ul className="worklist">
          {workList}
        </ul>
      </div>
}
      <div className="clearfix"></div>
      {educationList.length > 0 && <div className="white-content pd510 mrbt15 clearfix">
        <h3 className="sfsubtitle bdbtlgt pdbt10">Education Information</h3>
        <ul className="worklist">
          {educationList}
        </ul>
      </div>
}
    </div>;

    function getSectionFeed(data) {
      var feedlist = data.map(function(answer,index) {
        console.log("data===", index)
        if (answer.resourceInfo.answerType == "Video") {
          if(index>0 && (index)%3==0){
            console.log("here")
            return (
              <div>
                <div className="clearfix lineseperator mbt10"></div>

              <div className="col-xs-12 col-sm-4">
                <FeedTileView feed={answer}/>
              </div>
              </div>
            )

          }else{
          return (
            <div className="col-xs-12 col-sm-4">
              <FeedTileView feed={answer}/>
            </div>
          )
        }
        }
      });
      return feedlist;
    }

    var timelinefeed = Object.keys(sectionFeed).map(function(section) {
      var feed = sectionFeed[section];
      return (
        <div>
          <div className="white-content mbt0 pdt10t15 clearfix">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="sftitle">{section} ({sectionFeed[section].length})</h2>
              </div>
            </div>
          </div>
          <div className="clearfix lineseperator"></div>
          <div className="white-content pd15 mrbt15 clearfix">
            <div className="row">
              {getSectionFeed(feed)}
            </div>
          </div>
        </div>
      )

    })
    var timeLineRoot = <section className="timeline">
      <div className="container">
        <div className="row">
          {basicinfo}
          <div className="col-xs-12 col-sm-8">
            <div className="white-content mrbt15 pdt10t15 clearfix">
              <div className="row">
                <div className="col-xs-12">
                  <h2 className="sftitle">Expressions</h2>
                </div>
              </div>
            </div>
            {timelinefeed}
          </div>
        </div>
      </div>
    </section>

    videoDiv = <section className="intro">
      <div className="container mobfillwidth">
        <div className="row">
          {basicinfo}
          {introVideoDiv}
          <div className="col-xs-12 col-sm-8">
            <div className="white-content mrbt15 pd15 clearfix">
              <div className="row">
                <div className="col-xs-12">
                  <h2 className="sftitle">Expressions</h2>
                </div>
              </div>
            </div>
            {timelinefeed}
          </div>
        </div>
      </div>
    </section>

    return (
      <div>
        {videoDiv}
      </div>
    )
  }
});

module.exports = ProfileView;
