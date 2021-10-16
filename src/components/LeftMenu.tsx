import React from "react";
import axios from 'axios';

interface IPlaylist {
    Name: String,
    IdPlaylist: Number,
}

interface IState {
    error: String,
    isLoaded: Boolean,
    items: Array<IPlaylist>; 
}

class LeftMenu extends React.Component<{}, IState> {

    constructor(props) {
        super(props);
        this.state = {
          error: '',
          isLoaded: false,
          items: []
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/playlist`)
          .then(res =>{
              this.setState({
                isLoaded: true,
                items: res.data.data
              })
          },(error: String) => {
            this.setState({
                isLoaded: true,
            });
          });
    }

    render(){
        const { error, isLoaded, items } = this.state;

        if (error !== '') {
            return <div>Error: Ocorreu um erro, tente novamente mais tarde! :( </div>;
          } else if (!isLoaded) {
            return <div className="menu"><span>Loading playlists...</span></div>;
          } else {
            return (
                <div className="menu">
                    <div className="menu__main">
                            <figure>
                                <a href="/#">
                                <span>
                                    Início
                                </span>
                                </a>
                            </figure>
                            <figure>
                                <a href="/#">
                                <span>
                                    Buscar
                                </span>
                                </a>
                            </figure>
                            <figure>
                                <a href="/#">
                                <span>
                                    Sua Biblioteca
                                </span>
                                </a>
                            </figure>
                            <figure>
                                <a href="/#">
                                <span>
                                    Criar playlist
                                </span>
                                </a>
                            </figure>
                            <figure>
                                <a href="/#">
                                <span>
                                    Músicas Curtidas
                                </span>
                                </a>
                            </figure>
                            <hr/>
                    <div className="menu__playlist">
                        {items.map(item => <p key={item.IdPlaylist.toString()}>{item.Name}</p>)}
                    </div>
                    </div>
                </div>
            );
        }
    }
}

export default LeftMenu;