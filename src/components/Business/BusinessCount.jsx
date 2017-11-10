var React = require('react/addons');

var requestLib = require('./../../../controllers/request.js');
var config = require('./../../../config.js');

var BusinessCount = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentWillMount: function() {
        var that = this;
        var countsUrl = config.baseUrl + "/businessUsers/dashboard/count";
        requestLib.get(countsUrl, function(err, response) {
            that.setState({counts: response.body});
        });
    },

    render: function() {
        return (
            <div className="sfudls clearfix">
                <div className="sfudt">Total You have</div>
                <div className="sfhcount">{this.state.counts ? this.state.counts.posted : 0} <small>Job Posted</small></div>
                <div className="sfhcount">{this.state.counts ? this.state.counts.shortlisted : 0} <small>Shortlisted</small></div>
                <div className="sfhcount">{this.state.counts ? this.state.counts.responses : 0} <small>Responses</small></div>
            </div>
        );
    }
})

module.exports = BusinessCount;
