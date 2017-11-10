var React = require('react/addons');

var MultiSelectionView = React.createClass({
    render: function() {
        return (
            <div className="row mrtp10">
                <div className="col-xs-12 col-sm-12 pdlt15">
                    <div className="white-content sfdinfo clearfix mrbt10 pd15">
                        <div className="selection_head">
                            <span className="shsm">Selection Name</span>
                            <p className="shtitle">Sr. Project Manager Who Rocks <span>4 July 2017</span> <i className="fa fa-pencil"></i></p>
                            <div className="shjob">Linked with Job Id: <b>2654</b></div>
                        </div>
                    </div>

                    <div className="white-content pd10 clearfix selectHeaderBottom">
                        <div className="sfsrchselect lbg">
                            <div className="checkbox sfselectall mrrg10">
                                <input type="checkbox" value="option1" />
                            </div>
                            <h4>32 Shrofile</h4>
                            <div className="sfsnlistaction"><i className="fa fa-upload"></i> Upload Profile</div>
                            <div className="sfsnlistaction mrrg10"><i className="fa fa-close"></i> Remove Profile</div>
                            <div className="sfsnlistaction"><i className="fa fa-plus"></i> Add Profile</div>
                            <div className="sfsnlistaction mrrg10"><i className="fa fa-share-alt"></i> Share</div>
                            <div className="sfsnlistaction"><i className="fa fa-user-plus"></i> Invite</div>
                        </div>
                    </div>

                    <div className="white-content mrtp1 mrbt10 clearfix">
                        <div className="sfsntile clearfix">
                            <div className="sfselectall sfsnsa"></div>
                            <img src="/web/images/images.png" alt="" className="sfsnimg" />
                            <div className="sfsnname ellipsis">Swarup Krishna <span>From Search - 32</span></div>
                            <span className="sfsntools"><i className="fa fa-trash-o"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MultiSelectionView;