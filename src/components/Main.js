import React from 'react';


//import sideNav and Footer
import SideNav from './layout/SideNav';
import Footer from './layout/Footer';
import jwt from 'jsonwebtoken';

//load favicon


class Main extends React.Component{

    setLoginState(){
        const token = localStorage.getItem('jwtToken');
        let isValid = false;
        try {
            jwt.verify(token, 'waid2');
            isValid = true
        }catch(err) {
            isValid = false;
        }
        if(isValid){
            const { setLoginDetails } = this.props;
            const token_decode = jwt.decode(token);
            const user = {
                email: token_decode.email,
                first_name: token_decode.first_name,
                last_name: token_decode.last_name
            }
            setLoginDetails(user);
        }
    }

    componentWillMount(){
        this.setLoginState();
    }

    render(){
        let props = Object.assign({},this.props);

        delete props.key;
        delete props.ref;

        const { location } = this.props;
        return(
            <div>
                <SideNav location={location} {...this.props}/>
                <main>
                    {React.cloneElement(this.props.children, props)}
                </main>
                <Footer/>
            </div>
        );
    }
}

export default Main;
