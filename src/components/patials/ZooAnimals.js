import React from 'react';

import ArchiveRow from './ArchiveRow';

class ZooAnimals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoo_name: props.params.zoo_name,
            animal_count:{}
        }
    }


    render(){
        const { animalsInZoo, zooAnimals } = this.props;
        return(
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h5 className="header">Animals in {this.state.zoo_name}</h5></li>
                    { animalsInZoo.map((animal, i) => <ArchiveRow {...this.props} animal={animal} key={i} zooAnimals={zooAnimals}/>) }
                </ul>
            </div>
        );
    }
}

export default ZooAnimals;
