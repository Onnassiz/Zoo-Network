import React from 'react';

class Footer extends React.Component{
    render(){
        //Get social icon paths
        const facebook_icon_path = "http://res.cloudinary.com/onnassiz/image/upload/v1512016416/youtube-play_j29eg9.png";
        const twitter_icon_path = "http://res.cloudinary.com/onnassiz/image/upload/v1512016416/twitter-circle_j7eh0l.png";
        const youtube_icon_path = "http://res.cloudinary.com/onnassiz/image/upload/v1512016415/facebook-box_qbbcfz.png";

        //Style const
        const footer_subscribe = {
            'paddingTop': '32px',
            'fontSize': '20px',
        };

        const subscribe_button = {
            paddingTop: 25
        };

        return(
            <footer className="page-footer teal lighten-2">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Connect</h5>
                            <a target="new" className="grey-text text-lighten-3" href="https://twitter.com/menagerie"><img src={twitter_icon_path} alt=""/></a>
                            <a target="new" className="grey-text text-lighten-3" href="https://facebook.com/menagerie"><img src={facebook_icon_path} alt=""/></a>
                            <a target="new" className="grey-text text-lighten-3" href="https://youtube.com/menagerie"><img src={youtube_icon_path} alt=""/></a>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="#!">Site map</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Privacy & Policy</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Terms and Condition</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="brown lighten-5">
                    <div className="row">
                        <div className="col m9 push-m3">
                            <div className="col m4" style={footer_subscribe}>
                                <span className="teal-text lighten-2">Receive the Latest Updates</span>
                            </div>
                            <div className="input-field col m6">
                                <input id="email" type="email" className="validate"/>
                                    <label>Your Email Address</label>
                            </div>
                            <div className="col m1" style={subscribe_button}>
                                <input type="submit" className="btn" id="submit" value="Subscribe"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        &copy; 2017 - The Menagerie Network
                        <a className="grey-text text-lighten-4 right" href="#!">Contact us</a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
