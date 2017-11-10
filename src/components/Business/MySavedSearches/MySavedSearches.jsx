var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var MySavedSearchesList = require('./../common/MySavedSearchesList.jsx');

var MySavedSearches = React.createClass({
    render: function(){
        return (
            <div id="sfmss" className="tab-pane">
                <div className="row mrtp10">
                    <div className="col-xs-12 col-sm-12 pdlt15">
                        <div className="sfdbox">
                            <div className="sfdtitle">My Recent Searches <i className="fa fa-life-saver blu"></i></div>
                            <div className="white-content sfdinfo clearfix mrtp10 mrbt10 pdlt0 pdrg0">
                                <MySavedSearchesList />
                            </div>

                            <div className="clearfix"></div>
                            <div className="sfsbtnbox">
                                <button type="button" className="bg-vd wd100 blue mrtp15 pull-left"><i className="fa fa-search"></i> Show All Saved Searches</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MySavedSearches;
