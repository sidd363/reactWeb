var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var MySavedSearchesList = require('./MySavedSearchesList.jsx');

var MySavedSearchesListCard = React.createClass({

    render: function() {
        return (
            <div className="white-content sfdbox">
                <div className="sfdtitle">My Saved Searches <i className="fa fa-life-saver blu"></i></div>
                <div className="sfdinfo clearfix">
                  <ul className="sfslist">
                    <MySavedSearchesList savedSearches={this.props.savedSearches} openUserProfile={this.openUserProfileModal} />
                  </ul>
                </div>
            </div>
        );
    }
});

module.exports = MySavedSearchesListCard;
