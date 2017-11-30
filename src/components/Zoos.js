import React from 'react';
import PageTitle from './layout/PageTitle';
import ZooRow from './patials/ZooRow';


class Zoos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoos: []
        }
    }

    componentDidMount(){
        const { serverUrl, fetchContents, updateZoos, fetchZooImageLinks, updateZooImageLinks } = this.props;
        const url = serverUrl.serverUrl + "fetchZoos";
        const links_url = serverUrl.serverUrl + "fetchZooLinks";
        fetchContents(url)
            .then((response) => {
                updateZoos(response.data);
                this.updateZooState();
            }).catch((error) => {
        });
        fetchZooImageLinks(links_url)
            .then((response) => {
                updateZooImageLinks(response.data);
            }).catch((error) => {
        });
    }

    updateZooState(){
        const { zoos } = this.props;
        this.setState({ zoos: zoos.zoos });
    }

    render(){
        return (
            <div>
                <PageTitle title="Our Zoos" description="All Zoos in Our Network"/>
                <div className="container">
                    <ul className="collection with-header">
                        <li className="collection-header"><h5 className="header">Zoos Found in our Network</h5></li>
                        {this.state.zoos.map((zoo, i) => <ZooRow {...this.props} key={i} i={i} zoo={zoo} animal_zoos={[]}/>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Zoos;
