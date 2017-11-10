var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var EditExperience = require("./EditExperienceForm.jsx");
var EditEducation = require("./EditEducationForm.jsx");
var FormParentComponent = require("./FormParentComponent.jsx");

var EditProfileModal = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    this.state = {
      numChildren: 1,
      currentUser: {},
      initialNumber: 1
    };
    return this.state;
  },

  onAddChild() {
    this.setState({
      numChildren: this.state.numChildren + 1
    });
  },

  onremoveChild() {
    if (this.state.numChildren > this.state.initialNumber) {
      this.setState({
        numChildren: this.state.numChildren - 1
      });
    }
  },

  myFunc(user) {
    console.log("myfunc===", user)
  },

  componentDidMount() {
    $(this.getDOMNode()).modal('show');
    $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
  },

  componentWillUnmount: function () {
    console.log("componentWillUnmount here");
  },

  componentWillReceiveProps: function (nextProps) {
    this.forceUpdate()
    console.log(nextProps)
  },

  shouldComponentUpdate: function () {
    console.log("shouldComponentUpdate")
    return true;
  },

  componentWillUpdate: function () {
    console.log("componentWillUpdate")
  },

  componentDidUpdate: function () {
    console.log("componentDidUpdate")
  },

  render: function () {
    var children = [];
    var id = this.props.id;
    var type = this.state.type || this.props.type;
    var formId = "";
    var currentProfileObj = JSON.parse(localStorage.getItem("currentUser"))
    var arrList = undefined;
    console.log("this.state=====", this.state)
    if (type == "experience") {
      arrList = currentProfileObj["experienceList"];
    } else {
      arrList = currentProfileObj["educationList"];
    }
    if ((type === "education" || type === "experience") && arrList != undefined && this.state.numChildren < arrList.length) {
      this.state.numChildren = arrList.length;
      this.state.initialNumber = arrList.length;
    }
    if (!arrList) {
      arrList = []
    }
    for (var i = 0; i < this.state.numChildren; i += 1) {
      if (type == "experience") {
        children.push(<EditExperience currentData={arrList[i]} number={i}/>);
      } else if (type == "education") {
        children.push(<EditEducation currentData={arrList[i]} number={i}/>);
      }
    }
    if (type === "experience") {
      formId = "experienceForm";
    } else if (type === "education") {
      formId = "educationForm";
    }

    return (<FormParentComponent
      children={children}
      addChild={this.onAddChild}
      removeChild={this.onremoveChild}
      userId={currentProfileObj.id}
      modalId={id}
      formId={formId}
      type={type}/>)
  }
});

module.exports = EditProfileModal;
