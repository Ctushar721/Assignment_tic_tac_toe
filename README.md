![Multiplayer Tic-Tac-Toe Game-banner](https://user-images.githubusercontent.com/105023001/174017773-1df6a288-2504-427b-963f-7a9aa69c4ddd.png)
# Multiplayer Game using Stream API
## Introduction
- This project aims to build a Multiplayer Tic-Tac-Toe Game using [Stream Chat API](https://getstream.io/chat/docs/) with features like:
	* List of Previous Games.
	* Start a game by just entering email of opponent.
	* Game creator gets the first chance
	* Alert if opponent disconnects the game in between.
- The app is built using React Js and Express.
## Online Site
- To play this game visit [Game](https://tinfinity-deploy1.herokuapp.com/) 
- You just need to Signup and start playing.
## About Project
- I have used Stream Chat API to create a channel so that users can connect and play online. We could also use Socket but Stream chat has slightly better documentation and a lot of games have a live chat feature which I plan to integrate here, so that would be easier with Stream Chat. 
- Winning Logic: On observing various possibilities we can come to conclusion that there are only 9 patterns by which a game can reach decisive state.![Pattern Image](blob:https://carbon.now.sh/76e12aae-16b7-4354-bcb2-b9298eb98efe)
- 
