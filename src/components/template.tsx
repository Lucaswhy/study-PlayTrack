import React from "react";
import LeftMenu from './LeftMenu';
import Header from './Header';
import Home from './Home';
import axios from 'axios';

interface IUser {
    Id: Number,
    Name: String,
    Email: String,
    Avatar?: String,
    Music?: any,
    Playlist?: any,
    Album?: any
}
interface IState {
    error: Boolean,
    isLoaded: Boolean,
    items: Array<IUser>; 
}
class Template extends React.Component<{}, IState> {

    constructor(props) {
        super(props);
        this.state = {
          error: false,
          isLoaded: false,
          items: []
        };
    }

    componentDidMount() {
        axios.post(`http://localhost:8080/api/login/`)
          .then(res =>{
            console.log(res.data);
              this.setState({
                isLoaded: true,
                error: res.data.error,
                items: res.data.value
              })
          },(error: String) => {
            this.setState({
                isLoaded: true,
            });
          });
    }
    
    render(){
        const { error, isLoaded, items } = this.state;
        if (error === true) {
            return <div>Error: Ocorreu um erro, tente novamente mais tarde! :( </div>
        }
        else{
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
                            <Home items={items} isLoaded={isLoaded}/>
                        </div>
                    </div>
                </div>
            );
        }
        }
    }

export default Template;