var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var config = require("../../config.js");
var requestlib = require("../../controllers/request.js");

var FormParentComponent = React.createClass({

  onSubmit: function () {
    var formId = this.props.formId;
    var type = this.props.type;
    var userId = this.props.userId;
    var formlength = $('#' + formId + ' input.form-control').length
    var modValue = 7;
    if (type == "education") {
      modValue = 4
    }
    var arrList = [];
    var arrObj = {};
    var errorOccurred = false;
    var modalId = this.props.modalId;

    if (type == "education" || type == "experience") {
      $('#' + formId + ' .form-control')
        .each(function (index, el) {
          var name = $(el).data("nametag");
          var val = $(el).val();
          console.log("Nametag ", name);

          if (name == "from" || name == "to") {
            if (val != undefined)
              val = new Date(val).getTime() / 1000;
            else {
              val = 0
            }
          }
          if (name === "working") {
            val = false;
            val = $(el).is(":checked");
            if (val === true)
              arrObj["to"] = 0;
            }
          else {
            arrObj["to"] = null;
            arrObj["working"] = false;
          }
          if (name != "working" && (val == undefined || val == "")) {
            swal('Error', name + " field cannot be empty", 'error');
            errorOccurred = true;
          }
          arrObj[name] = val;
          console.log(arrObj[name]);
          if ((index + 1) % modValue == 0) {
            arrList.push(arrObj)
            arrObj = {}
          }
        });
    }
    if (!errorOccurred) {
      var userUpdateUrl = config.baseUrl + "/users/" + userId;
      var postBody = {};
      if (type == "experience") {
        postBody["experienceList"] = arrList;
      } else if (type === "education") {
        postBody["educationList"] = arrList;
      }
      requestlib
        .put(userUpdateUrl, postBody, {
          "Authorization": localStorage.getItem("shtoken")
        }, function (err, returnObj) {
          console.log(err);
          $("#" + modalId).modal("hide");
        })
    }
  },
  render: function () {
    var formId = this.props.formId;
    console.log("formId", formId);
    var type = this.props.type;
    console.log("type", type);
    var children = this.props.children;
    console.log("children", children);
    return (
      <div className="modal fade" id={this.props.modalId} role="dialog">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Add/Edit {type}</h4>
            </div>
            <div className="modal-body">
              <div className="row marginBottom20">
                <div className="col-xs-1">
                  <button
                    type="button"
                    className="btn btn-default addButton"
                    onClick={this.props.addChild}>
                    <i className="fa fa-plus" onClick={this.props.addChild}></i>
                  </button>
                </div>
                <div className="col-xs-1">
                  <button
                    type="button"
                    className="btn btn-default addButton"
                    onClick={this.props.removeChild}>
                    <i className="fa fa-minus" onClick={this.props.removeChild}></i>
                  </button>
                </div>
              </div>
              <div className="empty"></div>
              <div className="row">
                <div className="col-xs-12">
                  <form
                    id={formId}
                    method="post"
                    className="form-horizontal"
                    onSubmit={this.onSubmit}>
                    {children}
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default pull-left"
                onClick={this.onSubmit}>Submit</button>
              <button
                type="button"
                className="btn btn-default pull-right"
                data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = FormParentComponent;
