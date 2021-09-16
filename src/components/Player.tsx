import React, { ReactElement } from "react";
import axios from 'axios';

interface IMusic {
    Title: String,
    Artist: String,
    Track: Number,
    Duration: String,
    Reproduction: String,
    IdMusic: Number
}

interface IState {
    error: String,
    isLoaded: Boolean,
    item: IMusic | null; 
}


class Player extends React.Component<{}, IState> {

    constructor(props) {
        super(props);
        this.state = {
          error: '',
          isLoaded: false,
          item: null
        };
    }

    
    componentDidMount() {
        axios.get(`http://localhost:8080/api/music/Time`)
          .then(res =>{
              this.setState({
                isLoaded: true,
                item: res.data.data[0]
              })
          },(error: String) => {
            this.setState({
                error: error,
                isLoaded: true
            });
          });
        }
        
        render(){
        return(
            <div className="player">
                <div className="player__music">
                    <img className="music__img" src="https://i.imgur.com/WR32l6J.jpg" alt="DEFAULT" />
                    <span className="music__title">{this.state.item?.Title}</span>
                    <span className="music__artist">{this.state.item?.Artist}</span>
                    
                </div>
                <div className="player__start">

                </div>
                <div className="player_sound">

                </div>
            </div>
        )
    }
}

export default Player;