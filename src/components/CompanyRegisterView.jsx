var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var moment = require("moment");
var Dropzone = require('react-dropzone');
var request = require('superagent');
var config= require("../../config.js");
var requestlib = require("../../controllers/request.js");
var browserHistory = require('react-router').browserHistory;

var CompanyRegisterView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    console.log(this.props)
    return {
    };
  },

  onRegister: function(e) {
    console.log(e);
    var companyName=$("#CompanyName").val();
    var companyIndustry=$("#CompanyIndustry").val();
    var companyLocation=$("#CompanyLocation").val();
    var companyUrl=$("#CompanyWebsite").val();
    var companyDomain=$("#CompanyDomain").val();
    var companySize=$("#CompanySize").val();
    var companyYearFounded=$("#CompanyYearFounded").val();
    var facebookUrl=$("#FacebookUrl").val();
    var linkedinUrl=$("#LinkedinUrl").val();
    var companyRegisterUrl = config.baseUrl+"/companies";
    var postBody = {
      companyName:companyName,
      companyIndustry:companyIndustry,
      companyLocation:companyLocation,
      companyUrl:companyUrl,
      companyDomain:companyDomain,
      companySize:companySize,
      companyYearFounded:companyYearFounded,
      facebookUrl:facebookUrl,
      linkedinUrl:linkedinUrl
    };
    console.log(postBody, companyRegisterUrl);
    var headers = {"Content-Type":"application/json"};
    var that = this;
    requestlib.post(companyRegisterUrl,postBody,headers,function(err,response){
      that.context.router.transitionTo('/business/login');
      window.location.reload();
    })
  },

  render: function() {
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
            <div className="logmod__tab-wrapper">
              <div className="logmod__tab lgm-2">
                <h2>Register Your Company</h2>
                <form acceptCharset="utf-8" action="#" className="simform">
                  <div className="card">
                    <div className="input-container">
                      <input type="text" id="CompanyName" required="required" />
                      <label htmlFor="CompanyName">Company Name</label>
                      <div className="bar"></div>
                    </div>
                    <div className="input-container">
                      <input type="text" id="CompanyIndustry" required="required" />
                      <label htmlFor="CompanyIndustry">Industry</label>
                      <div className="bar"></div>
                    </div>
                    <div className="input-container">
                      <input type="text" id="CompanyLocation" required="required" />
                      <label htmlFor="CompanyLocation">Location</label>
                      <div className="bar"></div>
                    </div>
                    <div className="input-container">
                      <input type="url" id="CompanyWebsite" required="required" />
                      <label htmlFor="CompanyWebsite">Website</label>
                      <div className="bar"></div>
                    </div>
                    <div className="input-container">
                      <input type="url" id="CompanyDomain" required="required" />
                      <label htmlFor="CompanyDomain">Company Domain</label>
                      <div className="bar"></div>
                    </div>
                    <div className="input-container">
                      <input type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" min="1" id="CompanySize" required="required"
                      />
                      <label htmlFor="CompanySize">Company Size</label>
                      <div className="bar"></div>
                    </div>
                    <div className="input-container open">
                      <input type="date" id="CompanyYearFounded" defaultValue={moment(new Date()).format( 'YYYY-MM-DD')} required="required" />
                      <label htmlFor="CompanyYearFounded">Year Founded</label>
                      <div className="bar"></div>
                    </div>
                    <div className="input-container clearfix">
                      <div className="wd47 mrrg3per">
                        <input type="url" id="FacebookUrl" required="required" />
                        <label htmlFor="FacebookUrl">Facebook URL</label>
                        <div className="bar"></div>
                      </div>
                      <div className="wd47 mrlt3per">
                        <input type="url" id="LinkedinUrl" required="required" />
                        <label htmlFor="LinkedinUrl">Linkedin URL</label>
                        <div className="bar"></div>
                      </div>
                    </div>
                  </div>
                  <div className="simform__actions">
                    <input className="bg-vd yellow pull-right sumbit" name="commit" type="sumbit" onClick={this.onRegister} defaultValue="Register" />
                  </div>
                </form>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CompanyRegisterView;
