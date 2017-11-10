var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var config= require('../../../config.js');
var requestlib = require('../../../controllers/request.js');
var utils = require('./../../utils/helper.js');

var BusinessHeader = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState: function() {
        console.log("[BusinessHeader] | getInitialState");
        return {}
    },

    getHeaderStats: function() {
        /**
        * TODO: get user data.
        */
        var data = {
            shots:0,
            followers:0,
            following:0,
            profile:0,
            emails:0,
            notifications:0
        };
        var res = {
            shots: data.shots,
            followers: data.followers,
            following: data.following,
            profile: data.profile,
            emails: data.emails,
            notifications: data.notifications
        };
        return res;
    },

    componentWillMount: function() {
        var getHeaderData = this.getHeaderStats();
        this.setState({
             headerData: getHeaderData
         });
    },
    onHandleProfile:function(e){
      if ($('#prouserdropdown').is(':visible')) {
            $('#prouserdropdown').slideUp('fast');
        } else {
            $('#prouserdropdown').slideDown('fast');
        }
    },
    onHandleLogout:function(e){
      var logoutApiUrl= config.baseUrl+"/businessUsers/logout";
      var headers = {"Content-Type":"application/json"};
      var that = this;
      requestlib.post(logoutApiUrl,{},headers,function(err,response){
        localStorage.removeItem("shid");
        localStorage.removeItem("shtoken");
        localStorage.removeItem("firstLogin");
        localStorage.removeItem("companyId");
        localStorage.removeItem("userObj");
        that.context.router.transitionTo("/business/login");
        window.location.reload();
      });
    },
    render: function() {
        var isLoggedIn = utils.isLoggedIn();

        var userObj = {}
        if(isLoggedIn && typeof(Storage) !== "undefined"){
          userObj = JSON.parse(localStorage.getItem("userObj"))||{}
        }

        var firstName = userObj.firstName || "";
        var lastName = userObj.lastName || "";
        var image_url = userObj.image_url || "";
        var avatarImage = <i className="fa fa-user fa-2x" />;
        if(image_url.length){
          avatarImage = <img src={image_url} alt="" />;
        }
        var name = userObj.firstName+" "+userObj.lastName;
        return (
            <header className="header navbar navbar-fixed-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-4 col-sm-3 col-md-3 col-lg-3">
                            <div className="navlogo">
                                <img src="/web/images/shrofile-logo-red.png" alt="Shrofile Logo" className="hidden-xs" />
                                <img src="/web/images/shrofile-logo-red.png" alt="Shrofile Logo" className="visible-xs" />
                            </div>
                        </div>
                        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-6 hidden-xs">
                            <form className="headersearch input-group hide">
                                <input type="text" name="Search" id="search" defaultValue="" placeholder="Search..." />
                                <span className="input-group-btn">
                                    <button type="button"><i className="fa fa-search"></i></button>
                                </span>
                            </form>
                        </div>
                        {isLoggedIn && <div className="col-xs-8 col-sm-4 col-md-4 col-lg-3">
                            <div className="loginpanel">
                                <div className="con-login" id="prouser" onClick={this.onHandleProfile}>{avatarImage}</div>
                                {this.state.headerData.notifications>0 && <div className="con-alert"><i className="fa fa-bell-o"></i> <span>{this.state.headerData.notifications}</span></div>}
                                {this.state.headerData.emails>0 && <div className="con-message"><i className="fa fa-envelope-o"></i> <span>{this.state.headerData.emails}</span></div>}


                                <div className="prodropdown" id="prouserdropdown" style={{display:"none"}}>
                                    <div className="proimg"><span>{name}</span></div>
                                    <ul>
                                      {this.state.headerData.shots>0 && <li><a href="#">{this.state.headerData.shots} Shots</a></li>}
                                        {this.state.headerData.followers>0 && <li><a href="#">{this.state.headerData.followers}</a></li>}
                                        {this.state.headerData.following>0 && <li><a href="#">{this.state.headerData.following}</a></li>}
                                        {this.state.headerData.profile>0 && <li><a href="#">{this.state.headerData.profile}</a></li>}
                                        <li onClick={this.onHandleLogout}><a href="#">Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                      }

                    </div>
                </div>
            </header>
		);
    }
});

module.exports = BusinessHeader;
