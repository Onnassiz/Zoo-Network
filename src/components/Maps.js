import React from 'react';

import PageTitle from './layout/PageTitle';
import MapComponent from './patials/MapComponent';

class Maps extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postcodes: [],
            postcodesByZoos: []
        }
    }

    componentDidMount(){
        const { serverUrl, fetchContents, updateZoos } = this.props;
        const url = serverUrl.serverUrl + "fetchZoos";
        fetchContents(url)
            .then((response) => {
                updateZoos(response.data);
                this.setPostcode();
                this.getLatsLongs({"postcodes": this.state.postcodes});
            }).catch((error) => {
        });
    }

    setPostcode(){
        const { zoos } = this.props;
        const allZoos = zoos.zoos;
        let postcodes = [];
        allZoos.forEach((element) => {
            postcodes.push(element.postcode);
        });
        this.setState({postcodes});
    }

    getLatsLongs(postcodes){
        const url = "https://api.postcodes.io/postcodes";
        const { getZoosLatLong } = this.props;
        getZoosLatLong(url, postcodes)
            .then((response) => {
                this.filterGoeResponse(response.data.result);
                console.log(this.state.postcodesByZoos);
            }).catch((error) => {
                console.log(error.response.data)
        });
    }

    filterGoeResponse(result = []){
        let postcodesByZoos = [];
        result.forEach((element) =>{
            const { zoos } = this.props;
            const allZoos = zoos.zoos;
            allZoos.forEach((item) =>{
                if(item.postcode === element.result.postcode){
                    postcodesByZoos.push({
                        zoo_name: item.zoo_name,
                        house_number: item.house_number,
                        website: item.website,
                        street: item.street,
                        county: item.county,
                        postcode: element.result.postcode,
                        latitude: element.result.latitude,
                        longitude: element.result.longitude,
                        district: element.result.admin_district
                    });
                }
            })
        });
        this.setState({postcodesByZoos});
    }

    render(){
        return(
            <div>
                <PageTitle title="Maps" description="Find all our zoos in Map. Click on each pushpin for more description" no_margin="No margin"/>
                <div className="col s12">
                    <MapComponent locations={this.state.postcodesByZoos}/>
                </div>
            </div>
        );
    }
}

export default Maps;
