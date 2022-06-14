import React, {useState} from "react";
import Cookies from "universal-cookie";
function PrevGameCard({client,channel,setChannel,PlayerNumber}) {
    const chnlID = channel.cid;
    const timeCreated = channel.data.created_at;
    const date = timeCreated.split("T")[0]
    const time = timeCreated.split("T")[1].split("Z")[0].split(".")[0]
    function gotoGame() {
        setChannel(channel);
    }
    return <div className="PrevGameCardContainer">
    <h1>Game with</h1>
    <p>on {date} at {time}</p>
    <button onClick={gotoGame}> Go to Game</button>
    
    </div>
}

export default PrevGameCard;