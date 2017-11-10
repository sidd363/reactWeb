/**
 * Created by Sandeep on 28/06/15.
 */

var express = require('express'),
    router = express.Router(),
    PostController = require('../controllers/post.controller');
router.route('/profile/:slug').get(PostController.loadProfile);
router.route('/videos/:slug').get(PostController.loadVideo);
router.route('/videos').get(PostController.loadAllVideos);
router.route('/profile').get(PostController.loadAllVideos);
router.route('/admin').get(PostController.loadAllVideos);
router.route('/admin/profile/update').get(PostController.loadAllUsers);
router.route('/videos/sitemap.xml').get(PostController.loadAllVideos);
router.route('/profile/sitemap.xml').get(PostController.loadAllVideos);

module.exports = router;
