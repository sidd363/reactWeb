var React = require('react/addons');

var MySelectionsList = require('./MySelectionsList.jsx');

var MySelectionsListCard = React.createClass({
    render: function() {
        return (
            <div className="white-content sfdbox">
                <div className="sfdtitle">My Selections <i className="fa fa-group gre"></i></div>
                <div className="sfdinfo clearfix pdrg10">
                  <MySelectionsList openUserProfile={this.props.openUserProfile} mySelections = {this.props.mySelections} />
                </div>
                <div className="clearfix"></div>
                <div className="sfsbtnbox">
                  <button type="button" className="bg-vd wd100 green mrtp15 pull-left" onClick={this.props.showAllSelections}><i className="fa fa-search"></i> Show All Selection</button>
                </div>
            </div>
        );
    }
});

module.exports = MySelectionsListCard;
