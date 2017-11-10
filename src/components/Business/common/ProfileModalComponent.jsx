var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var ProfileActions = require('./../../../actions/ProfileActions.js');
var config = require('./../../../../config.js');
var requestLib = require('./.././../../../controllers/request.js');
var ProfileViewComponent = require("../../ProfileView.jsx");
var ProfileModalComponent = React.createClass({
  componentDidMount: function() {
    if(this.props.userId){
      ProfileActions.loadProfile(this.props.userId);
    }
    $(this.getDOMNode()).modal('show');
    $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleProfileHideModal);
  },

  render: function() {
    return (
      <div className="modal fade container" id="profileViewModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close pull-right" data-dismiss="modal" aria-hidden="true" >&times;</button>
            </div>
            <div className="modal-body">
              <ProfileViewComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProfileModalComponent;
