var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var moment = require("moment");
var Dropzone = require('react-dropzone');
var request = require('superagent');
var config= require("../../config.js");
var requestlib = require("../../controllers/request.js");
var browserHistory = require('react-router').browserHistory;
var LoginView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    console.log(this.context)
    var type = "user"
    if(this.context.router.getCurrentPathname().indexOf("business")!=-1) {
      type="business"
    }
    return {"type":type};
  },
  onLogin:function(e){
    console.log("onLogin",e);
    var password=$("#loginform input#Password").val();
    var username=$("#loginform input#Username").val();
    var loginApiUrl = config.baseUrl+"/users/login";
    if(this.state.type=="business"){
      loginApiUrl = config.baseUrl+"/businessUsers/login";
    }
    var postBody = {email:username,password:password};
    var headers = {"Content-Type":"application/json"}
    console.log(this)
    var that = this;
    requestlib.post(loginApiUrl,postBody,headers,function(err,response){
      var userObj = response.body;
      localStorage.setItem("shtoken", userObj.id);
      localStorage.setItem("shid",userObj.userId);
      localStorage.setItem("firstLogin",userObj.firstLogin);
      localStorage.setItem("companyId",userObj.companyId);
      localStorage.setItem("userObj",JSON.stringify(userObj));
      if(that.state.type=="user"){
        that.context.router.transitionTo('/admin/profile/update');
      }else if (that.state.type=="business") {
        if(userObj.firstLogin){
          that.context.router.transitionTo('/business/changePassword');
        }else{
          // that.context.router.transitionTo('/business/dashboard');
          window.location.href = '/business/dashboard';
        }
      }
      //window.location.reload();
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
                    <a href="/" className="loginlogo">
                      <img src="/web/images/shrofile-logo-red.png" alt="Shrofile" />
                    </a>
                </div>
            </div>
          </div>
        </div>
        <div className="logmod__wrapper">
          <div className="logmod__container">
               <ul className="logmod__tabs">
                    <li data-tabtar="lgm-2"><a href="#" className="wd100">Login</a></li>
                    {type == "user" &&
                    <li data-tabtar="lgm-1"><a href="#">Sign Up</a></li>
                    }
               </ul>
               <div className="logmod__tab-wrapper">
                 {type=="user" &&
                    <div className="logmod__tab lgm-1">
                         <div className="logmod__alter">
                              <a href="#" className="connect facebook">
                                   <div className="connect__icon">
                                        <i className="fa fa-facebook"></i>
                                   </div>
                                   <div className="connect__context">
                                        <span>Facebook</span>
                                   </div>
                              </a>

                              <a href="#" className="connect googleplus">
                                   <div className="connect__icon">
                                        <i className="fa fa-google"></i>
                                   </div>
                                   <div className="connect__context">
                                        <span>Google</span>
                                   </div>
                              </a>
                         </div>
                         <div className="horizonatal-line"><span>OR</span></div>
                         <form acceptCharset="utf-8"  className="simform">
                              <div className="card">
                                   <div className="input-container">
                                        <input type="text" id="Fullname" required="required"/>
                                        <label htmlFor="Fullname">Full Name</label>
                                        <div className="bar"></div>
                                   </div>
                                   <div className="input-container">
                                        <input type="password" id="Email" required="required"/>
                                        <label htmlFor="Email">Email</label>
                                        <div className="bar"></div>
                                   </div>
                                   <div className="input-container clearfix">
                                        <div className="wd47 mrrg3per">
                                             <input type="text" id="Password" required="required"/>
                                             <label htmlFor="Password">Password</label>
                                             <div className="bar"></div>
                                        </div>
                                        <div className="wd47 mrlt3per">
                                             <input type="text" id="RptPassword" required="required"/>
                                             <label htmlFor="RptPassword">Repeat Password</label>
                                             <div className="bar"></div>
                                        </div>
                                   </div>
                                   <div className="input-container clearfix">
                                        <div className="wd47 mrrg3per">
                                             <input type="text" id="Age" required="required"/>
                                             <label htmlFor="Age">Age</label>
                                             <div className="bar"></div>
                                        </div>
                                        <div className="wd47 mrlt3per">
                                             <label htmlFor="RptPassword">Sex</label>
                                             <div className="btn-group gendergrp" role="group" aria-label="">
                                                  <button type="button" className="gendericon male">&nbsp;</button>
                                                  <button type="button" className="gendericon female">&nbsp;</button>
                                             </div>
                                             <div className="bar"></div>
                                        </div>
                                   </div>
                              </div>
                              <div className="simform__actions">
                                   <input className="btn" type="button" defaultValue="Create Account" onClick={this.onLogin} />
                                   <span className="simform__actions-sidetext" >By creating an account you agree to our <a className="special" href="#" target="_blank" role="link">Terms & Privacy</a></span>
                              </div>
                         </form>
                    </div>
                  }
                    <div className="logmod__tab lgm-2 show">
                      {type == "user" &&
                         <div className="logmod__alter">
                              <a href="#" className="connect facebook">
                                   <div className="connect__icon">
                                        <i className="fa fa-facebook"></i>
                                   </div>
                                   <div className="connect__context">
                                        <span>Facebook</span>
                                   </div>
                              </a>

                              <a href="#" className="connect googleplus">
                                   <div className="connect__icon">
                                        <i className="fa fa-google"></i>
                                   </div>
                                   <div className="connect__context">
                                        <span>Google</span>
                                   </div>
                              </a>
                         </div>
                       }
                       {type == "user" &&
                         <div className="horizonatal-line"><span>OR</span></div>
                         }
                         <form acceptCharset="utf-8" action="#" id="loginform">
                              <div className="card mrtp30">
                                   <div className="input-container">
                                        <input type="text" id="Username" required="required"/>
                                        <label htmlFor="Username">Username</label>
                                        <div className="bar"></div>
                                   </div>
                                   <div className="input-container">
                                        <input type="password" id="Password" required="required"/>
                                        <div className="hide-password">Show</div>
                                        <label htmlFor="Password">Password</label>
                                        <div className="bar"></div>
                                   </div>
                              </div>
                              <div className="simform__actions">
                                   <input className="sumbit" name="commit" type="sumbit" defaultValue="Log In" onClick={this.onLogin} />
                                   <span className="simform__actions-sidetext"><a className="special" role="link" href="#">Forgot your password?</a></span>
                              </div>
                         </form>
                    </div>

               </div>
          </div>
        </div>

      </div>

    )
  }
});

module.exports = LoginView;
