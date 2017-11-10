var React = require('react/addons');

var moment = require('moment');
var utils = require('./../../../utils/helper.js');
var requestlib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');

var MySavedSearchesList = React.createClass({


    render: function() {
        var that = this;
        var savedSearches = this.props.savedSearches || [];

        var searches = savedSearches.map(function(item, index) {
            return (
                <li key={index}>
                    <a className="ellipsis">{item.identifier ? item.identifier : ""}</a>
                    <div className="sfsinfo">
                        <small>{utils.getCurrentTimeDifference(moment(item.queryObj.createdAt), 'days')} days ago</small>
                        {/*<span className="sftools edit pull-right"><i className="fa fa-pencil-square-o"></i></span>
                        <span className="sftools delete pull-right"><i className="fa fa-trash-o"></i></span>*/}
                    </div>
                </li>
            );
        });
        return (
            <ul className="sfslist">
                {searches}
            </ul>
        );
    }
});

module.exports = MySavedSearchesList;