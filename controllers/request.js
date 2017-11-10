var request = require('superagent'),
  config = require('../config');

module.exports=(function(){
  return{
    post:function(url,data,headers,cb){
      if(!headers){
        headers = {}
      }
      if (typeof(Storage) !== "undefined") {
        headers["Authorization"]=localStorage.getItem("shtoken");
      }
      request.post(url)
      .send(data)
      .set(headers)
      .end(function(err,res){
        cb(err,res);
      })
    },
    get:function(url,cb){
      var header = {
        "Authorization":localStorage.getItem("shtoken")
      }
      request.get(url)
      .set(header)
      .end(function(err,resp){
        cb(err,resp);
      })
    },
    put:function(url,data,headers,cb){
      if(!headers){
        headers = {}
      }
      headers["Authorization"]=localStorage.getItem("shtoken");
      request.put(url)
      .send(data)
      .set(headers)
      .end(function(err,res){
        cb(err,res);
      })
    },
    delete:function(url,headers,cb){
      if(!headers){
        headers = {}
      }
      headers["Authorization"]=localStorage.getItem("shtoken");
      request.delete(url)
      .set(headers)
      .end(function(err,res){
        cb(err,res);
      })
    }
  }
})()
