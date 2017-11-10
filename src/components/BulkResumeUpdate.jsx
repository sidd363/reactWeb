var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var requestlib = require("../../controllers/request.js");
var Fs = require( 'fs' );
var request = require('superagent')
var config= require("../../config.js");
var BulkResumeUpdate = React.createClass({
  handleBulkUpload:function(e){
      console.log("clicked");
      var files = $('#bulkfileupload')[0].files;
      console.log(files)
      var formData = new FormData();
      for(var index in files){
        var file = files[index];
        formData.append('file', file);
      }


      var url = "http://www.shrofile.com/admin/resumeupload/bulk";
      var headers = {};

      requestlib.post(url, formData, headers, function(err, response) {
          if (err) {
              swal('Error', err, 'error');
          }
          var filename = response.headers["content-disposition"].split("filename=")[1];
          var blob=new Blob([response.text]);
          var link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download=filename;
            link.click()
      });
      return false;
  },
  render:function(){
    return (
      <div className="updateProfile container bootstrap snippet">

         <div>
           <label for="file">Choose file to upload</label>
           <input type="file" id="bulkfileupload" name="file" multiple />
         </div>
         <div>
           <button onClick={this.handleBulkUpload}>Submit</button>
         </div>

      </div>

    )

  }
});
module.exports=BulkResumeUpdate;
