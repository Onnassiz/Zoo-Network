import React from 'react';
import isEmpty from 'lodash/isEmpty';

class PageTitle extends React.Component{
    componentWillMount(){
        document.title = (this.props.title === "The Menagerie") ? "Home - The Menagerie" : this.props.title + " - The Menagerie";
    }

    render(){
        const {no_margin} = this.props;
        const margin = {
            marginBottom : (isEmpty(no_margin)) ? 60 : 0
        }
        return(
            <div style={margin}>
                <div className="section" id="index-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <h2 className="header center-on-small-only">{this.props.title}</h2>
                                <h5 className="light teal-text text-lighten-4 center-on-small-only">{this.props.description}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageTitle;
