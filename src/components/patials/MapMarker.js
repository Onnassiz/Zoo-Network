import React from 'react';
import { Marker } from 'google-maps-react';

class MapMarker extends React.Component{
    render(){
        const { location } = this.props;
        const address = location.house_number + " " +location.street + ", " +location.county;
        return(
            <Marker
                name={location.zoo_name}
                address={address}
                website={location.website}
                district={location.district}
                postcode={location.postcode}
                position={{lat: location.latitude, lng: location.longitude}}
                google={this.props.google}
                mapCenter={this.props.mapCenter}
                map={this.props.map}
                onClick={this.props.onClick}
            >
            </Marker>
        );
    }
}

export default MapMarker;
