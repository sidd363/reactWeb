var React = require('react/addons');
var config = require('./../../../../config.js');

var UploadTemplate = React.createClass({
    render: function() {
        return (
            <div>
                <a href={config.templateUrl} className="template-btn" download="template.xls">Download Template</a>
            </div>
        );
    }
});

module.exports = UploadTemplate;