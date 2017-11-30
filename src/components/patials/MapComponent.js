import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import MapMarker from './MapMarker';

export class MapComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedPlace: {},
            activeMarker: {},
            showingInfoWindow: false
        }
    }

    onMarkerClick(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked(props){
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }



    render(){
        const initialCenter = { lng: -4.5481, lat: 54.2361 };
        const { locations } = this.props;
        return(
            <div className="row">
                <Map google={this.props.google}
                     style={{width: '100%', height: '75%', position: 'relative'}}
                     className={'map'}
                     zoom={6}
                     initialCenter={initialCenter}
                     onClick={this.onMapClicked.bind(this)}>

                    { locations.map((location, i) => <MapMarker location={location} key={i} onClick={this.onMarkerClick.bind(this)}/>) }

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h4 className="header">{this.state.selectedPlace.name}</h4>
                            <p>Address: {this.state.selectedPlace.address}</p>
                            <p>Postcode: {this.state.selectedPlace.postcode}</p>
                            <p>District: <b>{this.state.selectedPlace.district}</b></p>
                            <p>Website: <a target="new" href={this.state.selectedPlace.website}>{this.state.selectedPlace.name}</a></p>
                            <p><a target="new" href={"https://www.google.co.uk/maps/place/" + this.state.selectedPlace.postcode}>Route to {this.state.selectedPlace.name}</a></p>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyBwzcRKUfCOpnDtZvljV3xjPjYYS_xSBfk"
})(MapComponent)
