var React = require('react/addons');

var moment = require('moment');
var utils = require('./../../../utils/helper.js');
var requestlib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');
var ProfileActions = require('../../../actions/ProfileActions.js')
var ShowApplicantsModal = require('./ShowApplicantsModal.jsx');
var AddJobModal = require('./../MyJobs/AddJobModal.jsx');

var MyJobList = React.createClass({

    getInitialState: function() {
        return {
            showApplicantsModal: false,
            showEditModal: false
        };
    },

    handleApplicantsHideModal: function() {
        this.setState({
            showApplicantsModal: false
        })
    },

    handleEditHideModal: function() {
      ProfileActions.loadJobPosts();
        this.setState({
            showEditModal: false
        })
    },

    handleShowModal: function(e) {
        var modalTitle = (type === "edit")
        ? "Edit a job: " + jobId
        : "Add a Job";

        var type = $(e.currentTarget).data("type");
        var index = $(e.currentTarget).data("index");
        var editJob = (index !== -1) ? this.props.postedJobs[index] : null;
        var jobId = $(e.currentTarget).data("id");
        var modalTitle = (type === "applicants") ? "Show Applicants": "Edit a Job: " + jobId.toString();

        if (type === "applicants") {
            this.setState({
                showApplicantsModal: true,
                showEditModal: false,
                jobId: jobId,
                modalTitle: modalTitle
            });
        } else {
            this.setState({
                showApplicantsModal: false,
                showEditModal: true,
                jobId: jobId,
                editJob: editJob,
                modalTitle: modalTitle
            });
        }
    },

    handleNewJobPost: function(newJobPost) {
        var jobPosts = this.props.postedJobs || [];
        jobPosts.unshift(newJobPost);
        // this.props.updateJobs(jobPosts);
    },

    onJobDelete: function(e) {
        var that = this;
        var index = $(e.currentTarget).data("index");
        var jobPosts = this.props.postedJobs || [];
        var deleteJob = this.props.postedJobs[index];
        var deleteJobUrl = config.baseUrl + "/jobs/" + deleteJob.id;
        var headers = {
            "Content-Type": "application/json"
        };
        requestlib.delete(deleteJobUrl, headers, function(err, response) {
            if (err) {
                swal('Error', err, 'error');
            } else {
                swal('Success', 'Job Deleted Successfully', 'success');
                jobPosts.splice(index, -1);
            }
        });
    },

    render: function() {
        var that = this;
        var postedJobs = this.props.postedJobs || [];
        var JobsList = postedJobs.map(function(item, index) {
            if(index<3){
              return (
                  <div key={index} className="sfdtile clearfix">
                      <h3>{item.title ? item.title : ""}</h3>
                      <div className="sfdfooter clearfix">
                          <span>{utils.getCurrentTimeDifference(moment(item.createdAt), 'days')} <small>Days ago</small></span>
                          <span>{utils.checkNested(item, 'applied') ? item.counts.applied : "0"} <small>Applied</small></span>
                      </div>
                      <div className="clearfix"></div>
                      <a href="#" className="sfsa" data-index={index} data-id={item.id} data-toggle="modal" data-type="applicants" data-target="#ShowApplicantsModal" onClick={that.handleShowModal}>Show Applicants <i className="fa fa-external-link"></i></a>
                      <div className="sftoolsbox">
                          <span className="sftools edit" data-index={index} data-id={item.id} data-toggle="modal" data-type="edit" data-target="#AddJobModal" onClick={that.handleShowModal}><i className="fa fa-pencil-square-o"></i></span>
                          <span className="sftools delete" data-index={index} data-id={item.id} onClick={that.onJobDelete}><i className="fa fa-trash-o"></i></span>
                      </div>
                  </div>
              );
          }
        });
        return (
            <div>
                {JobsList}

                {this.state.showApplicantsModal
                ? <ShowApplicantsModal jobId={this.state.jobId} modalTitle={this.state.modalTitle} handleApplicantsHideModal={this.handleApplicantsHideModal} />
                : null}
                {this.state.showEditModal
                ? <AddJobModal jobId={this.state.jobId} modalTitle={this.state.modalTitle} handleHideModal={this.handleEditHideModal} editJob={this.state.editJob} handleNewJobPost={this.handleNewJobPost} />
                : null}
            </div>
        );
    }
});

module.exports = MyJobList;
