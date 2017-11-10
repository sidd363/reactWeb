var React = require('react/addons');

var utils = require('./../../../utils/helper.js');
var _ = require('lodash');

var MySelectionsList = React.createClass({

    openUserProfile:function(e){
        var userId = $(e.currentTarget).data("userid");
        this.props.openUserProfile(userId);
    },

    render: function() {
        var that = this;
        var mySelections = this.props.mySelections || [];
        var groupedSelections = _(mySelections).groupBy('title').transform(function(groupedSelections, current) {
            groupedSelections.push({
                title: current[0].title,
                status: current[0].status,
                user: _.map(current, function(item, index) {
                    return {
                        "displayName": item.firstName + " " + item.lastName,
                        "userId": item.userId
                    };
                })
            });
        }, []).value();
        console.log(groupedSelections);

        var SelectionsList = groupedSelections.map(function(item, index) {
            if(index<3){
              var displayNamesList = item.user.map(function(uItem, uIndex) {
                  var check = (uIndex > 0 || uIndex < uItem.length) ? true : false ;
                  return (
                      <div className="sfmsname">
                          <a style={{cursor: "pointer"}} data-userid={uItem.userId} onClick={that.openUserProfile}>{uItem.displayName}&nbsp;&nbsp;</a>
                      </div>
                  );
            })

            return (
                <div key={index} className="sfmstile clearfix">
                    <span className="sfmsdate ellipsis">{item.title ? item.title : "Unknown"}</span>
                    <span className="sfmsname">{displayNamesList}</span>
                    <span className="sfmsshare ellipsis">Status: {item.status ? item.status : "Unknown"}</span>
                </div>
            );
          }
        });
        return (
              <div>{SelectionsList}</div>
        );
    }
});

module.exports = MySelectionsList;
