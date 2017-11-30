import React from 'react';
import { Link } from 'react-router';

class AdminSideNav extends React.Component{
    render(){
        const { location } = this.props;
        const iconFontSize = {
            fontSize: 17
        };
        const addNewAdminClass = location.pathname.match(/^\/addAdmin/) ? "active" : "";
        const zooManageClass = location.pathname.match(/^\/zoo-manage/) ? "active" : "";
        const manageAnimalClass = location.pathname.match(/^\/manage-animals/) ? "active" : "";
        return(
            <div>
                <li className={'bold ' + zooManageClass}>
                    <Link to="/zoo-manage" className="waves-effect waves-teal">
                        <i className="material-icons" style={iconFontSize}>unarchive</i> Zoo Management
                    </Link>
                </li>
                <li className={'bold ' + manageAnimalClass}>
                    <Link to="/manage-animals" className="waves-effect waves-teal">
                        <i className="material-icons" style={iconFontSize}>settings</i> Animal Management
                    </Link>
                </li>
                <li className={'bold ' + addNewAdminClass}>
                    <Link to="/addAdmin" className="waves-effect waves-teal">
                        <i className="material-icons" style={iconFontSize}>add_box</i> Add Admin
                    </Link>
                </li>
                <li className={'bold '}>
                    <Link to="/logout" className="waves-effect waves-teal">
                        <i className="material-icons" style={iconFontSize}>power_settings_new</i> Logout
                    </Link>
                </li>
            </div>
        );
    }
}

export default AdminSideNav;
