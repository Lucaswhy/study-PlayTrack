import React from "react";
import { ArrowRightCircle, ArrowLeftCircle } from 'react-bootstrap-icons';

class Header extends React.Component<{}> {
    
    render(){
            return (
                <div className="header">
                    <div className="header__button">
                        <ArrowLeftCircle color="white" size={24} />
                        <ArrowRightCircle color="white" size={24} />
                    </div>
                    <div className="header__input">
                        <input type="text"/>
                    </div>
                    <div className="header__user">
                        <div>
                            <img src="https://dev-lucas-herculano.vercel.app/img/lucash.5bfb132a.jpg" alt="" />
                            <span>Lucas Herculano</span>
                        </div>
                    </div>
                </div>
            );
        }
    }

export default Header;