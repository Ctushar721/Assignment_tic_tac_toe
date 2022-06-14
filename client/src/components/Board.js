import React, {useState, useEffect} from "react";
import Square from "./Square";
import { useChannelStateContext, Channel, useChatContext} from "stream-chat-react";
import { Patterns } from "../WinningPatterns";
function Board({ result, setResult, PlayerNumber}) {
    const [board,setBoard] = useState(["","","","","","","","",""])
    const [player,setPlayer] = useState("P1");
    // console.log("player",player);
    const [turn,setTurn] = useState("P1");
    const {channel} = useChannelStateContext();
    console.log(channel);
    const {client} = useChatContext();
    useEffect(() => {
        checkIfTie();
        checkWin();
      }, [board]);

    const chooseSquare = async (square) => {
        if (turn === player && board[square] === "") {
            setTurn(player === "P1" ? "P2" : "P1");
            await channel.sendEvent({
              type: "game-move",
              data: { square, player },
            });
            setBoard(
              board.map((val, idx) => {
                if (idx === square && val === "") {
                  return "X"
                  // return (player === "P1" ? "X" : "O");
                }
                return val;
              })
            );
          }
    }; 
    const checkWin = () => {
        Patterns.forEach((currPattern) => {
          const firstPlayer = board[currPattern[0]];
          if (firstPlayer == "") return;
          let foundWinningPattern = true;
          currPattern.forEach((idx) => {
            if (board[idx] != firstPlayer) {
              foundWinningPattern = false;
            }
          });
    
          if (foundWinningPattern) {
            setResult({ winner: board[currPattern[0]], state: "won" });
          }
        });
      };
    
      const checkIfTie = () => {
        let filled = true;
        board.forEach((square) => {
          if (square == "") {
            filled = false;
          }
        });
    
        if (filled) {
          setResult({ winner: "none", state: "tie" });
        }
      };
      // this is responsible for board change on both sides
    channel.on((event)=>{ 
        if (event.type === "game-move" && event.user.id !== client.userID) {
            // console.log("board.js line 30", client.userID)
            const currentPlayer = event.data.player === "P1" ? "P2" : "P1";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            setBoard(
              board.map((val, idx) => {
                if (idx === event.data.square && val === "") {
                  return "O"
                }
                return val;
              })
            );
          }
    })

    return (
        <div className="board">
            <div className="row">
                <Square chooseSquare={()=> {chooseSquare(0)}} val={board[0]}/>
                <Square chooseSquare={()=> {chooseSquare(1)}} val={board[1]}/>
                <Square chooseSquare={()=> {chooseSquare(2)}} val={board[2]}/>
            </div>

            <div className="row">
                <Square chooseSquare={()=> {chooseSquare(3)}} val={board[3]}/>
                <Square chooseSquare={()=> {chooseSquare(4)}} val={board[4]}/>
                <Square chooseSquare={()=> {chooseSquare(5)}} val={board[5]}/>
            </div>

            <div className="row">
                <Square chooseSquare={()=> {chooseSquare(6)}} val={board[6]}/>
                <Square chooseSquare={()=> {chooseSquare(7)}} val={board[7]}/>
                <Square chooseSquare={()=> {chooseSquare(8)}} val={board[8]}/>
            </div>

        </div>
    )


}

export default Board;