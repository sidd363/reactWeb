var React = require('react/addons');
var moment = require('moment');
var _ = require('lodash');

var BootstrapTagsInput = require('./../common/bootstrapTagsInput.jsx');
var config = require('./../../../../config.js');
var utils = require('./../../../utils/helper.js');
var requestLib = require('./../../../../controllers/request.js');

var FilterSearch = React.createClass({

    componentDidMount(){
        $('#skill, #location, #education').tagsinput();
    },

    getDefaultValue: function(type){
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

    onChange: function() {
        this.setState({filterPayload: this.props.filterPayload});
    },

    onHandleFilterSearch: function(e) {
        var that           = this;
        var searchLocation = ($('#SearchFilterForm input#location').tagsinput('items') || []);
        var degree         = ($('#SearchFilterForm input#education').tagsinput('items') || []);
        var skills         = ($('#SearchFilterForm input#skill').tagsinput('items') || []).toString();
        var company        = $('#SearchFilterForm input#CompanyName').val() || "";
        var designation    = $('#SearchFilterForm input#Designation').val() || "";
        var college        = $('#SearchFilterForm input#CollegeName').val() || "";
        var yearsOfExp     = $("#SearchFilterForm input:radio[name='YearsOfExperience']:checked").val() || "";

        var gte            = "",
            lte            = "";
        var now            = moment().year();
        if(searchLocation && searchLocation.itemsArray && searchLocation.itemsArray.length>0){
          searchLocation = searchLocation.itemsArray.toString();
        }else{
          searchLocation="";
        }
        if(degree && degree.itemsArray && degree.itemsArray.length>0){
          degree = degree.itemsArray.toString();
        }else {
          degree="";
        }

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
            that.props.onHandleFilterSearch(filterPayload["queryObj"], response.body);
            $('html, body').animate({
                scrollTop: $('#hashHeader').offset().top - 54
            }, 'slow');
        });
    },

    onHandleClear: function(e) {
        $('#SearchFilterForm').find('input').val('');
        $('#SearchFilterForm').find('input:checked').removeAttr("checked");
        this.props.onHandleFilterSearch({}, []);
    },

    render: function() {

        var filterPayload = this.props.filterPayload || {},
            tidLocations  = filterPayload.searchLocation ? filterPayload.searchLocation.toString() : "",
            tidEducation  = filterPayload.degree ? filterPayload.degree.toString() : "";
            // tidSkills     = filterPayload.skills ? filterPayload.skills.join(',') : "";
        console.log("fp--->", filterPayload);
        console.log(this.props.filterPayload.searchLocation || "");

        return (
            <div id="SearchFilterForm" key={moment.now()}>
                <div className="card pdall10">
                    <div className="input-container">
                        <input type="text" id="CompanyName" defaultValue={this.props.filterPayload.company || ""} />
                        <label htmlFor="CompanyName">Company</label>
                        <div className="bar"></div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="input-container">
                        <input type="text" id="Designation" defaultValue={this.props.filterPayload.designation || ""} />
                        <label htmlFor="Designation">Designation</label>
                        <div className="bar"></div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="input-container">
                        <input type="text" id="CollegeName" defaultValue={this.props.filterPayload.college || ""} />
                        <label htmlFor="CollegeName">College</label>
                        <div className="bar"></div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="input-container">
                        <BootstrapTagsInput defaultValue={tidLocations} type="location" />
                        <label htmlFor="LocationName">Location</label>
                        <div className="bar"></div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="input-container">
                        <BootstrapTagsInput defaultValue={tidEducation} type="education" />
                        <label htmlFor="EducationName">Education</label>
                        <div className="bar"></div>
                    </div>
                    <div className="clearfix"></div>

                    {/*<div className="input-container">
                        <BootstrapTagsInput value={filterPayload.company} defaultValue={tidSkills} type="skill" />
                        <label htmlFor="Skills">Skills</label>
                        <div className="bar"></div>
                    </div>
                    <div className="clearfix"></div>*/}

                    <div className="input-container open">
                        <label>Years Of Experience</label>
                        <div className="radiogroup">
                            <input type="radio" name="YearsOfExperience" defaultChecked={this.props.filterPayload.yearsOfExp && this.props.filterPayload.yearsOfExp === "0-2" ? true : false} defaultValue="0-2" />0-2
                            <input type="radio" name="YearsOfExperience" defaultChecked={this.props.filterPayload.yearsOfExp && this.props.filterPayload.yearsOfExp === "2-5" ? true : false} defaultValue="2-5" />2-5
                            <input type="radio" name="YearsOfExperience" defaultChecked={this.props.filterPayload.yearsOfExp && this.props.filterPayload.yearsOfExp === "5-10" ? true : false} defaultValue="5-10" />5-10
                            <input type="radio" name="YearsOfExperience" defaultChecked={this.props.filterPayload.yearsOfExp && this.props.filterPayload.yearsOfExp === ">10" ? true : false} defaultValue=">10" />&gt; 10
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="clearfix"></div>
                <div className="dfffrnjcse">
                    <div className="">
                        <a onClick={this.onHandleFilterSearch} className="bg-vd firogi">Apply</a>
                    </div>
                    <div className="">
                        <a onClick={this.onHandleClear} className="bg-vd orange">Clear</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FilterSearch;
