import React, {useState} from "react";
import Cookies from "universal-cookie";
function PrevGameCard({client,channel,setChannel,PlayerNumber,setPlayerNumber}) {
    const chnlID = channel.cid;
    const cookies = new Cookies();
    const userID = cookies.get("userId");
    const timeCreated = channel.data.created_at;
    const date = timeCreated.split("T")[0]
    const time = timeCreated.split("T")[1].split("Z")[0].split(".")[0]
    const [friend, setFriend] = useState(null);
    let [Flag2, setFlag2] = useState(true);
    async function gotoGame() {
        setChannel(channel);
        const startWatching = await channel.watch();
        // startWatching();
        const watch_count = channel.state.watcher_count
        console.log("watcher count is", watch_count);
        if (watch_count == 2) {
            setPlayerNumber("P2")
            console.log("I am Player 2");
        } else {
            setPlayerNumber("P1")
            console.log("I am Player 1");
        }
    }
    let friendFind = async () => {
    let tempMember = channel.state.members;
    const member1 = Object.keys(tempMember)[0]
    const member2 = Object.keys(tempMember)[1]
    if (member1==userID) {
        const friend = await client.queryUsers({id:member2});
        console.log("friend", friend.users[0].Name)
        setFriend(friend.users[0].Name)
    } else {
        const friend = await client.queryUsers({id:member1});
        setFriend(friend.users[0].Name)
        console.log("friend", friend.users[0].Name)
    }
}
if (Flag2) {
    friendFind();
    setFlag2(false)    
}

if (friend) {
    return (<div className="PrevGameCardContainer">
    <h3>Game with {friend}</h3>
    <br/>
    <p>on {date} at {time}</p>
    {/* <br/> */}
    <button onClick={gotoGame} className="btn btn-outline-primary btn-sm"> Go to Game</button>
    </div>)
    }
}

export default PrevGameCard;