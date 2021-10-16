import React from "react";
import LeftMenu from './LeftMenu';
import Header from './Header';
import Home from './Home';

class Template extends React.Component<{}> {
    
    render(){
            return (
                <div className="template">
                    <div className="template__menu">
                        <LeftMenu/>
                    </div>
                    <div className="template__content">
                        <div className="template__header">
                            <Header/>
                        </div>
                        <div className="container">
                            <Home/>
                        </div>
                    </div>
                </div>
            );
        }
    }

export default Template;