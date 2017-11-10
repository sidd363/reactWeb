var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var moment = require("moment");
var request = require('superagent');
var config = require('../../config.js');
var requestlib = require("../../controllers/request.js");
var ProfileStore = require('../stores/ProfileStore');
var ProfileActions = require('../actions/ProfileActions.js');
var _ = require('lodash');
var BootstrapTagsInput = require('./Business/common/bootstrapTagsInput.jsx');
var EditProfileModal = require("./EditProfileModalComponent.jsx");
var ProfileViewModal = require('./Business/common/ProfileModalComponent.jsx');
var SkillsModal = require('./common/SkillsModal.jsx');
var VideoScoreModal = require('./common/VideoScoreModal.jsx');
var Pagination = require('./common/Pagination.jsx');
var FullTextSearch = require('./common/FullTextSearch.jsx');

var UserListUpdate = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function () {
    if (Storage && !localStorage.getItem("shtoken")) {
      this
        .context
        .router
        .transitionTo('/admin');
    }
    ProfileStore.listen(this.onChange);
  },

  openUserProfileModal: function (userId) {
    this.setState({"showProfileModal": true, "userId": userId});
  },

  componentWillUnmount: function () {
    ProfileStore.unlisten(this.onChange);
  },

  onChange: function (state) {
    this.setState(state);
  },
  onBulkUpload: function (e) {
    e.preventDefault();
    this
      .context
      .router
      .transitionTo('/admin/bulk/update');
    return false;
  },
  getInitialState: function () {
    this.state = {
      users: ProfileStore
        .getState()
        .users,
      allusers: ProfileStore
        .getState()
        .users,
      view: {
        showExperience: false,
        showEducation: false,
        showSkills: false,
        showVideoScore: false
      },
      showProfileModal: false
    }
    return this.state;
  },

  onLogout: function (e) {
    var token = localStorage.getItem("shtoken");
    var logoutApiUrl = config.baseUrl + "/users/logout";
    var that = this;
    requestlib.post(logoutApiUrl, null, {
      "Authorization": token
    }, function (err, data) {
      localStorage.setItem("shtoken", null);
      localStorage.setItem("shid", null);
      that
        .context
        .router
        .transitionTo('/admin');
      window
        .location
        .reload()
    })
    console.log(token);
  },

  fileOnChange: function (e) {
    var file = e.target.files[0];
    var id = $(e.target).data("userid");
    var ext = file
      .name
      .split('.')
      .pop();
    var userid = localStorage.getItem("shid");
    var token = localStorage.getItem("shtoken");
    requestlib.post(config.baseUrl + "/users/profile/" + id + "/resume", {
      "file": {
        type: file.type,
        ext: ext
      }
    }, {
      "Authorization": token
    }, function (err, resp) {
      var signedUrl = resp.body.signedUrl;
      console.log("signedUr====", signedUrl)
      request
        .put(signedUrl)
        .send(file)
        .set({'Content-Type': file.type})
        .end(function (err, res) {
          console.log(err)
        })
    })
  },

  handleSkillsModalOpen: function (e) {
    var index = $(e.currentTarget).data('index');
    var type = $(e.currentTarget).data('type');
    var currentUser = this.state.users[index];
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.setState({
      view: {
        showSkills: true
      },
      currentUser: currentUser
    });
  },

  handleVideoScoreModalOpen: function (e) {
    var index = $(e.currentTarget).data('index');
    var type = $(e.currentTarget).data('type');
    var currentUser = this.state.users[index];
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.setState({
      view: {
        showVideoScore: true
      },
      currentUser: currentUser
    });
  },

  handleEduExpModalOpen: function (e) {
    var index = $(e.currentTarget).data('index');
    var type = $(e.currentTarget).data('type');
    var currentUser = this.state.users[index];
    console.log("aise hi", currentUser, index);
    var numChildren = 1;
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    if (type == "experience" && currentUser["experienceList"]) {
      numChildren = currentUser["experienceList"].length;
    } else if (type == "education" && currentUser["educationList"]) {
      numChildren = currentUser["educationList"].length;
    }
    if (type == "experience") {
      this.setState({
        view: {
          showExperience: true
        },
        currentUser: currentUser
      })
    } else if (type == "education") {
      this.setState({
        view: {
          showEducation: true
        },
        currentUser: currentUser
      })
    } else if (type === "skills") {
      this.setState({
        view: {
          showSkills: true
        },
        currentUser: currentUser
      })
    } else {
      this.setState({
        view: {
          showVideoScore: true
        },
        currentUser: currentUser
      })
    }

  },

  handleHideModal() {
    localStorage.setItem("currentUser", null);
    this.setState({
      view: {
        showExperience: false
      }
    })
    this.setState({
      view: {
        showEducation: false
      }
    })
    this.setState({
      view: {
        showSkills: false
      }
    })
    this.setState({
      view: {
        showVideoScore: false
      }
    })
  },

  handleProfileHideModal: function () {
    this.setState({"showProfileModal": false});
  },

  openUserProfileModal: function (e) {
    var userId = $(e.currentTarget).data("userid");
    this.setState({"showProfileModal": true, "userId": userId});
  },

  handleFullTextSearch: function (data) {
    this.setState({users: data});
  },

  render: function () {
    var allusers = this.state.users || [];
    var that = this;
    var userList = allusers.map(function (user, index) {
      var slug = user
        .firstName
        .toLowerCase() + "-" + user
        .lastName
        .toLowerCase() + "-" + user.id;
      var mainProfileUrl = '/profile/' + slug;
      var date = moment(user.joiningDate);
      var dateA = date.format('MMMM Do YYYY, h:mm a');
      var dateB = date.fromNow();
      return (
        <tr key={index} className="text-left pdl15 adminUsersPanel">
          <td>
            <a
              href="#"
              onClick={that.openUserProfileModal}
              className="table-link"
              data-userid={user.id}>
              <span><img className="userImage" src={user.image_url} alt=""/></span>
              <span className="count-button__badge">{user.videoCount}</span>
              <span>{user.firstName} {user.lastName}</span>
            </a>
          </td>
          <td>
            <div>{dateA}</div>
            <div>{"(" + dateB + ")"}</div>
          </td>
          <td>
            <a href="#">{user.email}</a>
          </td>
          <td className="wd20">
            <div className="otherInfoLink dfffrnjcsbaic">
              <div
                className="table-link modalClick"
                data-type="experience"
                data-userid={user.id}
                data-index={index}
                data-target="#myModal"
                onClick={that.handleEduExpModalOpen}>
                Experience
              </div>
              <div
                className={user.experienceList && user.experienceList.length > 0
                ? "led led-green"
                : "led led-red"}></div>
            </div>
            <div className="otherInfoLink dfffrnjcsbaic">
              <div
                className="table-link modalClick"
                data-type="education"
                data-userid={user.id}
                data-index={index}
                data-target="#myModalEducation"
                onClick={that.handleEduExpModalOpen}>
                Education
              </div>
              <div
                  className={user.educationList && user.educationList.length > 0
                  ? "led led-green"
                  : "led led-red"}></div>
            </div>
            <div className="otherInfoLink dfffrnjcsbaic">
              <div
                className="table-link modalClick"
                data-type="skills"
                data-userid={user.id}
                data-index={index}
                data-target="#myModalSkills"
                onClick={that.handleSkillsModalOpen}>
                Skills
              </div>
              <div
                className={user.skillList && user.skillList.length > 0
                ? "led led-green"
                : "led led-red"}></div>
            </div>
            <div className="otherInfoLink dfffrnjcsbaic">
              <div
                className="table-link modalClick"
                data-type="videoScore"
                data-userid={user.id}
                data-index={index}
                data-target="#myModalVideoScore"
                onClick={that.handleVideoScoreModalOpen}>
                Video Score
              </div>
              <div
                className={user.videoScore && !(_.isEmpty(user.videoScore))
                ? "led led-green"
                : "led led-red"}></div>
            </div>
            <div className="otherInfoLink dfffrnjcsbaic">
              <div className="table-link">
                <a href={user.resumeUrl} target="_blank">Resume
                </a>
              </div>
              <div
                className={user.resumeUrl && !(_.isEmpty(user.resumeUrl))
                ? "led led-green"
                : "led led-red"}></div>
            </div>
            <a href="#" className="table-link ml20">
              <input type="file" onChange={that.fileOnChange} data-userid={user.id}/>
            </a>
          </td>
        </tr>
      )
    });
    return (
      <div className="updateProfile container bootstrap snippet">
        <input type="hidden" name="currentUserId" id="currentUserId" value=""/>
        <a href="#" className="btn btn-info pull-right" onClick={this.onBulkUpload}>
          <i className="fa fa-power-off"></i>
          &nbsp;Bulk Upload
        </a>
        <a href="#" className="btn btn-info pull-right mrrt20" onClick={this.onLogout}>
          <i className="fa fa-power-off"></i>
          &nbsp;Logout
        </a>
        {this.state.showProfileModal
          ? <ProfileViewModal
              userId={this.state.userId}
              handleProfileHideModal={this.handleProfileHideModal}/>
          : null}
        {this.state.view.showExperience
          ? <EditProfileModal
              currentUser={this.state.currentUser}
              type="experience"
              id="myModal"
              ref={(foo) => {
              this.foo = foo;
            }}
              handleHideModal={this.handleHideModal}/>
          : null}
        {this.state.view.showEducation
          ? <EditProfileModal
              currentUser={this.state.currentUser}
              type="education"
              id="myModalEducation"
              ref={(foo) => {
              this.foo = foo;
            }}
              handleHideModal={this.handleHideModal}/>
          : null}
        {this.state.view.showSkills
          ? <SkillsModal
              currentUser={this.state.currentUser}
              type="skills"
              id="myModalSkills"
              ref={(foo) => {
              this.foo = foo;
            }}
              handleHideModal={this.handleHideModal}/>
          : null}
        {this.state.view.showVideoScore
          ? <VideoScoreModal
              currentUser={this.state.currentUser}
              type="videoScore"
              id="myModalVideoScore"
              ref={(foo) => {
              this.foo = foo;
            }}
              handleHideModal={this.handleHideModal}/>
          : null}
        <div className="row">
          <div className="col-lg-12 tableWrapper card-4">
            <FullTextSearch handleFullTextSearch={this.handleFullTextSearch}/>
            <table className="table table-bordered table-striped table-responsive">
              <thead>
                <tr className="text-center">
                  <th className="pdl15">
                    <span>User</span>
                  </th>
                  <th>
                    <span>Joining Date</span>
                  </th>
                  <th>
                    <span>Email</span>
                  </th>
                  <th>
                    <span>Other Info</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {userList}
              </tbody>
            </table>
            <Pagination pageLength={allusers.length}/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = UserListUpdate;
