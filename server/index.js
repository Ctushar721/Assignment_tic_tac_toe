import express, { response } from "express";
import cors from "cors";
import {StreamChat} from "stream-chat";
import {v4 as uuidv4} from "uuid";
import bcrypt from 'bcrypt';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3001
const app = express();
app.use(express.static(publicPath))
app.use(cors());
app.use(express.json());

const api_key = "5vh7wd3hwgx9";
const api_secret = "zn2j87byaanphgq9ayhsg9ddvm28hnayevy2wgfenwqz9g69rk7gq59ksmppjehy"
const serverClient = StreamChat.getInstance(api_key, api_secret);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

//Signup
app.post('/signup',async (req,res)=>{
    try {
    const {Name, Email, Password} = req.body;
    const userId = uuidv4(); // chances of collision 10^-37
    const hashedPassword = await bcrypt.hash(Password,10);
    const token = serverClient.createToken(userId);
    res.send({token, userId, Name, Email, hashedPassword} );
    } 
    catch(error) {
        res.json(error)
    }
});


//Login
app.post('/login', async (req,res)=>{
    try {
    const {Email, Password} = req.body;
    const {users} = await serverClient.queryUsers({Email:Email});
    if (users.length === 0) {return res.send('User Not forund')};
    const token = serverClient.createToken(users[0].id);
    const passwordmatch = await bcrypt.compare(Password,users[0].hashedPassword);

    if (passwordmatch) {
        // console.log("pass matched")
        res.json({
            token,
            Name: users[0].Name,
            Email: Email,
            userId: users[0].id
        })
    }}
    catch (error) {
        res.json(error);
      }
});











app.listen(PORT, ()=> {console.log("Server started on port 3001")})
