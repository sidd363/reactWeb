var React = require('react/addons');

var utils = require('./../../utils/helper.js');
var config = require('./../../../config.js');

var Pagination = React.createClass({

    propTypes: {
        pageLength: React.PropTypes.number.isRequired
    },

    render: function () {
        var limit = config.queryParams.limit;
        var pageNumber = parseInt(utils.getParameterByName('page')) || 1;
        var pageNumberArr = [
            pageNumber - 1,
            pageNumber,
            pageNumber + 1,
            pageNumber + 2,
            pageNumber + 3
        ]
        return (
            <div className="dfffrnjcsb">
                {this.props.pageLength > 0 && <div className="col-xs-12 col-sm-12 dfjcc">
                    <ul className="pagination videoPaginate">
                        {pageNumberArr[0] > 0 && <li className="page-item">
                            <a
                                className="page-link"
                                href={"?page=" + pageNumberArr[0]}
                                aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>}
                        <li className="page-item">
                            <a className="page-link" href={"?page=" + pageNumberArr[1]}>{pageNumberArr[1]}</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href={"?page=" + pageNumberArr[2]}>{pageNumberArr[2]}</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href={"?page=" + pageNumberArr[3]}>{pageNumberArr[3]}</a>
                        </li>
                        {this.props.pageLength >= limit && <li className="page-item">
                            <a className="page-link" href={"?page=" + pageNumberArr[4]} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>}
                    </ul>
                </div>}
            </div>
        );
    }
});

module.exports = Pagination;