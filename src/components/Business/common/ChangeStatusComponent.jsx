var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var config = require('./../../../../config.js');
var requestLib = require('./.././../../../controllers/request.js');

var ChangeStatusComponent = React.createClass({

    sendMail(data, cb) {
        console.log("datat=====",data)
        var headers = {
            "Content-Type": "application/json"
        };
        requestLib.post(config.baseUrl + '/applications/email', data, headers, function (err, response) {
            cb(err,response);
        })
    },

    onHandleStatus: function (e) {
        $('#ShowApplicantsModal').modal('hide');
        var that = this;
        var type = $(e.currentTarget).data("type");
        var applicantName = $(e.currentTarget).data("applicantname");
        var id = $(e.currentTarget).data("id");
        var userId = $(e.currentTarget).data("userid");
        console.log(userId);
        var headers = {
            "Content-Type": "application/json"
        };
        var statusUrl = config.baseUrl + "/applications/" + id + "/status";
        var postBody = {
            "status": type
        };
        requestLib.post(statusUrl, postBody, headers, function (err, response) {
            if (err) {
                swal("Error Occurred", response.body.message, "error");
            } else {
                swal({
                    title: type.toUpperCase(),
                        html: '<div>' + response.body.message + '</div><strong>Would you like to send email ?</strong>',
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        reverseButtons: true,
                        buttonsStyling: true
                    })
                    .then(function () {
                        swal({
                            title: 'Just one more step to go',
                            html: '<div class="swal-contact-form"><div class="form-group"><input class="form-contro' +
                                    'l" id="subject" name="subject" placeholder="Subject" type="text" required /></di' +
                                    'v><textarea class="form-control" id="message" name="message" placeholder="Messag' +
                                    'e" rows="5" required></textarea></div>',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Submit',
                            cancelButtonText: 'Cancel',
                            reverseButtons: true,
                            buttonsStyling: true,
                            showLoaderOnConfirm: true,
                            preConfirm: function () {
                                return new Promise(function (resolve, reject) {
                                    console.log("Props test-> ", that.props);
                                    var payLoad = {
                                        userId: userId,
                                        subject: $('#subject').val(),
                                        message: $('#message').val()
                                    }
                                    that.sendMail(payLoad, function (err, response) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve('Email sent successfully');
                                        }
                                    });
                                });
                            },
                            onOpen: function () {
                                $('#subject').focus();
                            }
                        })
                            .then(function (result) {
                                // swal(JSON.stringify(result))
                                if (response)
                                    swal('Email Sent', 'Email has been sent successfully to ' + applicantName, 'success');
                                }
                            )
                            .catch(swal.noop)
                    }, function (dismiss) {
                        if (dismiss === 'cancel') {
                            swal('Never Mind', 'Happy Shrofiling', 'error');
                        }
                    })
            }
        });
    },
    componentDidMount:function(){
      console.log("componentDidMount");
      $("[data-toggle=tooltip]").tooltip({ placement: 'bottom'});
    },
    render: function () {
        console.log("render")
        var status = this.props.status;
        var green="",red="",yellow="",className1="fa fa-exclamation-circle cp status ",className2="fa fa-check-circle-o cp status ",className3="fa fa-times-circle cp status ";
        switch (status) {
          case "waitlisted":
            yellow="text-warning"
            className1=className1+yellow;
            break;
          case "shortlisted":
            green="text-success"
            className2=className2+green;
            break;
          case "rejected":
            red="text-danger"
            className3=className3+red;
            break;
          default:

        }
        return (
            <div className="pull-right">
                <i
                    data-id={this.props.id}
                    data-applicantname={this.props.applicantName}
                    data-userid={this.props.userId}
                    data-type="waitlisted"
                    onClick={this.onHandleStatus}
                    className={className1} title="Waitlist" data-toggle="tooltip"></i>
                <i
                    data-id={this.props.id}
                    data-applicantname={this.props.applicantName}
                    data-userid={this.props.userId}
                    data-type="shortlisted"
                    onClick={this.onHandleStatus}
                    className={className2} title="Shortlist" data-toggle="tooltip"></i>
                <i
                    data-id={this.props.id}
                    data-applicantname={this.props.applicantName}
                    data-userid={this.props.userId}
                    data-type="rejected"
                    onClick={this.onHandleStatus}
                    className={className3} title="Reject" data-toggle="tooltip"></i>
            </div>

        );
    }
});

module.exports = ChangeStatusComponent;
