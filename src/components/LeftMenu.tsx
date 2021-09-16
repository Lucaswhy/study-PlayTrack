import React, { ReactElement } from "react";
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
                error: error,
                isLoaded: true
            });
          });
    }

    render(){
        const { error, isLoaded, items } = this.state;

        if (error !== '') {
            return <div>Error: {error}</div>;
          } else if (!isLoaded) {
            return <span>Loading playlists...</span>;
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
                        {listPlaylist(items)}
                    </div>
                    </div>
                </div>
            );
        }
    }
}

function listPlaylist(playlist: Array<IPlaylist>): Array<ReactElement>{

    let element: Array<ReactElement> = [];

    if(playlist.length > 0 ){
        playlist.forEach(item => {
            element.push(<p key={item.IdPlaylist.toString()}>{item.Name}</p>);
        });
    }
    return element
}

export default LeftMenu;