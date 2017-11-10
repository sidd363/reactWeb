var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var config = require('../config.js')
var requestLib = require("../controllers/request.js")
module.exports = function(req, res) {
  console.log("req====", req)
  var exceltojson;
  if (!req.file) {
    res.json({error_code: 1, err_desc: "No file passed"});
    return;
  }

  if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
    exceltojson = xlsxtojson;
  } else {
    exceltojson = xlstojson;
  }
  try {
    exceltojson({
      input: req.file.path, output: null, //since we don't need output.json
      lowerCaseHeaders: true
    }, function(err, result) {
      if (err) {
        return res.json({error_code: 1, err_desc: err, data: null});
      }
      var authToken = req.headers["authorization"];
      var jobId = req.params.id;
      var headers={"Authorization":authToken};
      var userList=[];
      for(var index in result){
        var inUser = result[index];
        var user = {"firstName":inUser.firstname,"lastName":inUser.lastname,"email":inUser.email};
        userList.push(user)
      }
      var postBody={
        jobId:req.params.id,
        userList:userList
      }
      console.log("result====",result)

      var url = config.baseUrl+"/businessUsers/invite/candidates";
      requestLib.post(url,postBody,headers,function(err,result){
        console.log(err,result)
      })
    });
  } catch (e) {
    res.json({error_code: 1, err_desc: "Corrupted excel file"});
  }
}
