/**
 * Created by Sandeep on 28/04/15.
 */
var alt = require('../alt');
var ProfileActions = require('../actions/ProfileActions');

class ProfileStore {
    constructor() {
        var self = this;
        this.bindListeners({
            updateCurrentProfile: ProfileActions.UPDATE_CURRENT_PROFILE,
            updateCurrentVideo: ProfileActions.UPDATE_CURRENT_VIDEO,
            updateAllUsers: ProfileActions.UPDATE_ALL_USERS,
            updateAdminDashboard: ProfileActions.UPDATE_ADMIN_DASHBOARD,
            updateJobPosts: ProfileActions.UPDATE_JOB_POSTS,
            updateSavedSearches: ProfileActions.UPDATE_SAVED_SEARCHES,
            updateMySelections: ProfileActions.UPDATE_MY_SELECTIONS
        });
        this.on('init', function () {
            self.profile = null;
            self.video = null;
            self.allusers = null;
            self.businessUsers = null;
            self.jobposts = null;
            self.savedSearches = null;
            self.mySelections = null;
        });
    }

    updateJobPosts(jobposts) {
        this.jobposts = jobposts;
    }
    
    updateMySelections(mySelections) {
        this.mySelections = mySelections;
    }
    
    updateSavedSearches(savedSearches) {
        this.savedSearches = savedSearches;
    }

    updateCurrentProfile(profile) {
        this.profile = profile;
    }
    updateCurrentVideo(video) {
        this.video = video;
    }
    updateAllUsers(allusers) {
        this.allusers = allusers;
    }
    updateAdminDashboard(businessUsers) {
        this.businessUsers = businessUsers
    }
}

module.exports = alt.createStore(ProfileStore, 'ProfileStore');
