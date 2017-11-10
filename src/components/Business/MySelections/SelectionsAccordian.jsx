var React = require('react/addons');
var UserShortDisplay = require("../common/UserShortDisplay.jsx");
var requestLib = require('./../../../../controllers/request.js');
var config = require('./../../../../config.js');
var SelectionsAccordian = React.createClass({
    getInitialState:function(){
      return {
        applicationList:[]
      }
    },
    loadData:function(){
      var that = this
      requestLib.get(config.baseUrl + '/applications/'+that.props.jobId+"/"+that.props.status, function(err,response){
        if(!err && response.body) {
          console.log(response.body)
          that.setState({applicationList: response.body});
        }
      });
    },
    render: function() {
      var accId = "accordion"+this.props.index;
      var collapsedId = "collapsed"+this.props.index;
      var accParentId = "#"+accId;
      var collapsedParentId = "#"+collapsedId;
      var openClass = "panel-collapse collapse ";
      var countsDisplay = "";
      var item = this.props.item;
      console.log("Item--->", item);
      var that =this;
      if(item.counts){
        countsDisplay= Object.keys(item.counts).map(function(key,index){
          if(key!=="invited"){
            var value = item.counts[key];
            var label = "default";
            if (key === "shortlisted") {
              label = "success";
            } else if (key === "rejected") {
              label = "danger";
            } else if (key === "waitlisted") {
              label = "primary";
            } else {
              label = "info";
            }
            var labelClass = "pull-right cslabel label-" + label;
            return(
              <span className={labelClass}>{key} - {value}</span>
            )

          }
        })
      }
      var userList = this.state.applicationList.map(function(item,index){
        console.log("item=====",item)
        item.displayname = item.firstName+" "+item.lastName;
        return(<UserShortDisplay item ={item} key={index} type="selection" status={item.status} openUserProfile={that.props.openUserProfile} />)
      })
        return (
            <div className="panel-group" id={accId} role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div className="panel-heading customheading" role="tab" id="headingOne">
                        <h6 className="panel-title">
                            <a role="button" data-toggle="collapse" data-parent={accParentId} href={collapsedParentId} aria-expanded="true" aria-controls={collapsedId} onClick={this.loadData}>{item.title}
                              {countsDisplay}
                            </a>
                        </h6>
                    </div>
                    <div id={collapsedId} className={openClass} role="tabpanel" aria-labelledby="headingOne">
                        <div className="panel-body">
                            {userList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SelectionsAccordian;
