var React = require('react/addons');

var CompanyRegisterView = require('./../../CompanyRegisterView.jsx');



var MyCompany = React.createClass({

    componentDidMount: function() {
        // $('.MyCompany .logmod .container-fluid')  
    },

    render: function() {
        return (
            <div className="MyCompany"><CompanyRegisterView /></div>
        );
    }
});

module.exports = MyCompany;