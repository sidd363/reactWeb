var React          = require('react/addons');

var requestlib     = require('./../../../../controllers/request.js');
var config         = require('./../../../../config.js');
var UploadTemplate = require('./../common/UploadTemplate.jsx');

var UploadCandidates = React.createClass({
    handleCandidateUpload:function(e){
        console.log("clicked");
        var file = $(e.currentTarget)[0].files[0];
        var formData = new FormData();
        formData.append('file', file);

        var url = "http://www.shrofile.com/business/candidate/upload/" + this.props.jobId;
        var headers = {};
        requestlib.post(url, formData, headers, function(err, response) {
            if (err) {
                swal('Error', err, 'error');
            } else {
                swal('Success', 'File Posted Successfully.', 'success');
            }
        });
        return false;
    },

    render: function() {
        return (
            <div className="uploadBtns">
                <UploadTemplate />
                <input id="file-upload" type="file" className="btnhl right title" value={null} onChange={this.handleCandidateUpload}/>
            </div>
        );
    }

});

module.exports = UploadCandidates;
