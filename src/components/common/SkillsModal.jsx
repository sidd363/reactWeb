var React = require('react/addons');
var BootstrapTagsInput = require('./../Business/common/bootstrapTagsInput.jsx');
var requestLib = require('./../../../controllers/request.js');
var config = require('./../../../config.js');

var SkillsModal = React.createClass({

    componentDidMount () {
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
        $('#skills').tagsinput();
    },

    onSubmit: function (e) {
        e.preventDefault();
        var that = this;
        var skills = $('input#skills').tagsinput('items');
        var modalId = this.props.id;
        var currentUserObj = this.props.currentUser;
        var userId = currentUserObj.id;
        var postBody = {
            "skillList": skills
        };
        var userUpdateUrl = config.baseUrl + '/users/' + userId;
        requestLib.put(userUpdateUrl, postBody, {
            "Authorization": localStorage.getItem("shtoken")
        }, function (err, returnObj) {
            if (err) {
                swal('Error Adding Skills', err, 'error');
            } else {
                $("#" + modalId).modal("hide");
                swal('Skills Added Successfully', '', 'success');
            }
        });
    },

    render: function () {
        console.log(this.props.currentUser);
        var defaultValue = this.props.currentUser.skillList
            ? this.props.currentUser.skillList
            : "";
        return (
            <div className="modal fade" id={this.props.id} role="dialog">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add/Edit Skills</h4>
                        </div>
                        <div className="modal-body">
                            <form
                                id="mySkillsForm"
                                method="post"
                                className="form-horizontal"
                                onSubmit={this.onSubmit}>
                                <div class="form-group skillsInputBox">
                                    Skills:
                                    <BootstrapTagsInput defaultValue={defaultValue} type="skills"/>
                                </div>
                            </form>
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
        );
    }
});

module.exports = SkillsModal;