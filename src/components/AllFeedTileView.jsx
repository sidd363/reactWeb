var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var ProfileActions = require('../actions/ProfileActions.js');
var moment = require("moment");
var FeedTileView = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },
    loadLikes:function(e){
      e.preventDefault();
      var self = this;
      ProfileActions.loadLikes(this.props.feed.resourceId,function(err,response){
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
      })
    },
    render : function() {
        var feed = this.props.feed;
        var commentCount = feed.resourceInfo.commentCount+ " Comment";
        var likeCount = feed.resourceInfo.likeCount+ " Like";
        var submittedAt = moment(feed.submittedAt).startOf('hour').fromNow()
        var feedtitle = feed.resourceInfo.title+": "+feed.actorInfo.firstName + " "+ feed.actorInfo.lastName
        var author = feed.actorInfo.firstName + " "+ feed.actorInfo.lastName;
        var videoDescription = feed.actorInfo.firstName+" "+feed.actorInfo.lastName+" talking about "+ feed.resourceInfo.title;
        var separator = ": ";
        var questioName = feed.resourceInfo.title.replace("\n","-");
        questioName = questioName.replace(" ","-").toLowerCase();
        questioName = questioName.replace(" ","");

        var slug = feed.actorInfo.firstName.toLowerCase()+"-"+feed.actorInfo.lastName.toLowerCase()+"-"+questioName+"-"+feed.id;
        var url = '/videos/'+slug;

        var profileSlug = feed.actorInfo.firstName.toLowerCase()+"-"+feed.actorInfo.lastName.toLowerCase()+"-"+feed.actorId;
        var profileUrl = "/profile/"+profileSlug;
        if(feed.resourceInfo.likeCount>1){
          likeCount = feed.resourceInfo.likeCount+ " Likes";
        }
        if(feed.resourceInfo.commentCount>1){
          commentCount = feed.resourceInfo.commentCount+ " Comments";
        }
        return (
        <div className="tile-wrap" itemProp="video" itemScope itemType="http://schema.org/VideoObject">
                <div className="top-tile-wrap"></div>

                <div className="tile-video">
                    <div className="videowrap">
                      <a href={url}><img src = {feed.resourceInfo.coverImage} /></a>
                    </div>
                    <div className="video-tile-overlay">&nbsp;</div>
                    <h3><a className="profileClick" href ={profileUrl}><span itemProp="name">{feed.resourceInfo.title}</span><span>{separator}</span><span itemProp="author" itemScope itemType="http://schema.org/Person"><span itemProp="name">{author}</span></span></a></h3>
                    <div className="introtime">{submittedAt}</div>
                </div>

                <div id="tiletop2" className="tile-info-box">
                  <a href={url}>
                    <span className="pull-left text-left" itemProp="interactionStatistic" itemScope itemType="http://schema.org/InteractionCounter">
                      <link itemProp="interactionType" href="http://schema.org/CommentAction"/>
                      <span itemProp="userInteractionCount">{commentCount}</span>
                    </span>
                    </a>
                    <span className="pull-right text-right" data-toggle="modal" data-target="#likeModal" data-resourceId={feed.resourceId} onClick={this.loadLikes} itemProp="interactionStatistic" itemScope itemType="http://schema.org/InteractionCounter">
                      <link itemProp="interactionType" href="http://schema.org/LikeAction"/>
                      <span itemProp="userInteractionCount">{likeCount}</span>
                    </span>
                </div>
                <div className="bottom-tile-wrap"></div>
            </div>
        )
    }
});

module.exports = FeedTileView;
