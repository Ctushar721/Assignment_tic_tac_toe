import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import AllPreviousGames from "./AllPreviousGames";
import Cookies from "universal-cookie";
// import CustomInput from "./CustomInput";
function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext(); // context passing
  const [channel, setChannel] = useState(null);
  const [PlayerNumber, setPlayerNumber] = useState(null);
  const [Flag3, setFlag3] = useState(true);

  //stopwatching channel runs only once on start
  const cookies = new Cookies();
  const userID = cookies.get("userId");
  const stopWatchingAll = async () => {
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
    console.log("cureent active channels are", channelList.length)
    channelList.map(async (channel,idx)=>{const stopWatching = await channel.stopWatching();})
  }
  if (Flag3){
    stopWatchingAll();
    setFlag3(null);
  }





  const createChannel = async () => { //
    console.log(rivalUsername);
    const response = await client.queryUsers({Email:rivalUsername}); //

    if (response.users.length === 0) { //
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", { //
      members: [client.userID, response.users[0].id],
    });
    console.log("from joingame new channel is:", newChannel._data)
    await newChannel.watch(); //
    setChannel(newChannel); //
    const channelCreator = newChannel.data.created_by.Email;
    const watch_count = newChannel.state.watcher_count
    console.log("watcher count is", watch_count);
    if (watch_count == 2) {
      setPlayerNumber("P2")
      console.log("I am Player 2");
    } else {
      setPlayerNumber("P1")
      console.log("I am Player 1");
    }
  };
  //Input={CustomInput}
  return (
    <>
      {channel ? (
        <Channel channel={channel} > 
          <Game channel={channel} setChannel={setChannel} PlayerNumber={PlayerNumber} setPlayerNumber={setPlayerNumber} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Email of rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}> Join/Start Game</button>
          <AllPreviousGames client={client} channel={channel} setChannel={setChannel} PlayerNumber={PlayerNumber} setPlayerNumber={setPlayerNumber}/>
          {/* set channel as a prop */}
        </div>
      )}
    </>
  );
}

export default JoinGame;