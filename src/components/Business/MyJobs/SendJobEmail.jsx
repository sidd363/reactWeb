var React = require('react/addons');
var config = require('./../../../../config.js');
var requestLib = require('./../../../../controllers/request.js');

var SendJobEmail = React.createClass({

    sendJobEmail: function() {
        console.log("send email");
        var jobId = this.props.jobId;
        var headers = {"Content-Type": "application/json"}
        var sendEmailUrl = config.baseUrl + "/jobs/" + jobId + "/email";
        requestLib.post(sendEmailUrl, {}, headers, function(err, response) {
            if (err) {
                swal('Error', err, 'error');
            } else {
                swal('Success', 'Email sent successfully', 'success');
            }
        });
    },

    render: function() {
        return (
            <div onClick={this.sendJobEmail} style={{width: 100 + 'px', padding: 2 + 'px', display: 'block'}} className="btn btn-default">Send Email</div>
        );
    }
});

module.exports = SendJobEmail;