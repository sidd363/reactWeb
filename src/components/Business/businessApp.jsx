var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var BusinessHeader = require('./BusinessHeader.jsx');
var Footer = require('../Footer.jsx');

var BusinessApp = React.createClass({
    render: function() {
        return (
            <div className="body-container">
              <BusinessHeader/>
              <RouteHandler />
            </div>
        )
    }
});

module.exports = BusinessApp;
