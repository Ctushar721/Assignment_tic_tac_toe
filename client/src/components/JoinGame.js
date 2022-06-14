import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
// import CustomInput from "./CustomInput";
function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext(); // context passing
  const [channel, setChannel] = useState(null);
  const [PlayerNumber, setPlayerNumber] = useState(null);
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
    
    if (channelCreator == rivalUsername) {
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
          <Game channel={channel} setChannel={setChannel} PlayerNumber={PlayerNumber} />
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
        </div>
      )}
    </>
  );
}

export default JoinGame;