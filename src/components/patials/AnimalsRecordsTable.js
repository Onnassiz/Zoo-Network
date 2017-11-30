import React from 'react';
import AnimalTableRow from './AnimalsTableRow'
import ImageGifLoader from "./ImageGifLoader";

class AnimalsRecordsTable extends React.Component{
    render(){
        const { animals } = this.props;
        return(
            <div>
                <br/>
                <h5 className="header">Animals</h5>
                <table className="bordered highlight">
                    <thead>
                    <tr>
                        <th>Common Name</th>
                        <th>Class</th>
                        <th>Order</th>
                        <th>Family</th>
                        <th>Genus</th>
                        <th>Species</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {animals.map((animal, i) => <AnimalTableRow {...this.props} key={i} i={i} animal={animal}/>)}
                    </tbody>
                </table>
                <div className="col 2" hidden={!this.props.formState.isLoading}>
                    <span className="modifyGif"><ImageGifLoader/></span>
                </div>
            </div>
        );
    }
}

export default AnimalsRecordsTable;
