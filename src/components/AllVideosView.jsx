var React           = require('react/addons');
var RouteHandler    = require('react-router').RouteHandler;
var Link            = require('react-router').Link;
var ProfileStore    = require('../stores/ProfileStore');
var moment          = require("moment");
var utils           = require('./../utils/helper.js');
var config          = require('./../../config.js');
var AllFeedTileView = require('./AllFeedTileView.jsx');
var Pagination      = require('./common/Pagination.jsx');

var ProfileView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function () {
    ProfileStore.listen(this.onChange);
  },

  componentWillUnmount: function () {
    ProfileStore.unlisten(this.onChange);
  },

  onChange: function (state) {
    this.setState(state);
  },

  getInitialState: function () {
    return ProfileStore.getState();
  },

  render: function () {
    var that = this;
    var allvideos = this.state.allvideos;
    console.log(allvideos);
    // var allvideos = (Object.keys(this.state.allvideos).length === 0 &&
    // this.state.allvideos.constructor === Object) ? [] : this.state.allvideos;
    var feedlist = allvideos.map(function (answer) {
      if (answer.resourceInfo.answerType == "Video") {
        return (
          <div className="col-xs-12 col-sm-4">
            <AllFeedTileView feed={answer}/>
          </div>
        )
      }
    });
    console.log("utils.getParameterByName('page')===", utils.getParameterByName('page'))
    var timeLineRoot = <section className="timeline">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12">
            {feedlist}
          </div>
          <Pagination pageLength={allvideos.length}/>
        </div>
      </div>
    </section>
    return (
      <div>
        {timeLineRoot}
      </div>
    )
  }
});

module.exports = ProfileView;
