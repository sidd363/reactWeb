var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var ProfileActions = require('../actions/ProfileActions.js');
var moment = require("moment");
var CommentView = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },
    render : function() {
        var comment = this.props.comment;
        var slug = this.props.comment.firstName.toLowerCase()+"-"+this.props.comment.lastName.toLowerCase()+"-"+this.props.comment.userId;
        var profileUrl = '/profile/' + slug;
        var submittedAt = moment(comment.submittedAt).startOf('hour').fromNow()
        var commentDiv = "";
        if(comment.type=="Text"){
          commentDiv = <div className="vdcmt" itemProp="text">{comment.comment.message.replace(/<(?:.|\n)*?>/gm, '')}</div>
        }else if(comment.type=="Cloud"){
          var wordsList = comment.comment.words.map(function(word,index){
            if(index==0){
              return(<span className="badge red">{word}</span>)
            }else{
              return(<span className="badge red mlt10">{word}</span>)
            }
          })
          commentDiv = <div className="vdcmt" itemProp="text">{wordsList}</div>
        }else if(comment.type=="videoComment"){
          var videoDescription = comment.firstName +" "+comment.lastName+" left a video comment for "+comment.toUserFirstName+" "+comment.toUserlastName;
          var title = comment.firstName +" "+comment.lastName+" comented on  "+comment.toUserFirstName+"'s answer";
          commentDiv = <div className="vdcmt" itemProp="video" itemScope itemType="http://schema.org/VideoObject">
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={videoDescription} />
            <meta itemProp="thumbnailURL" content={comment.coverImage} />
            <meta itemProp="contentURL" content={comment.url} />
            <meta itemProp="uploadDate" content={comment.submittedAt} />
            <video style={{
            "vertical-align": "middle",
            "max-width": "100%"
          }} poster={comment.coverImage}>
            <source src={comment.url} type="video/mp4"/>
          </video></div>
        }
        return (
          <div className="pro-own-cmt" itemProp="comment" itemScope itemType="http://schema.org/Comment">
              <div className="pro-cmt-dls">
                  <div className="author" itemProp="author" itemScope itemType="http://schema.org/Person">
                  <img itemProp="image" src={comment.image_url} className="usrcmtimg" alt="" />
                  <h5><a itemProp="name" href={profileUrl} >{comment.firstName}</a> <small className="pdlt5">{submittedAt}</small></h5>
                  </div>
                  {commentDiv}
              </div>
          </div>
        )
    }
});

module.exports = CommentView;
