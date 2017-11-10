var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var moment = require("moment");
var Dropzone = require('react-dropzone');
var request = require('superagent');
var config= require("../../../../config.js");
var requestlib = require("../../../../controllers/request.js");
var browserHistory = require('react-router').browserHistory;
var ProfileActions = require('./../../../actions/ProfileActions.js');
var ProfileStore = require('./../../../stores/ProfileStore.js');

var AdminSection = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function() {
    // console.log("componentWillMount")
    var that = this;
    ProfileStore.listen(function (state) {
      // console.log("new state ===",state)
      that.setState(state);
    });
  },
  componentDidMount: function() {
    // console.log("componentDidMount")
    ProfileActions.loadAdminDashBoard();
  },

  componentWillUnmount: function() {
      // console.log("componentWillUnmount")
    ProfileStore.unlisten(this.onChange);
  },

  onChange: function(state) {
    // console.log("onChange")
    this.setState(state);
  },

  getInitialState: function() {
    // console.log("getInitialState")
    return ProfileStore.getState();
  },
  onHandleSubmit:function(e){
    var postBody = {
      firstName:$("#addUserForm input#firstName").val(),
      lastName:$("#addUserForm input#lastName").val(),
      email:$("#addUserForm input#email").val(),
      role:$("#addUserForm select#role").val()
    }
    var editType =$("#addUserMModal #editButton").data("edittype");
    if(localStorage.getItem("companyId")){
      postBody["companyId"]=localStorage.getItem("companyId");
    }
    var createUserLogin = config.baseUrl+"/businessUsers";
    var headers = {"Content-Type":"application/json"}
    var that = this;
    if(editType =="new"){
      requestlib.post(createUserLogin,postBody,headers,function(err,response){
        $("#addUserForm")[0].reset();
        var businessUsers = that.state.businessUsers;
        businessUsers.push(postBody);
        that.setState({"businessUsers":businessUsers});
      });
    }else if (editType=="edit") {
      var userId = $("#addUserMModal #editButton").data("userId");
      var index = $("#addUserMModal #editButton").data("iundex");
      createUserLogin = config.baseUrl+"/businessUsers/"+userId;
      requestlib.put(createUserLogin,postBody,headers,function(err,response){
        $("#addUserForm")[0].reset();
        $("#addUserMModal #editButton").data("edittype","new");
        var businessUsers = that.state.businessUsers;
        businessUsers[index]=postBody
        that.setState({"businessUsers":businessUsers});
      });
    }
  },
  onHandleEdit:function(e){
    var index = $(e.currentTarget).data("index");
    var user = this.state.businessUsers[index];
    $("#addUserForm input#firstName").val(user.firstName);
    $("#addUserForm input#lastName").val(user.lastName);
    $("#addUserForm input#email").val(user.email);
    $("#addUserForm select#role").val(user.role);
    $("#addUserMModal #editButton").data("edittype","edit");
    $("#addUserMModal #editButton").data("userId",user.id);
    $("#addUserMModal #editButton").data("index",index);
  },
  onHandleDelete:function(e){
    var index = $(e.currentTarget).data("index");
    var user = this.state.businessUsers[index];
    createUserLogin = config.baseUrl+"/businessUsers/"+user.id;
    var headers = {"Content-Type":"application/json"}
    var that = this;
    requestlib.delete(createUserLogin,headers,function(err,response){
      var businessUsers = that.state.businessUsers;
      businessUsers.splice(index,1);
      that.setState({"businessUsers":businessUsers});
      swal('Success', 'User removed successfully', 'success');
    });
  },
  render: function() {
    var businessUsers = this.state.businessUsers || [];
    var that = this;
    var UserList = businessUsers.map(function(user,index){
      return(
        <tr key={index}>
            <th scope="row" data-id={user.id}>{index+1}</th>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.role}</td>
            <td>{user.email}</td>
            <td>
                <span className="fa fa-pencil editicon" data-index={index} data-toggle="modal" data-target="#addUserMModal" onClick={that.onHandleEdit}></span>
                <span className="fa fa-close editicon" data-index={index} onClick={that.onHandleDelete}></span>
            </td>
        </tr>
      )
    })
    return (
      <div className="pdtp10">
          <div className="white-content pd15 clearfix">
              <div className="row">
                  <div className="col-xs-12">
                      <h3 className="sfsubtitle">Admin Dashboard <i data-toggle="modal" data-target="#addUserMModal" className="fa fa-plus pull-right"></i></h3>
                  </div>
              </div>
          </div>

          <div className="clearfix lineseperator"></div>

          <div className="white-content pd15 mrbt15 clearfix">
              <div className="row">
                  <div className="col-xs-12 col-sm-12">
                      <table className="table table-striped dboard">
                          <thead>
                              <tr>
                                  <th>#</th>
                                  <th>Name</th>
                                  <th>Role</th>
                                  <th>Email ID</th>
                                  <th>Modify</th>
                              </tr>
                          </thead>
                          <tbody>
                            {UserList}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
          <div id="addUserMModal" className="modal fade" role="dialog">
            <div className="modal-dialog" style={{"width":"900px"}}>
              <div className="modal-content">
                <div>
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Add new user</h4>
                  </div>
                  <div className="modal-body">
                    <form id="addUserForm" method="post" className="form-horizontal" onSubmit={this.onSubmit}>
                        <div className="col-xs-3">
                          <input type="text" className="form-control"  data-nametag="firstName" id="firstName" placeholder="First Name"/>
                        </div>
                        <div className="col-xs-3">
                          <input type="text" className="form-control"  data-nametag="lastName" id="lastName" placeholder="Last Name"/>
                        </div>
                        <div className="col-xs-3">
                            <input type="text" className="form-control"  data-nametag="email" id="email" placeholder="Email"/>
                        </div>
                        <div className="col-xs-3">
                          <select className="selectpicker form-control" id="role">
                            <option value="businessAdmin">Admin</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="freeBusinessUser">Free User</option>
                          </select>
                        </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer" style={{borderTop:0 + "px"}}>
                  <button id="editButton" type="button" className="btn btn-default" data-dismiss="modal" data-edittype="new" onClick={this.onHandleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
});

module.exports = AdminSection;
