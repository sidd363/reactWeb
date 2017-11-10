var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var ProfileActions = require('../actions/ProfileActions');
var ProfileStore = require('../stores/ProfileStore');
var CommentView = require('./CommentView.jsx');
var PlaylistView = require('./PlaylistView.jsx');
var config = require("../../config");

var VideoView = React.createClass({

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
    this.setState(state);
  },

  getInitialState: function() {
    return ProfileStore.getState();
  },
  loadVideoLikes:function(e){
    e.preventDefault();
    e.stopPropagation();
    var self = this;
    ProfileActions.loadLikes(this.state.video.activity.resourceId,function(err,response){
      var likeList="";
      for(var index in response){
        var like = response[index];
        href="/profile/"+like.firstName.toLowerCase()+"-"+like.lastName.toLowerCase()+"-"+like.userId;
        if(!like.image_url){
          like.image_url="/images/images.png";
        }
        likeList+='<li><a href="'+href+'" class="lklist"><img src="'+like.image_url+'" alt="" />'+like.firstName+' '+like.lastName+'</a></li>'
      }
      $("#likeModal .modal-body ul").html(likeList);
      $("#likeModal").modal()
    })
    return false;
  },
  render: function() {
    var answer = this.state.video;
    var activity = answer.activity;
    var jobtitle="";
    var slug = this.state.video.activity.actorInfo.firstName.toLowerCase()+"-"+this.state.video.activity.actorInfo.lastName.toLowerCase()+"-"+this.state.video.activity.actorId;
    var mainProfileUrl ='/profile/' + slug;
    var qorder = activity.qorder;
    var hints = config.hints[qorder];
    var videoDescription = activity.actorInfo.firstName+" "+activity.actorInfo.lastName+" talking about "+ activity.resourceInfo.title+" and describing "+hints;;
    if(activity.actorInfo.designation && activity.actorInfo.company){
      jobtitle=activity.actorInfo.designation +" at "+ activity.actorInfo.company;
    }
    var commentList = [];
    if (answer.comments && answer.comments.length) {
      commentList = answer.comments.map(function(comment) {
        return (<CommentView comment={comment}/>)
      });
    }
    var playlist = [];
    if (answer.relatedActivities && answer.relatedActivities.length) {
      playlist = answer.relatedActivities.map(function(item) {
        return (<PlaylistView item={item}/>)
      });
    }
    var commentSection = "";
    if(answer.comments.length>0){
    commentSection = <div className="white-content pd15 clearfix" >
      <h5 className="bdlgt pdbt10">Comments
        <small className="pdlt10" itemProp="commentCount">{answer.comments.length}</small>
      </h5>
      <div className="clearfix"></div>
      <div className="titlecomment">
        {commentList}
      </div>
    </div>
  }
    return (
      <section className="timeline" id="timeline">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8" itemProp="video" itemScope itemType="http://schema.org/VideoObject">
              <meta itemProp="description" content={videoDescription} />
              <meta itemProp="thumbnailURL" content={activity.resourceInfo.coverImage} />
              <meta itemProp="contentURL" content={activity.resourceInfo.url} />
              <meta itemProp="uploadDate" content={activity.submittedAt} />
              <meta itemProp="duration" content="T30S" />
              <div className="white-content clearfix text-center" style={{
                background: "#000"
              }}>
                <video controls controlsList="nodownload" preload="none" autoplay style={{
                  "vertical-align": "middle",
                  "max-height": "480px"
                }} poster={activity.resourceInfo.coverImage}>
                  <source src={activity.resourceInfo.url} type="video/mp4"/>
                  <img src="https://s3.ap-south-1.amazonaws.com/shrofile-imageassets/novideo.gif" />
                </video>
              </div>
              <div className="white-content pd15 clearfix">
                <h1 className="videotitle" itemProp="name">{activity.resourceInfo.title} {activity.resourceInfo.videodescription}</h1>
                <div className="titlecomment">
                  <div className="intro-cmt">
                    <a href={mainProfileUrl}><img src={activity.actorInfo.image_url} alt="" onClick={this.loadProfilePage}/></a>
                    <div className="vdcmt">
                      <span itemProp="author" itemScope itemType="http://schema.org/Person">
                        <a itemProp="name" href={mainProfileUrl} onClick={this.loadProfilePage}>{activity.actorInfo.firstName}</a>
                          <small itemProp="jobTitle" className="jobtitle">{jobtitle}</small>
                          <span itemProp="workLocation" className="joblocation">{activity.actorInfo.location}</span>
                      </span>
                    </div>
                    <div className="vdlke mrtp8" itemProp="interactionStatistic" itemScope itemType="http://schema.org/InteractionCounter">
                      <link itemProp="interactionType" href="http://schema.org/LikeAction"/>
                      <a href="javascript:void(0)" className="mrrg20" onClick={this.loadVideoLikes}>Like
                      <span className="padl4" itemProp="userInteractionCount">{activity.resourceInfo.likeCount}</span></a>
                    </div>
                  </div>
                </div>
              </div>
              {commentSection}
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="white-content pd510 clearfix">
                <h2 className="mrbt20">Similar Shrofile
                  <span className="titlecount">{answer.relatedActivities.length}</span>
                </h2>
                <div className="clearfix"></div>
                {playlist}
              </div>
            </div>

          </div>
        </div>
      </section>
    )
  }
});

module.exports = VideoView;
