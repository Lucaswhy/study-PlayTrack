import React, { ReactElement } from "react";
import axios from 'axios';
import IUser from './template'
    
 function Home (items: any,isLoaded: Boolean){
   console.log(items + " " + isLoaded)
        let divArtist : any;
        if (!isLoaded) {
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

export default Home;