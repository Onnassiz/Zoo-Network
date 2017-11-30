import React from 'react';

import ArchiveRow from './ArchiveRow';

class AnimalClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animal_class: props.animal_class,
            thisClassAnimals: []
        }
    }

    componentDidMount(){
        this.filterAnimals();
    }

    filterAnimals(){
        const { animals } = this.props;
        const allAnimals = animals.animals;
        let stateAnimal = [];
        allAnimals.forEach((element) => {
            const item = element.animal_class;
            if(item === this.state.animal_class){
                stateAnimal.push(element);
            }
        });
        this.setState({ thisClassAnimals: stateAnimal });
    }

    render(){
        const countStyle ={
            fontSize : 22
        }
        return(
            <div>
                <h4 className="header">{this.state.animal_class}</h4>
                <ul className="collection with-header">
                    <li className="collection-header"><h5 className="header"><span className="teal-text" style={countStyle}>{this.state.thisClassAnimals.length}</span> animal(s) found in this class</h5></li>
                    { this.state.thisClassAnimals.map((animal, i) => <ArchiveRow {...this.props} animal={animal} key={i} zooAnimals={[]}/>) }
                </ul>
            </div>
        );
    }
}

export default AnimalClass;
