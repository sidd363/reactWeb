var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var utils = require('./../../../utils/helper.js');
var requestlib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');
var BootstrapTagsInput = require('./../common/bootstrapTagsInput.jsx');

var AddJobModal = React.createClass({

    propTypes:{
        handleHideModal: React.PropTypes.func.isRequired
    },

    componentDidMount(){
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
        $('#skill, #location, #education').tagsinput();
    },

    onJobSubmit: function(e) {
        var that = this;
        var educationNames  = $('input#education').tagsinput('items');
        var locationNames   = $('input#location').tagsinput('items');
        var designationName = $('input#DesignationName').val();
        var jD              = $('#JD').val();
        var cD              = $('#CD').val();
        var skills          = $('input#skill').tagsinput('items');
        var titleName       = $('input#TitleName').val();
        var college         = $('input#CollegeName').val();
        var yearsOfExp      = $("input:radio[name ='YearsOfExperience']:checked").val();
        var ctc             = $('#CTC').val();
        var companyId       = localStorage.getItem("companyId");

        var payLoad = {
            "title": titleName,
            "locations": locationNames,
            "education": educationNames,
            "college": college,
            "yearsofexperience" : yearsOfExp,
            "ctc": ctc,
            "jobDesc": jD,
            "companyDesc": cD,
            "skills": skills,
            "designation": designationName,
            "companyId":companyId
        };
        for(var key in payLoad){
          var value = payLoad[key];
          if(!value || value.length==0){
            swal('Error', key +" cannot be blank", 'error');
            return true;
            break;

          }
        }
        var flag = $("#AddJobModal #AddEditJob").data("flag");
        if (!flag) {
            var addJobUrl = config.baseUrl + "/jobs";
            var headers = {"Content-Type":"application/json"};
            requestlib.post(addJobUrl, payLoad, headers, function(err, response) {
                console.log('post add job', response);
                if (!err) alert('Job Added Successfully');
                else alert('Error: ' + err);
                that.props.handleRecommendations(payLoad);
                $('#AddJobModal').modal('hide');
                //handleNewJobPost();
            });
        } else {
            var editJobUrl = config.baseUrl + "/jobs/" + this.props.jobId;
            var headers = {"Content-Type":"application/json"};
            requestlib.put(editJobUrl, payLoad, headers, function(err, response) {
                console.log('put edit job', response);
                if (!err) alert('Job Edited Successfully');
                else alert('Error: ' + err);
                that.props.handleRecommendations(payLoad);
                $('#AddJobModal').modal('hide');
                //handleNewJobPost();
            });
        }

    },

    getDefaultValue:function(type){
        var defaultValues = "";
        if(type === "skill") {
            defaultValues = "Project Management,Business Development";
        } else if(type === "education") {
            defaultValues = "B.Tech,B.Com";
        } else if(type === "location") {
            defaultValues = "new delhi,gurgaon";
        }
        return defaultValues;
    },

    render: function() {

        var flag = this.props.editJob ? true : false;

        var editJobData  = this.props.editJob || {},
            tidLocations = editJobData.locations ? editJobData.locations.join(',') : this.getDefaultValue("location"),
            tidEducation = editJobData.education ? editJobData.education.join(',') : this.getDefaultValue("education"),
            tidSkills    = editJobData.skills ? editJobData.skills.join(',') : this.getDefaultValue("skills");
        console.log(editJobData);
        return (
            <div className="modal addajob fade" id="AddJobModal" tabIndex="-1" role="dialog" aria-labelledby="AddJobModallLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="AddJobModalLabel">{this.props.modalTitle}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <div className="card">
                                    <div className="input-container">
                                        <input type="text" id="TitleName" defaultValue={editJobData.title || ""} required="required" />
                                        <label htmlFor="TitleName">Title</label>
                                        <div className="bar"></div>
                                    </div>
                                    <div className="input-container">
                                        <input type="text" id="CollegeName" defaultValue={editJobData.college || ""} required="required" />
                                        <label htmlFor="CollegeName">College</label>
                                        <div className="bar"></div>
                                    </div>

                                    <div className="input-container">
                                        <input type="text" id="CTC" defaultValue={editJobData.ctc || ""} required="required" />
                                        <label htmlFor="CTC">CTC(in lakhs per annum)</label>
                                        <div className="bar"></div>
                                    </div>
                                    <div className="input-container">
                                        <BootstrapTagsInput defaultValue={tidLocations} type="location" />
                                        <label htmlFor="LocationName">Location</label>
                                        <div className="bar"></div>
                                    </div>


                                    <div className="input-container">
                                        <BootstrapTagsInput defaultValue={tidSkills} type="skill" />
                                        <label htmlFor="Skills">Skills</label>
                                        <div className="bar"></div>
                                    </div>

                                    <div className="input-container open">
                                        <textarea className="cardtextarea" defaultValue={editJobData.jobDesc || ""} id="JD" placeholder="Job Description"></textarea>
                                        <div className="bar"></div>
                                    </div>

                                </div>
                            </div>


                            <div className="col-xs-12 col-sm-6">
                                <div className="card">

                                    <div className="input-container">
                                        <input type="text" id="DesignationName" defaultValue={editJobData.designation || ""} required="required" />
                                        <label htmlFor="DesignationName">Designation</label>
                                        <div className="bar"></div>
                                    </div>

                                    <div className="input-container open">
                                        <label>Years Of Experience</label>
                                        <div className="radiogroup">
                                        <input type="radio" name="YearsOfExperience" defaultChecked={editJobData.yearsofexperience && editJobData.yearsofexperience === "0-2" ? true : false} defaultValue="0-2" />0-2
                                        <input type="radio" name="YearsOfExperience" defaultChecked={editJobData.yearsofexperience && editJobData.yearsofexperience === "2-5" ? true : false} defaultValue="2-5" />2-5
                                        <input type="radio" name="YearsOfExperience" defaultChecked={editJobData.yearsofexperience && editJobData.yearsofexperience === "5-10" ? true : false} defaultValue="5-10" />5-10
                                        <input type="radio" name="YearsOfExperience" defaultChecked={editJobData.yearsofexperience && editJobData.yearsofexperience === ">10" ? true : false} defaultValue=">10" />&gt; 10
                                        </div>
                                    </div>

                                    <div className="input-container">
                                        <BootstrapTagsInput defaultValue={tidEducation} type="education" />
                                        <label htmlFor="EducationName">Education</label>
                                        <div className="bar"></div>
                                    </div>
                                    <div className="input-container open">
                                        <textarea className="cardtextarea cdes" id="CD" defaultValue={editJobData.companyDesc} placeholder="Company Description"></textarea>
                                        <div className="bar"></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 text-center">
                                <button id="AddEditJob" data-flag={flag} onClick={this.onJobSubmit} type="button" className="bg-vd orange"><i className="fa fa-send"></i>
                                {flag? ' SAVE': ' POST'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
});

module.exports = AddJobModal;
