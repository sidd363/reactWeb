var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var Footer = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    return (
      <footer id="support" >

<div className="container">

	<div className="contact-box wow fadeInUp animated" data-wow-offset="10" data-wow-duration="1.5s">

		<a className="btn contact-button expand-form expanded"><i className="fa fa-envelope-o"></i></a>

		<div className="row expanded-contact-form">

			<div className="col-md-8 col-md-offset-2">

				<p>
				info@shrofile.com
			 	</p>

				<ul className="social-icons">
					<li><a href="#"><i className="fa fa-facebook"></i></a></li>
					<li><a href="#"><i className="fa fa-linkedin"></i></a></li>
				</ul>

				<div className="tctext">
					<a href="privacy-policy.html" target="_blank">Privacy Policy</a>
					<a href="terms-conditions.html" target="_blank">Terms &amp; Conditions</a>
					<a href="licenses.html" target="_blank">Licenses</a>
				</div>
			</div>

		</div>

	</div>

	<p className="copyright">
		©2017 Shrofile, All Rights Reserved.
	</p>

</div>
</footer>
    )
  }
});

module.exports = Footer;
