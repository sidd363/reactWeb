var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var requestLib = require('./.././../../../controllers/request.js');
var config = require('./../../../../config.js');
var utils = require('./../../../utils/helper.js');
var moment = require('moment');
var ProfileStore = require('./../../../stores/ProfileStore.js');
var ProfileActions = require('./../../../actions/ProfileActions.js');

var AddJobModal = require('./AddJobModal.jsx');
var ShowApplicantsModal = require('./../common/ShowApplicantsModal.jsx');
var UploadCandidates = require('./../common/UploadCandidates.jsx');
var SendJobEmail = require('./SendJobEmail.jsx');

var FilteredSearchResults = require('./../SearchPeople/FilteredSearchResults.jsx');
var FilterSearch = require('./../SearchPeople/FilterSearch.jsx');

var MyJobs = React.createClass({

  getInitialState: function () {
    return {
      showModal: false,
      searchFlag: false,
      showApplicantsModal: false,
      filterPayload: [],
      jobposts: ProfileStore
        .getState()
        .jobposts
    };
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount: function () {
    var that = this;
    console.log(this.state.jobposts);
    ProfileStore.listen(function (state) {
      that.setState({jobposts: state.jobposts});
    });
  },

  componentDidMount: function () {
    ProfileActions.loadJobPosts();
  },

  componentWillUnmount: function () {
    ProfileStore.unlisten(this.onChange);
  },

  onChange: function (state) {
    this.setState({jobposts: state.jobposts});
  },

  handleHideModal: function () {
    ProfileActions.loadJobPosts();
    this.setState({showModal: false})
  },

  handleApplicantsHideModal: function () {
    this.setState({showApplicantsModal: false})
  },

  handleShowModal: function (e) {
    var type = $(e.currentTarget).data("type");

    var index = (type === "edit")
      ? $(e.currentTarget).data("index")
      : -1;
    var editJob = (index !== -1)
      ? this.state.jobposts[index]
      : null;
    var jobId = (type === "edit")
      ? $(e.currentTarget).data("id")
      : null;
    var jobName = (type === "edit")
      ? $(e.currentTarget).data("name")
      : null;
    var modalTitle = (type === "edit")
      ? "Edit a job: " + jobName
      : "Add a Job";

    this.setState({showModal: true, modalTitle: modalTitle, editJob: editJob, jobId: jobId});
  },

  handleApplicantsShowModal: function (e) {
    var type = $(e.currentTarget).data("type");

    var index = (type === "applicants")
      ? $(e.currentTarget).data("index")
      : -1;
    // var editJob = (index !== -1)   ? this.state.jobposts[index]   : null;
    var jobId = $(e.currentTarget).data("id");
    var modalTitle = "Likes";

    this.setState({showApplicantsModal: true, jobId: jobId});
  },

  handleNewJobPost: function (newJobPost) {
    ProfileActions.loadJobPosts();
  },

  handleRecommendations: function (payload) {
    this.setState({searchFlag: true});
    var that = this;
    var searchLocation = (payload.locations || []);
    var degree         = (payload.education || []);
    var skills         = (payload.skills || []).toString();
    var company        = payload.company || "";
    var designation    = payload.designation || "";
    var college        = payload.college || "";
    var yearsOfExp     = payload.yearsofexperience || "";

    var gte            = "",
        lte            = "";
    var now            = moment().year();

    if (yearsOfExp.indexOf('-') !== -1) {
        gte = "now-"+yearsOfExp.split('-')[1]+"y/y";
        lte = "now-"+yearsOfExp.split('-')[0]+"y/y";
    }
    var payLoad = {
        "queryObj": {
            "searchLocation": searchLocation,
            "company": company,
            "degree": degree,
            "college": college,
            "designation": designation
        }
    };

    var filterPayload = JSON.parse(JSON.stringify(payLoad));

    filterPayload["queryObj"]["yearsOfExp"] = yearsOfExp;

    var removeEmpty = utils.removeEmpty(payLoad["queryObj"]);
    var requestPayload = {
        "queryObj": removeEmpty
    };

    if(gte.length>0 || lte.length>0){
      payLoad["queryObj"]["workingSince"]={
        "gte": gte,
        "lte": lte
      }
    }
    var headers = {"Content-Type": "application/json"};
    var getSearchUrl = config.baseUrl + "/businessUsers/search";
    requestLib.post(getSearchUrl, requestPayload, headers, function(err, response) {
        that.onHandleFilterSearch(filterPayload["queryObj"], response.body);
        console.log("filterpayload", filterPayload, "results", response.body);
        $('html, body').animate({
            scrollTop: $('#hashHeader').offset().top - 54
        }, 'slow');
    });
  },

  onJobDelete: function (e) {
    console.log("delete");
    var that = this;
    var index = $(e.currentTarget).data("index");
    var jobPosts = this.state.jobposts || [];
    var deleteJob = this.state.jobposts[index];
    var deleteJobUrl = config.baseUrl + "/jobs/" + deleteJob.id;
    var headers = {
      "Content-Type": "application/json"
    };
    requestLib.delete(deleteJobUrl, headers, function (err, response) {
      console.log('delete job', response);
      if (err) {
        swal('Error', err, 'error');
      } else {
        swal('Success', 'Job Deleted Successfully.', 'success');
        jobPosts.splice(index, 1);
        that.setState({jobposts: jobPosts});
      }
    });
  },

  onHandleFilterSearch: function (payLoad, results) {
    this.setState({searchResultsData: results, filterPayload: payLoad});
  },

  showRecommendations: function(e) {
    var type = $(e.currentTarget).data('type');
    var payload = JSON.parse(JSON.stringify($(e.currentTarget).data('post')));
    this.handleRecommendations(payload);
  },

  handleDefaultPage: function() {
    this.setState({
      searchFlag: false
    });
  },

  render: function () {
    var jobposts = this.state.jobposts || [];
    var totalJobs = jobposts.length;
    var that = this;
    var JobList = jobposts.map(function (post, index) {
      return (
        <div key={post.id} className="white-content sfdinfo mrbt10 clearfix">
          <div>
            <div className="sfdtile fb clearfix">
              <h3>{post.title}</h3>

              <div className="row mrtp15">
                <div className="col-xs-12 col-sm-6">
                  <div className="sfdline">
                    <label>Title</label>
                    {post.title}</div>
                  <div className="sfdline">
                    <label>Designation</label>
                    {post.designation}</div>
                  <div className="sfdline">
                    <label>Location</label>
                    {post
                      .locations
                      .join(', ')
                      .toUpperCase()}</div>
                  <div className="sfdline">
                    <label>Education</label>
                    {post
                      .education
                      .join(', ')
                      .toUpperCase()}</div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="sfdline">
                    <label>Skills</label>
                    {post.skills
                      ? post
                        .skills
                        .join(', ')
                        .toUpperCase()
                      : ""}</div>
                  <div className="sfdline">
                    <label>Experience</label>
                    {post.yearsofexperience + " YEARS"}</div>
                  <div className="sfdline">
                    <label>CTC</label>
                    {post.ctc + " LAKHS PER ANNUM"}</div>
                </div>
              </div>
              <div className="clearfix"></div>

              <div className="row mrtp15">
                <div className="col-xs-12 col-sm-6">
                  <div className="sfdline">
                    <div className="sfev">Job Description</div>
                    <p className="sfmjpara">
                      {post.jobDesc}
                    </p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 pull-right">
                  <div className="sfev">Upload Candidates</div>
                  {/*<span>&nbsp;Video Comment</span>*/}
                  <UploadCandidates jobId={post.id}/>
                  <SendJobEmail jobId={post.id}/>
                  <a
                    href="#"
                    className="sfsa mrrt10"
                    data-index={index}
                    data-id={post.id}
                    data-toggle="modal"
                    data-type="applicants"
                    data-target="#ShowApplicantsModal"
                    onClick={that.handleApplicantsShowModal}>Show Applicants&nbsp;
                    <i className="fa fa-external-link"></i>
                  </a>
                  <a
                    className="sfsa mrrt10"
                    href="#"
                    className="sfsa"
                    data-index={index}
                    data-post={JSON.stringify(post)}
                    data-type="recommendations"
                    data-target="#ShowRecommendations"
                    onClick={that.showRecommendations}>Show Recommendations&nbsp;
                    <i className="fa fa-external-link"></i>
                  </a>
                  <div className="sftoolsbox">
                    <span
                      className="sftools edit"
                      data-index={index}
                      data-id={post.id}
                      data-name={post.title}
                      data-toggle="modal"
                      data-type="edit"
                      data-target="#AddJobModal"
                      onClick={that.handleShowModal}>
                      <i className="fa fa-pencil-square-o"></i>
                    </span>
                    <span
                      className="sftools delete"
                      data-index={index}
                      data-id={post.id}
                      onClick={that.onJobDelete}>
                      <i className="fa fa-trash-o"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="tab-pane">
        <div className="row mrtp10">
          <div className="col-xs-12 col-sm-12 pdlt15">
            {!this.state.searchFlag && <div className="sfdbox">
              <div className="sfdtitle mrbt10">My Jobs - {totalJobs}
                <i className="fa fa-vcard org"></i>
                <a
                  href="#"
                  onClick={this.handleShowModal}
                  data-type="add"
                  className="btnhlsmall pos orange mrrg10"
                  data-toggle="modal"
                  data-target="#AddJobModal">
                  <span className="left icon fa fa-send-o"></span>
                  <span className="right title">ADD A JOB</span>
                </a>
              </div>

              {JobList}
              <div className="clearfix"></div>

              <div className="sfsbtnbox mrtp10">
                <button type="button" className="bg-vd wd100 orange pull-left">
                  <i className="fa fa-search"></i>
                  &nbsp;Show More Jobs</button>
              </div>
            </div>}
            {this.state.searchFlag && <div>
              <div className="row mrtp10" id="hashHeader">
                <div className="col-xs-12 col-sm-12">
                  <div className="white-content pd15 clearfix">
                    <h3 className="sfsubtitle">Here are some profile that match your requirement</h3>
                  </div>
                </div>
              </div>
              <div className="mrg16 mrtp10">
                <div className="sfsearchresults">
                  <div className="sfsearchright">
                    {/* Search Results */}
                    {this.state.searchResultsData
                      ? <FilteredSearchResults
                          postedJobsData={this.state.jobposts}
                          searchResultsData={this.state.searchResultsData}
                          openUserProfile={this.props.openUserProfile}/>
                      : null}
                  </div>
                  <div className="sfsearchfilter">
                    <div className="white-content pd10 mrbt15 clearfix">
                      <div className="sfsrchselect clearfix height42">
                        <i className="fa fa-sliders filters mrtp2"></i>
                        <h4>Filter</h4>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <FilterSearch
                      filterPayload={this.state.filterPayload}
                      onHandleFilterSearch={this.onHandleFilterSearch}/>
                  </div>
                </div>
                <div className="sfsbtnbox" style={{position: 'relative', bottom: 0 + 'px'}}>
                    <button onClick={this.handleDefaultPage} type="button" className="bg-vd wd100 orange pull-left">DONE *</button>
                    <span className="pcinfo">*Now you can see your potential condidates.</span>
                </div>
              </div>
            </div>}
          </div>
          {this.state.showModal
            ? <AddJobModal
                jobId={this.state.jobId}
                modalTitle={this.state.modalTitle}
                handleHideModal={this.handleHideModal}
                editJob={this.state.editJob}
                handleNewJobPost={this.handleNewJobPost}
                handleRecommendations={this.handleRecommendations}/>
            : null}
          <div>
            {this.state.showApplicantsModal
              ? <ShowApplicantsModal
                  jobId={this.state.jobId}
                  modalTitle={this.state.modalTitle}
                  handleApplicantsHideModal={this.handleApplicantsHideModal}/>
              : null}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MyJobs;
