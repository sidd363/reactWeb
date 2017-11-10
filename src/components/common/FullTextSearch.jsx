var React = require('react/addons');

var requestLib = require('./../../../controllers/request.js');
var config = require('./../../../config.js');

var FullTextsearch = React.createClass({

    onSubmit: function(e) {
        var that = this;
        var obj = {
            searchName: $('#ftSearch').val()
        };
        var query = encodeURIComponent(JSON.stringify(obj));
        requestLib.get(config.baseUrl + '/users/search?query=' + query, function(err, response) {
            console.log(response.body);
            that.props.handleFullTextSearch(response.body);
        });
    },

    render: function() {
        return (
            <div className="ftSearchBar dfffrnjcc">
                <div className="form-group">
                    <input id="ftSearch" type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" onClick={this.onSubmit} className="btn btn-default">Submit</button>
            </div>
        );
    }
});

module.exports = FullTextsearch;