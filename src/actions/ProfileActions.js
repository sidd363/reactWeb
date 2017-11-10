var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');
var requestlib = require("../../controllers/request.js");
class ProfileActions {
    loadProfile(slug,cb){
        var self = this;
        NProgress.start();
        var hyphenlocation = slug.lastIndexOf("-");
        var id = slug.substring(hyphenlocation+1,slug.length);
        request.get(config.baseUrl+'/users/profile/'+id+"/web",function(err,response){
            self.actions.updateCurrentProfile(response.body);
            setTimeout(function(){
                NProgress.done();
            },500);
            if(cb){
                cb();
            }
        });
    }
    loadVideo(slug,cb){
        var self = this;
        NProgress.start();
        var hyphenlocation = slug.lastIndexOf("-");
        var id = slug.substring(hyphenlocation+1,slug.length);
        request.get(config.baseUrl+'/activities/'+id+"/web",function(err,response){
            self.actions.updateCurrentVideo(response.body);
            setTimeout(function(){
                NProgress.done();
            },500);
            if(cb){
                cb();
            }
        });
    }
    loadLikes(resourceId,cb){
      var self = this;
      NProgress.start();
      request.get(config.baseUrl+'/answers/'+resourceId+"/like",function(err,response){
          setTimeout(function(){
              NProgress.done();
          },500);
          if(cb){
              if(err)
                return cb(err)
              return cb(null,response.body)
          }
      });

    }
    loadAllUsers(cb){
      var self = this;
      NProgress.start();
      request.get(config.baseUrl + '/users/getVerifiedUsers', function(err, response) {
        setTimeout(function(){
            NProgress.done();
        },500);
        if(cb){
            if(err)
              return cb(err)
            return cb(null,response.body)
        }
      })
    }
    loadAdminDashBoard(cb){
        var self = this;
        NProgress.start();
        requestlib.get(config.baseUrl+'/companies/adminDashboard',function(err,response){
        //   console.log(err)
        //   console.log(response)
        //   console.log(response.body)
          var returnObj = [];
          if(!err && response.body)
            returnObj = response.body;
          self.actions.updateAdminDashboard(returnObj);
          setTimeout(function(){
              NProgress.done();
          },500);
          if(cb){
              cb();
          }
        })
    }
    
    loadJobPosts(cb){
        var self = this;
        NProgress.start();
        requestlib.get(config.baseUrl+'/jobs/posted',function(err,response){
          var returnObj = [];
          if(!err && response.body)
            returnObj = response.body;
          self.actions.updateJobPosts(returnObj);
          setTimeout(function(){
              NProgress.done();
          },500);
          if(cb){
              cb();
          }
        });
    }
    
    loadSavedSearches(cb) {
        var self = this;
        NProgress.start();
        requestlib.get(config.baseUrl + '/businessUsers/search', function(err,response){
          var returnObj = [];
          if(!err && response.body)
            returnObj = response.body;
          self.actions.updateSavedSearches(returnObj);
          setTimeout(function(){
              NProgress.done();
          },500);
          if(cb){
              cb();
          }
        });
    }
    
    loadMySelections(cb) {
        var self = this;
        NProgress.start();
        requestlib.get(config.baseUrl + '/applications/shortlisted', function(err,response){
          var returnObj = [];
          if(!err && response.body)
            returnObj = response.body;
          self.actions.updateMySelections(returnObj);
          setTimeout(function(){
              NProgress.done();
          },500);
          if(cb){
              cb();
          }
        });
    }

    loadFilteredSearches(cb){
        var self = this;
        NProgress.start();
        requestlib.get(config.baseUrl+'/jobs/posted',function(err,response){
          var returnObj = [];
          if(!err && response.body)
            returnObj = response.body;
          self.actions.updateJobPosts(returnObj);
          setTimeout(function(){
              NProgress.done();
          },500);
          if(cb){
              cb();
          }
        });
    }

    updateJobPosts(posts){
        this.dispatch(posts);
    }
    
    updateMySelections(mySelections){
        this.dispatch(mySelections);
    }

    updateSavedSearches(savedSearches) {
        this.dispatch(savedSearches);
    }

    updateCurrentProfile(profile){
        this.dispatch(profile);
    }

    updateCurrentVideo(video){
        this.dispatch(video);
    }

    updateAllUsers(allusers){
      this.dispatch(allusers);
    }

    updateAdminDashboard(businessUsers){
      this.dispatch(businessUsers)
    }
}


module.exports = alt.createActions(ProfileActions);
