var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var utils = require('./../../../utils/helper.js');

var requestlib = require('./../../../../controllers/request.js');
var request = require('superagent');

var config = require('./../../../../config.js');
var ChangeStatusComponent = require("../common/ChangeStatusComponent.jsx");
var ShowApplicantsModal = React.createClass({

    propTypes: {
        handleApplicantsHideModal: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {};
    },

    componentWillMount: function() {
        var that = this;
        var headers = {"Content-Type": "application/json"};

        var showApplicantsUrl = config.baseUrl + "/applications/" + this.props.jobId + "/all";

        requestlib.get(showApplicantsUrl, function(err, response) {
            that.setState({applicants: response.body});
        });
    },

    componentDidMount: function() {
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleApplicantsHideModal);
    },
    render: function() {
        var that = this;
        var applicants = this.state.applicants || [];

        var applicantsList = applicants.map(function(applicant, index) {
            var applicantName = applicant.firstName.toLowerCase() + "-" + applicant.lastName.toLowerCase();
            return (
                <li key = {applicant.id} className="lklist-item">
                    <a target="_blank" href={"/profile/" + applicantName + "-" + applicant.userId} className="lklist relative">
                        <div className="button__badge">{applicant.videoCount}</div>
                        <img src={applicant.image_url} alt="" />
                        {applicant.firstName + " " + applicant.lastName}
                    </a>
                    <ChangeStatusComponent userId={applicant.userId} applicantName={applicant.firstName} status={applicant.status} id={applicant.id} />
                </li>
            );
        });

        return (
            <div className="modal fade lk-list-modal in" id="ShowApplicantsModal" tabIndex="-1" role="dialog" aria-labelledby="showApplicantsModalLabel">
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="showApplicantsModalLabel">Applicants</h4>
                        </div>
                        <div className="modal-body">
                            <ul className="lkdls">
                                {applicantsList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ShowApplicantsModal;
