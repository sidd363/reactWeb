var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var config = require('./../../../../config.js');
var requestLib = require('./.././../../../controllers/request.js');

var AdvanceSearchToggle = require('./AdvanceSearchToggle.jsx');

var BusinessSearch = React.createClass({

    componentDidMount: function () {
        $("#sfadevents")
            .click(function () {
                if ($('#sfadbox').is(':visible')) {
                    $('#sfadevents').removeClass('active');
                    $('#sfadbox').slideUp('fast');
                } else {
                    $('#sfadevents').addClass('active');
                    $('#sfadbox').slideDown('fast');
                }
            });
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var query = $('#businessSearch').val();
        var that = this;
        var businessPayload = {
            "queryObj": {
                "searchName": query
            }
        };
        var headers = {
            "Content-Type": "application/json"
        };
        var businessSearchUrl = config.baseUrl + '/businessUsers/search';
        requestLib.post(businessSearchUrl, businessPayload, headers, function (err, response) {
            if (!err) {
                if (that.props.onHandleBusinessSearch) {
                    that
                        .props
                        .onHandleBusinessSearch(response.body);
                } else if (that.props.updateParentSection) {
                    that
                        .props
                        .updateParentSection(2, response.body, query)
                }
            } else {
                swal('Error', err, 'error');
            }
        });
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <form className="headersearch input-group">
                        <input
                            type="text"
                            name="businessSearch"
                            id="businessSearch"
                            defaultValue={this.props.searchTerm || undefined}
                            placeholder="What are you searching for..."/>
                        <span className="input-group-btn">
                            <button onClick={this.handleSubmit} type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                        <div className="sfad" id="sfadevents">
                            <i className="fa fa-sliders"></i>
                            <span>Advanced Search</span>
                        </div>
                        <AdvanceSearchToggle onHandleFilterSearch = {this.props.onHandleFilterSearch} />
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = BusinessSearch;
