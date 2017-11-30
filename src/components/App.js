import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Main from './Main';

function mapStatesToProps(state) {
    return{
        formState: state.formState,
        alert: state.alert,
        serverUrl: state.serverUrl,
        loginDetails: state.loginDetails,
        zoos: state.zoos,
        zooImageLinks: state.zooImageLinks,
        animals: state.animals,
        animalImageLinks: state.animalImageLinks,
        animalZoos: state.animalZoos,
        searchKeys: state.searchKeys
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStatesToProps, mapDispatchToProps)(Main);

export default App;
