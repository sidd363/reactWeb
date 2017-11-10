var React = require('react/addons');

var BootstrapTagsInput = React.createClass({
    render: function() {
        return (
            <input type="text" defaultValue={this.props.defaultValue} className="form-control text-uppercase" id={this.props.type} data-role="tagsinput" placeholder="" />
        );
    }
});

module.exports = BootstrapTagsInput;