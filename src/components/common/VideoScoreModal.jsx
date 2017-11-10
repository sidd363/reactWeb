var React = require('react/addons');
var BootstrapTagsInput = require('./../Business/common/bootstrapTagsInput.jsx');
var requestLib = require('./../../../controllers/request.js');
var config = require('./../../../config.js');

var VideoScoreModal = React.createClass({

    componentDidMount() {
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
        $('#skills').tagsinput();
    },

    onSubmit: function (e) {
        e.preventDefault();
        var that = this;
        var modalId = this.props.id;
        var currentUserObj = this.props.currentUser;
        var userId = currentUserObj.id;
        var userUpdateUrl = config.baseUrl + '/users/' + userId;

        var postBody = {
            "videoScore": {}
        };
        var vsKeys = ["overall", "confidence", "communication", "sne", "pg"];
        $('#myVideoScoreForm .form-control').each(function (index, el) {
            console.log(el);
            var name = $(el).data("name");
            console.log("name", name);
            var val = $(el).val();
            postBody["videoScore"][vsKeys[index]] = val;
        });
        requestLib.put(userUpdateUrl, postBody, {
            "Authorization": localStorage.getItem("shtoken")
        }, function (err, returnObj) {
            if (err) {
                swal('Error Adding Skills', err, 'error');
            } else {
                swal('Skills Added Successfully', '', 'success');
            }
        });
        $("#" + modalId).modal("hide");
    },

    render: function () {
        var videoScoreObj = this.props.currentUser.videoScore
            ? this.props.currentUser.videoScore
            : {};

        var vsKeys = ["overall", "confidence", "communication", "sne", "pg"];
        var vsNames = ["Overall", "Confidence", "Communication", "Sincerity & Effort", "Personal Grooming"];

        var videoScoreList = vsKeys.map(function (item, index) {
            return (
                <div key={index} className="form-group">
                    <div>{vsNames[index]}</div>
                    <select
                        defaultValue={videoScoreObj[item]}
                        className="form-control"
                        id={item + "-score"}
                        name={item}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
            );
        });

        return (
            <div className="modal fade" id={this.props.id} role="dialog">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Add/Edit Video Score</h4>
                    </div>
                    <div className="modal-body">
                        <form
                            id="myVideoScoreForm"
                            method="post"
                            className="form-horizontal"
                            onSubmit={this.onSubmit}>
                            {videoScoreList}
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

module.exports = VideoScoreModal;