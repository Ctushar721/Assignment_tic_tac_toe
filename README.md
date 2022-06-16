![Multiplayer Tic-Tac-Toe Game-banner](https://user-images.githubusercontent.com/105023001/174017773-1df6a288-2504-427b-963f-7a9aa69c4ddd.png)
# Multiplayer Game using Stream API
## Introduction
- This project aims to build a Multiplayer Tic-Tac-Toe Game using [Stream Chat API](https://getstream.io/chat/docs/) with features like:
	* List of Previous Games.
	* Start a game by just entering email of opponent.
	* Game creator gets the first chance
	* Alert if opponent disconnects the game in between.
	* Login once and use as many times as you want until logout.
- The app is built using React Js and Express.
## Online Site
- To play this game visit [Game](https://tinfinity-deploy1.herokuapp.com/) 
- You just need to Signup and start playing.
## About Project
- I have used Stream Chat API to create a channel so that users can connect and play online. We could also use Socket but Stream chat has slightly better documentation and a lot of games have a live chat feature which I plan to integrate here, so that would be easier with Stream Chat. 
- Winning Logic: On observing various possibilities we can come to conclusion that there are only 8 patterns by which a game can reach decisive state.
- We have created a components folder in which we place components such as
	* Board.js (Renders the Board using Squares Component)
	* Squares.js (This is the individual square with method calls onClick)
	* Game.js (This component renders Board or Waiting to Join Status based on state of users in channel)
	* JoinGame.js (It shows Join game stage or Game component based on if the user has requested to join a game or not)
	* PreviousGameCard.js (It contains information regarding previous games of user.)
- For Server I have used Node Js with Express to create it. 
	* Server caters to API calls at two routes `/login` and `/signup`
	* It generates a token and sends back response to Client.
	* Client then saves the user data in cookies to start a session.
- I have used React hooks at various stages some key states are about
	* `isAuth` to check if user is authenticated or not
	* `channel` to check the state of channel and watchers count
	*  `result` If the game has concluded.
	* and many more...
- The application is deployed on heroku.
## Challenges 
- While making this project I faced a few challenges, I have documented them here along with the solutions to them. 
[Link](https://docs.google.com/document/d/1Oo2B2yvrw70hNhjE9tT48lbXn7yvB0x7MCvpiRGbbqE/edit#)

