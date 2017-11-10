var React = require('react/addons');
var moment = require('moment');
var BootstrapTagsInput = require('./bootstrapTagsInput.jsx');
var requestLib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');
var utils = require('./../../../utils/helper.js');

var AdvanceSearchToggle = React.createClass({

    onHandleFilterSearch: function(e) {
        var that = this;
        var searchLocation = ($('#sfadbox input#location').tagsinput('items') || []).toString();
        var degree = ($('#sfadbox input#education').tagsinput('items') || []).toString();
        var skills = ($('#sfadbox input#skill').tagsinput('items') || []).toString();
        var company = $('#sfadbox input#CompanyName').val() || "";
        var designation = $('#sfadbox input#Designation').val() || "";
        var college = $('#sfadbox input#CollegeName').val() || "";
        var yearsOfExp = $ ("#sfadbox input:radio[name ='YearsOfExperience']:checked").val() || "";
        var gte = "",
            lte = "";
        var now = moment().year();

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
            $('#sfadbox').find('input').val('');
            $('#sfadbox').find('input:checked').removeAttr("checked");
            $('#sfadbox').css('display', 'none');
            $('html, body').animate({
                scrollTop: $('#hashHeader').offset().top - 54
            }, 'slow');
        });
    },
    
    render: function () {
        return (
            <div className="sfads" id="sfadbox" style={{display: "none"}}>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="card">
                            <div className="input-container">
                                <input type="text" id="CompanyName" />
                                <label htmlFor="CompanyName">Company</label>
                                <div className="bar"></div>
                            </div>
                            <div className="input-container">
                                <input type="text" id="Designation" />
                                <label htmlFor="Designation">Designation</label>
                                <div className="bar"></div>
                            </div>
                            <div className="input-container">
                                <input type="text" id="CollegeName" />
                                <label htmlFor="CollegeName">College</label>
                                <div className="bar"></div>
                            </div>

                            <div className="input-container">
                                <BootstrapTagsInput type="education" />
                                <label htmlFor="EducationName">Education</label>
                                <div className="bar"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="card">
                            <div className="input-container">
                                <BootstrapTagsInput type="location" />
                                <label htmlFor="LocationName">Location</label>
                                <div className="bar"></div>
                            </div>
                            <div className="inputradio">
                                <div className="inputradioLabel">Years Of Experience</div>
                                <div className="radiogroup">
                                    <input type="radio" name="YearsOfExperience" defaultValue="0-2" />0-2
                                    <input type="radio" name="YearsOfExperience" defaultValue="2-5" />2-5
                                    <input type="radio" name="YearsOfExperience" defaultValue="5-10" />5-10
                                    <input type="radio" name="YearsOfExperience" defaultValue=">10" />&gt; 10
                                </div>
                                <div className="bar"></div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
                <button type="button" onClick={this.onHandleFilterSearch} className="bg-vd red mfix pull-right">Search</button>
            </div>
        );
    }

});

module.exports = AdvanceSearchToggle;