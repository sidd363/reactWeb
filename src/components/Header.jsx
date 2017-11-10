var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

//var utils = require('./../utils/helper.js');

var Header = React.createClass({

	contextTypes: {
		router: React.PropTypes.func
	},

	render: function() {
		console.log('[Header] | render');
		return (
			<div className="navbar navbar-inverse bs-docs-nav navbar-fixed-top sticky-navigation">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#shrofile-navigation">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="http://www.shrofile.com"><img src="/web/images/shrofile-logo-red.png" alt="" /></a>
					</div>
					<div className="navbar-collapse collapse" id="shrofile-navigation">
						<ul className="nav navbar-nav navbar-right main-navigation">
							<li><a href="/">Home</a></li>
							<li><a href="http://www.shrofile.com/#features">How it Works?</a></li>
							<li><a href="http://www.shrofile.com/#whyshrofile">Why Shrofile?</a></li>
							<li><a href="http://www.shrofile.com/aboutus.html"  target="_self">About Us</a></li>
							<li><a href="http://www.shrofile.com/feature.html" target="_self">Features</a></li>
							<li><a href="http://www.shrofile.com/download.html"  target="_self">Download</a></li>
							<li><a href="http://www.shrofile.com/videos"  target="_self">Videos</a></li>
							<li><a href="http://www.shrofile.com/blog"  target="_self">Blog</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Header;
