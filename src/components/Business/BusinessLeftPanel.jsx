var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var BusinessLeftPanel = React.createClass({
    getInitialState: function() {
        console.log("[BusinessDashboardView] | [BusinessLeftPanel] | getInitialState");
        return {};
    },

    render: function() {
        var currentState=this.props.currentState;
        return (
            <div className="nav-menu-left">
                <ul>
                    <li className={currentState==0 ? "active":""}><a data-toggle="pill" href="#" data-index="0" onClick={this.props.clickEvent}><span><i className="fa fa-user"></i></span><div> Admin</div></a></li>
                    <li className={currentState==1 ? "active":""}><a data-toggle="pill" href="#" data-index="1" onClick={this.props.clickEvent}><span><i className="fa fa-home"></i></span><div> Home</div></a></li>
                    <li className={currentState==2 ? "active":""}><a data-toggle="pill" href="#" data-index="2" onClick={this.props.clickEvent}><span><i className="fa fa-search"></i></span><div> Search People</div></a></li>
                    <li className={currentState==3 ? "active":""}><a data-toggle="pill" href="#" data-index="3" onClick={this.props.clickEvent}><span><i className="fa fa-vcard"></i></span><div> My Jobs</div></a></li>
                    <li className={currentState==4 ? "active":""}><a data-toggle="pill" href="#" data-index="4" onClick={this.props.clickEvent}><span><i className="fa fa-group"></i></span><div> My Selection</div></a></li>
                </ul>
            </div>
        );
    }
});

module.exports = BusinessLeftPanel;
