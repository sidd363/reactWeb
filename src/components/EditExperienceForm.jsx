var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var moment = require("moment");
var EditExperience = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  shouldComponentUpdate: function () {
    console.log("EditExperience shouldComponentUpdate")
    return true;
  },
  componentWillUpdate: function () {
    console.log("EditExperience componentWillUpdate")
  },
  componentDidUpdate: function () {
    console.log("EditExperience componentDidUpdate")
  },
  onHandleCheckbox: function (e) {
    var $box = $(e.target);
    var checkVal = $box.is(":checked");
    var toDateGroup = "#experienceForm input[name='toDate[]']";
    if (checkVal) {
      var toDateGroup = "#experienceForm input[name='toDate[]']";
      $(toDateGroup).attr("disabled", false);
    }

  },
  render: function () {
    var currentData = this.props.currentData;
    var from = undefined;
    var to = undefined;
    var disabled = true;
    var isChecked = true;
    if (this.props.number > 0) {
      disabled = false;
      isChecked = false;
    }
    if (currentData) {
      from = moment
        .utc(currentData.from * 1000)
        .format('YYYY/MM/DD');
      if (currentData.to != 0) {
        to = moment
          .utc(currentData.to * 1000)
          .format('YYYY/MM/DD');
      } else {
        disabled = true;
        isChecked = true;
      }

    } else {
      currentData = {}
    }
    if (this.props.number > 0) {
      disabled = false;
    }
    return (
      <div className="form-group">
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            defaultValue={currentData.title}
            data-nametag="title"
            name="title[]"
            placeholder="Title"/>
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            defaultValue={currentData.company}
            data-nametag="company"
            name="company[]"
            placeholder="Company"/>
        </div>
        <div className="col-md-2">
          <textarea
            type="text"
            className="form-control"
            defaultValue={currentData.desc}
            data-nametag="desc"
            name="desc[]"
            placeholder="Description" rows="5" cols="5"></textarea>
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            defaultValue={currentData.location}
            data-nametag="location"
            name="location[]"
            placeholder="Location"/>
        </div>

        <div className="col-md-2 dateContainer">
          <div className="input-group input-append date" className="dueDatePicker">
            <input
              type="text"
              className="form-control"
              defaultValue={from}
              data-nametag="from"
              name="fromDate[]"
              placeholder="From date"/>
          </div>
        </div>
        <div className="col-md-2 dateContainer">
          <div className="input-group input-append date" className="dueDatePicker">
            <input
              type="text"
              className="form-control"
              disabled={disabled}
              defaultValue={to}
              data-nametag="to"
              name="toDate[]"
              placeholder="To date"/>
          </div>
        </div>
        {this.props.number == 0 && <div className="col-md-2">
          <input
            type="checkbox"
            className="form-control wd20 pull-left"
            checked={isChecked}
            defaultValue={currentData.working}
            data-nametag="working"
            name="working[]"
            onChange={this.onHandleCheckbox}>Current</input>
        </div>}
        {this.props.number >= 1 && <div className="col-md-2">
          <input
            type="checkbox"
            className="form-control wd20 pull-left"
            style={{
              "display": "none"
            }}
            checked={isChecked}
            defaultValue={currentData.working}
            data-nametag="working"
            name="working[]"
            onChange={this.onHandleCheckbox}></input>
        </div>}
      </div>
    )
  }
});

module.exports = EditExperience;
