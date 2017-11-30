import React from 'react';
import Render from 'react-dom';

import {Router, Route, IndexRoute } from 'react-router';


//importComponents
import App from './components/App';
// import Home from './components/Home';
import AddNewAdmin from './components/AddAdmin';
import AdminDashboard from './components/AdminDashboard';
import Logout from './components/Logout';
import ZooManage from './components/ZooMange';
import ZooManageRdr from './components/redirects/ZooManageRdr';
import AddNewZoo from './components/AddNewZoo';
import UploadZooImages from './components/UploadZooImages';
import ManageAnimals from './components/ManageAnimals';
import AddNewAnimal from './components/AddNewAnimal';
import ManageAnimalRdr from './components/redirects/ManageAnimalRdr';
import UploadAnimalImages from './components/UploadAnimalImages';
import TagZoos from './components/TagZoos';
import Archive from './components/Archive';
import AnimalDescription from './components/AnimalDescription';
import Zoos from './components/Zoos';
import ZooDescription from './components/ZooDescription';
import Search from './components/Search';
import Maps from './components/Maps';

import { Provider } from 'react-redux';
import store, { history } from './store';


const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Search}></IndexRoute>
                <Route path='/dashboard' component={AdminDashboard}></Route>
                <Route path='/addAdmin' component={AddNewAdmin}></Route>
                <Route path='/logout' component={Logout}></Route>
                <Route path='/zoo-manage' component={ZooManage}></Route>
                <Route path='/zoo-manage/add' component={AddNewZoo}></Route>
                <Route path='/zoo-manage-sendBack' component={ZooManageRdr}></Route>
                <Route path='/zoo-manage/image-upload(/:zoo_name)' component={UploadZooImages}></Route>
                <Route path='/manage-animals' component={ManageAnimals}></Route>
                <Route path='/manage-animals/add' component={AddNewAnimal}></Route>
                <Route path='/manage-animal-sendBack' component={ManageAnimalRdr}></Route>
                <Route path='/manage-animals/image-upload(/:common_name)' component={UploadAnimalImages}></Route>
                <Route path='/manage-animals/tag-zoos(/:common_name)' component={TagZoos}></Route>
                <Route path='/archive' component={Archive}></Route>
                <Route path='/archive(/:common_name)' component={AnimalDescription}></Route>
                <Route path='/zoos' component={Zoos}></Route>
                <Route path='/zoos(/:zoo_name)' component={ZooDescription}></Route>
                <Route path='/maps' component={Maps}></Route>
            </Route>
        </Router>
    </Provider>
);

Render.render(router, document.getElementById('root'));
