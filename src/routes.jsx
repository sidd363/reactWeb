var React = require('react/addons');
var Route = require('react-router').Route;
var ProfileView = require('./components/ProfileView.jsx');
var VideoView = require('./components/VideoView.jsx');
var AllVideosView = require('./components/AllVideosView.jsx');
var UserListUpdate = require('./components/UserListUpdate.jsx');
var BulkResumeUpdate = require('./components/BulkResumeUpdate.jsx');
var LoginView = require('./components/LoginView.jsx');
var CompanyRegisterView = require('./components/CompanyRegisterView.jsx');
var BusinessDashboardView = require('./components/Business/BusinessDashboardView.jsx');
var MainApp = require('./components/App.jsx');
var BusinessApp = require("./components/Business/BusinessApp.jsx");
var ChangePassword = require("./components/changePassword.jsx")
var MainAppComponent = React.createClass({
    contextTypes:{
        router: React.PropTypes.func
    },
    render:function(){
        var pathname = this.context.router.getCurrentPathname();
        var Handler = MainApp;
        if(pathname.indexOf("business")!=-1){
            Handler=BusinessApp;
        }
        return <Handler {...this.props} />;
    }
})

var routes = (
    <Route name='home' path="/" handler={MainAppComponent}>
      <Route name="UserListUpdate" path="/admin/profile/update" handler={UserListUpdate} />
      <Route name="BulkResumeUpdate" path="/admin/bulk/update" handler={BulkResumeUpdate} />
      <Route name="profileView" path="/profile/:slug" handler={ProfileView}/>
      <Route name="videoView" path="/videos/:slug" handler={VideoView}/>
      <Route name="AllVideosView" path="/videos" handler={AllVideosView}/>
      <Route name="LoginView" path="/admin" handler={LoginView} />
      <Route name="CompanyRegisterView" path="/business/register" handler={CompanyRegisterView} />
      <Route name="BusinessDashboardView" path="/business/dashboard" handler={BusinessDashboardView} />
      <Route name="BusinessLogin" path="/business/login" handler={LoginView} />
      <Route name="BusinessChangePassword" path="/business/changePassword" handler={ChangePassword} />
    </Route>
);

module.exports = routes;
