var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var requestLib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');

var MyJobList = require('./MyJobList.jsx');

var MyJobsListCard = React.createClass({

    render: function() {
        return (
            <div className="white-content sfdbox">
                <div className="sfdtitle">My Jobs <i className="fa fa-vcard org"></i></div>
                <div className="sfdinfo clearfix">
                    <MyJobList postedJobs = {this.props.postedJobs} />
                </div>
                <div class="clearfix"></div>
                <div className="sfsbtnbox">
                    <button type="button" className="bg-vd wd100 orange pull-left" onClick={this.props.displayAllJobs}><i className="fa fa-search"></i> Show More Jobs</button>
                </div>
            </div>
        );
    }
});

module.exports = MyJobsListCard;
