import React from 'react';

class ImageMedia extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col s12">
                    <img alt="Link" className="materialboxed col s12" src={this.props.link}/>
                </div>
            </div>
        );
    }
}

export default ImageMedia;
