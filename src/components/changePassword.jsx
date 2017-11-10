var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var moment = require("moment");
var Dropzone = require('react-dropzone');
var request = require('superagent');
var config= require("../../config.js");
var requestlib = require("../../controllers/request.js");
var browserHistory = require('react-router').browserHistory;
var ChangePassword = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    console.log(this.context)
    var type = "user"
    if(this.context.router.getCurrentPathname().indexOf("business")!=-1){
      type="business"
    }
    return {"type":type};
  },
  onChangePassword:function(e){
    console.log(e);
    var password=$("#loginform input#Password").val();
    var oldpassword=$("#loginform input#oldpassword").val();
    var userid = localStorage.getItem("shid");
    var loginApiUrl = config.baseUrl+"/users/changepassword/"+userid;
    if(this.state.type=="business"){
      loginApiUrl = config.baseUrl+"/businessUsers/changepassword/"+userid;
    }
    var postBody = {oldpassword:oldpassword,newpassword:password};
    var headers = {"Content-Type":"application/json"}
    console.log(this)
    var that = this;
    requestlib.put(loginApiUrl,postBody,headers,function(err,response){
      var userObj = response.body;
      localStorage.removeItem("shtoken");
      localStorage.removeItem("shid");
      localStorage.removeItem("firstLogin");
      that.context.router.transitionTo('/business/login');
      window.location.reload();
    })
  },
  render: function() {
    var type = this.state.type;
    return (
      <div className="logmod">
        <div className="container-fluid">
          <div className="row">
            <div className="navbar bdbtlgt">
                <div className="navbar-header wd100per">
                    <a href="index.html" className="loginlogo">
                      <img src="images/shrofile-logo-red.png" alt="Shrofile" />
                    </a>
                </div>
            </div>
          </div>
        </div>
        <div className="logmod__wrapper">
          <div className="logmod__container">
               <ul className="logmod__tabs">
                    <li data-tabtar="lgm-2"><a href="#" style={{"width":"100%"}}>Please change your password</a></li>
               </ul>
               <div className="logmod__tab-wrapper">
                         <form acceptCharset="utf-8" action="#" id="loginform">
                              <div className="card">
                                   <div className="input-container">
                                     <input type="password" id="oldpassword" required="required"/>
                                     <div className="hide-password">Show</div>
                                     <label htmlFor="oldpassword">Old Password</label>
                                        <div className="bar"></div>
                                   </div>
                                   <div className="input-container">
                                        <input type="password" id="Password" required="required"/>
                                        <div className="hide-password">Show</div>
                                        <label htmlFor="Password">New Password</label>
                                        <div className="bar"></div>
                                   </div>
                              </div>
                              <div className="simform__actions">
                                   <input className="sumbit" name="commit" type="sumbit" defaultValue="Log In" onClick={this.onChangePassword} />
                              </div>
                         </form>
                    </div>

               </div>
          </div>
        </div>

    )
  }
});

module.exports = ChangePassword;
