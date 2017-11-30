import React from 'react';
import TableRow from './TableRow'
import ImageGifLoader from "./ImageGifLoader";

class ZooManageTable extends React.Component{
    render(){
        const { zoos } = this.props;
        return(
            <div>
                <br/>
                <h5 className="header">Zoos</h5>
                <table className="bordered highlight">
                    <thead>
                    <tr>
                        <th>Zoo Name</th>
                        <th>Website</th>
                        <th>Address</th>
                        <th>Postcode</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {zoos.map((zoo, i) => <TableRow {...this.props} key={i} i={i} zoo={zoo}/>)}
                    </tbody>
                </table>
                <div className="col 2" hidden={!this.props.formState.isLoading}>
                    <span className="modifyGif"><ImageGifLoader/></span>
                </div>
            </div>
        );
    }
}

export default ZooManageTable;
