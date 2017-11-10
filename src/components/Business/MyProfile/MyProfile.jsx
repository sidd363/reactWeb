var React = require('react/addons');

var MyProfile = React.createClass({
    render: function() {
        return (
            <div id="sfmp" className="tab-pane">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 pdlt15">
                        <div className="white-content sfprofile">
                            <img src="/web/images/deepesh.jpg" alt="Deepesh" />
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <h1 className="ellipsis">Deepesh Naini</h1>
                                    <a href="" className="sfcompany">Shrofile India Pvt. Ltd.</a>
                                    <span className="sfcominfo"><i className="fa fa-map-marker"></i> Sector - 56, Gurgaon</span>
                                    <span className="sfcominfo"><i className="fa fa-globe"></i> www.shrofile.com</span>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <span className="cfuv"><i className="fa fa-upload"></i> Upload Video</span>
                                    <span className="cfbm"><i className="fa fa-bookmark-o"></i></span>
                                    <span className="cfbm"><i className="fa fa-pencil"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MyProfile;