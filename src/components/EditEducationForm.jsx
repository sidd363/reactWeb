var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var moment = require("moment");
var EditEducationForm = React.createClass({
  shouldComponentUpdate:function(){
    console.log("EditEducationForm shouldComponentUpdate")
    return true;
  },
  componentWillUpdate:function(){
    console.log("EditEducationForm componentWillUpdate")
  },
  componentDidUpdate:function(){
    console.log("EditEducationForm componentDidUpdate")
  },
render: function() {
    var currentData = this.props.currentData;
    var from=undefined;
    var to = undefined;
    if(currentData){
      from = moment.utc(currentData.from * 1000).format('YYY/MM/DD');
      to = moment.utc(currentData.to * 1000).format('YYY/MM/DD');
    }else{
      currentData={}
    }
    return (
      <div className="form-group">
        <div className="col-md-3">
          <input type="text" className="form-control" value={currentData.institution} data-nametag="institution" name="college[]" placeholder="School/College/University"/>
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" value={currentData.course} data-nametag="course" name="course[]" placeholder="Course/Degree"/>
        </div>
        <div className="col-md-3 dateContainer">
          <div className="input-group input-append date" className="dueDatePicker">
            <input type="text" className="form-control" value={from} data-nametag="from" name="educationfromDate[]" placeholder="From date"/>
          </div>
        </div>
        <div className="col-md-3 dateContainer">
          <div className="input-group input-append date" className="dueDatePicker">

            <input type="text" className="form-control" value={to} data-nametag="to" name="educationtoDate[]" placeholder="To date"/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = EditEducationForm;
