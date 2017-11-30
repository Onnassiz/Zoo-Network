import React from 'react';
import { Link } from 'react-router';
import AdminSideNav from './AdminSideNav';


class SideNav extends React.Component{
    render(){
        const iconFontSize = {
            fontSize: 17
        };

        //fetch Logo Url
        const logo_url = "http://res.cloudinary.com/onnassiz/image/upload/v1512016394/logo_vsjsxw.png";

        //fetch location prop
        const { location } = this.props;

        //set active class
        const homeClass = location.pathname === "/" ? "active" : "";
        const adminDashboardClass = location.pathname.match(/^\/dashboard/) ? "active" : "";
        const archiveClass = location.pathname.match(/^\/archive/) ? "active" : "";
        const zooClass = location.pathname.match(/^\/zoos/) ? "active" : "";
        // const searchClass = location.pathname.match(/^\/search/) ? "active" : "";
        const mapClass = location.pathname.match(/^\/maps/) ? "active" : "";

        const { loginDetails } = this.props;

        return(
            <header>
                <div className="container"><a data-activates="nav-mobile" className="button-collapse top-nav waves-effect waves-light circle hide-on-large-only"><i className="material-icons">menu</i></a></div>
                <ul id="nav-mobile" className="side-nav fixed">
                    <li className="logo">
                        <Link id="logo-container" to="/" className="brand-logo">
                            <img alt="Logo" className="circle responsive-img" src={logo_url} title="The Menagerie Network"/>
                        </Link>
                    </li>
                    {/*<li className={`bold ` + homeClass}>*/}
                        {/*<Link to="/" className="waves-effect waves-teal">*/}
                            {/*<i className="material-icons" style={iconFontSize}>home</i> Home*/}
                        {/*</Link>*/}
                    {/*</li>*/}
                    <li className={`bold ` + homeClass}>
                        <Link to="/" className="waves-effect waves-teal">
                            <i className="material-icons" style={iconFontSize}>search</i> Search
                        </Link>
                    </li>
                    <li className={`bold ` + zooClass}>
                        <Link to="/zoos" className="waves-effect waves-teal">
                            <i className="material-icons" style={iconFontSize}>sort_by_alpha</i> Zoos
                        </Link>
                    </li>
                    <li className={`bold ` + archiveClass}>
                        <Link to="/archive" className="waves-effect waves-teal">
                            <i className="material-icons" style={iconFontSize}>folder</i> Archive
                        </Link>
                    </li>
                    <li className={`bold ` + mapClass}>
                        <Link to="/maps" className="waves-effect waves-teal">
                            <i className="material-icons" style={iconFontSize}>location_on</i> Maps
                        </Link>
                    </li>
                    <li className={'bold ' + adminDashboardClass}>
                        <Link to="/dashboard" className="waves-effect waves-teal">
                            <i className="material-icons" style={iconFontSize}>person</i> Admin Dashboard
                        </Link>
                    </li>
                    { (loginDetails.isLoggedIn) ? <AdminSideNav {...this.props}/> : null }
                </ul>
            </header>
        );
    }
}

export default SideNav;
