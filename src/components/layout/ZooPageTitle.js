import React from 'react';

class PageTitle extends React.Component{
    componentWillMount(){
        document.title = (this.props.title === "The Menagerie") ? "Home - The Menagerie" : this.props.title + " - The Menagerie";
    }

    render(){
        const { zoo } = this.props;
        const address = zoo.house_number + " " +zoo.street + " " +zoo.county;

        return(
            <div>
                <div className="section" id="index-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <h2 className="header center-on-small-only">{this.props.title}</h2>
                                <h5 className="header center-on-small-only">Address: {address}</h5>
                                <h5 className="header center-on-small-only">Postcode: {zoo.postcode}</h5>
                                <h5 className="header center-on-small-only">Distance: 5 miles away</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageTitle;
