import React, { ReactElement } from "react";
import axios from 'axios';

function LeftMenu() {
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
        </div>
        <hr/>
        <div className="menu__playlist">
            {listPlaylist()}
        </div>
    </div>
  );
}

async function listPlaylist(): Promise<Array<ReactElement>>{

    interface IPlaylist {
        Name: String,
        IdPlaylist: Number,
    }

    const playlist: Array<IPlaylist> = await axios.get(`http://localhost:8080/api/playlist`)
    .then(res => {
      return res.data;
    })

    console.log('eu estou aqui com o playlist' + playlist);

    let a: Array<ReactElement> = [];
    if(playlist.length > 0 ){
        playlist.forEach(item => {
            a.push(<span key={item.IdPlaylist.toString()}>{item.Name}</span>);
        });
    }
    
    return a
}

export default LeftMenu;