import React, {useState} from "react";
import Cookies from "universal-cookie";
import PrevGameCard from "./PrevGameCard";
function AllPreviousGames({client,channel,setChannel,PlayerNumber,setPlayerNumber}) {
    const cookies = new Cookies();
    const Email = cookies.get("Email");
    const userID = cookies.get("userId");
    // console.log("from APG", userID);
    let [Flag, setFlag] = useState(true);
    let [ChannelList, setChannelList] = useState(null);
    let GamesList = async () => {
        const filter = {
            type: 'messaging',
            members: { $in: [userID] },
        };
        const sort = { last_message_at: -1 };
        const channelList = await client.queryChannels(filter, sort, {
            watch: false,
            state: true,
            limit:5
        });
        setChannelList(channelList)
        // console.log(channelList)
    }
    if (Flag) {
        GamesList();
        setFlag(false)    
    }
    

    if (ChannelList){ return (<div className="AllPreviousGamesContainer">
    
    <h3>Previous Games of {cookies.get("Name")}</h3>
    
    {ChannelList.map((chnl,indx)=>{return (
        <div key={indx}>
        <PrevGameCard channel={chnl} setChannel={setChannel} PlayerNumber={PlayerNumber} client={client} setPlayerNumber={setPlayerNumber}/>
        <br/>
        </div>
    )})}
    
    </div>)}
}

export default AllPreviousGames;