import React from 'react';
import AlertContainer from 'react-alert';

class Alert extends React.Component{
    constructor(props){
        super(props);
        this.alertOptions = {
            offset: 40,
            position: 'top right',
            theme: 'light',
            time: 5000,
            transition: 'fade',
        };
    }

    componentDidMount(){
        const { unsetAlert } = this.props;
        this.showAlert();
        setTimeout(unsetAlert, 8000)
    }


    showAlert(){
        const { alert } = this.props;
        this.msg.show(alert.alertMessage, {
            time: 6000,
            type: alert.alertType,
        });
    }

    render(){
        return(
            <div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>
        );
    }
}

export default Alert;
