var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var config = require('../config.js')
var requestLib = require("../controllers/request.js")
var textract = require('textract');
var promise = require("bluebird");
var json2csv = require('json2csv');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
module.exports = function(req, res) {
  console.log("req====", req)
  try {
    var path = req.files[0].path;
    var outputarr = [];
    var promArr = [];
    for(var index in req.files){
      (function(index){
        var file = req.files[index];
        var promObj = new promise(function(resolve,reject){
          textract.fromFileWithMimeAndPath(file.mimetype, file.path, function( error, text ) {
            text = text!=null?text:"";
            for(var index in config.resumeBlackListWords){
              var word = config.resumeBlackListWords[index];
              console.log(word)
              var regEx = new RegExp(word, "ig");
              text = text.replace(regEx,"")
            }
            text = text.trim();
            var findName = new RegExp(/([A-Z]*[a-z]*)(\s[A-Z]*[a-z]*)/).exec(text);
            console.log(findName);
            var findemail = new RegExp(/([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/).exec(text);
            //console.log(findemail[0]);
            var findphone = new RegExp(/\(?([0-9]{5})\)?([ .-]?)([0-9]{5})/).exec(text);
            //console.log(findphone[0]);
            fs.unlinkSync(file.path);
            var name = findName!=null?findName[1].trim()+" "+findName[2].trim():"";
            var phone = findphone!=null?findphone[0].replace(/\s/g,""):"";
            var email = findemail!=null?findemail[0]:"";
            resolve({"name":name,"mobile":phone,"email":email,"docname":file.originalname})
          })
        })
        promArr.push(promObj)
      })(index);
    }
    promise.all(promArr).then(function(resolveArr){
      var fields = ['name', 'mobile', 'email','docname'];
      var csv = json2csv({ data: resolveArr, fields: fields });
      var filename = new Date().valueOf()+".csv";
      fs.writeFile("uploads/"+filename, csv, function(err) {
        if (err) throw err;
        console.log('file saved');
        var filepath = process.cwd()+"/uploads/"+filename;
        console.log(filepath)
        var mimetype = mime.lookup(filepath);
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader("Content-Type","application/octet-stream");
        var filestream = fs.createReadStream(filepath);
        console.log(filestream)
        filestream.pipe(res);
      });
    })
  } catch (e) {
    res.json({error_code: 1, err_desc: "Corrupted excel file"});
  }
}
