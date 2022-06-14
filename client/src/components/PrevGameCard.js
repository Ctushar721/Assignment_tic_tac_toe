import React, {useState} from "react";
import Cookies from "universal-cookie";
function PrevGameCard({client,channel,setChannel,PlayerNumber}) {
    const chnlID = channel.cid;
    const cookies = new Cookies();
    const userID = cookies.get("userId");
    const timeCreated = channel.data.created_at;
    const date = timeCreated.split("T")[0]
    const time = timeCreated.split("T")[1].split("Z")[0].split(".")[0]
    const [friend, setFriend] = useState(null);
    let [Flag2, setFlag2] = useState(true);
    function gotoGame() {
        setChannel(channel);
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
    <h1>Game with {friend}</h1>
    <p>on {date} at {time}</p>
    <button onClick={gotoGame}> Go to Game</button>
    </div>)
    }
}

export default PrevGameCard;