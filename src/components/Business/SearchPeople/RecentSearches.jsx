var React = require('react/addons');
var requestLib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');

var RecentSearches = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentWillMount() {
    var that = this;
    var recentSearchesUrl = config.baseUrl + "/businessUsers/search";
    requestLib.get(recentSearchesUrl, function(err, response) {
      if (!err) {
        that.setState({searches: response.body});
      } else {
          swal('Error', err, 'error');
      }
    });
  },

  onHandleSearchResult: function(e) {
    var that = this;
    var payLoad = $(e.currentTarget).data('queryobj');
    console.log(payLoad);
    var headers = {
      "Content-Type": "application/json"
    };
    var getSearchUrl = config.baseUrl + "/businessUsers/search";
    requestLib.post(getSearchUrl, payLoad, headers, function(err, response) {
      if (!err) {
        that.props.onHandleRecentSearches(payLoad["queryObj"], response.body);
      } else {
        swal('Error', err, 'error');
      }
    });
  },

  render: function() {
    var that = this;
    var searches = this.state.searches || [];
    var type = this.props.type || "search";
    var maxIndex = searches.length;
    if(type=="home"){
      maxIndex=7;
    }
    var Searches = searches.map(function(item, index) {
      if(index<maxIndex){
        return (
          <li data-queryobj={JSON.stringify(item)} onClick={that.onHandleSearchResult} key={index}>
            <a style={{
              cursor: "pointer"
            }} className="recentSearchesItem" key={item.queryObj.userid}>{item.identifier}</a>
          </li>
        );
      }
    });
    return (
      <div className="white-content sfdbox">
        <div className="sfdtitle">My Saved Searches <i className="fa fa-life-saver blu"></i></div>
        <ul className="sfrs mrtp10">
          {Searches}
        </ul>
        {type=="home" &&
        <div className="sfsbtnbox">
            <button type="button" className="bg-vd wd100 blue mrtp15 pull-left" onClick={this.props.showallRecentsearches}><i className="fa fa-search"></i> Show All Saved Searches</button>
        </div>}
      </div>
    );
  }
});

module.exports = RecentSearches;
