import React, { ReactElement } from "react";
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

class Home extends React.Component<{}, IState> {

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
          let divArtist : any;
        if (error === true) {
            return <div>Error: Ocorreu um erro, tente novamente mais tarde! :( </div>
          } else if (!isLoaded) {
            return <h2>Carregando seus artistas! =)</h2>;
          } else {
            if(items === null || items === undefined) divArtist = <h2>Você não está logado!</h2>
            else divArtist = items.map(item => <p key={item.Id.toString()}>{item.Name}</p>)
            return (
              <div>
                <h2>Playlists</h2>
                <div>
                  {divArtist}
                </div>
              </div>
            )
          }
        }
    }

export default Home;