import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import STRINGS from '../constant';
import axios from 'axios';
import { signin, userLogin } from '../actions';
import { useQuery } from "@apollo/client";
import { LOGIN } from "../graphql/queries";



const Login = (props) => {

  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const LoggedInUSer = useSelector(state => state.LoggedInUSer);
  const dispatch = useDispatch();


  const handleLogin = () => {
    if(username === "" || password === "") {
      setIsError(true);
      return;
    }
    var data = {
      username,
      password
    }
    axios.post(STRINGS.url+'/login',data)
        .then(response => {
            console.log("Status Code : ",response);
            if(response.status === 200){
                props.handleClose();
                dispatch(userLogin({...response.data}));
                dispatch(signin(response.data._id));
                localStorage.setItem("userId", JSON.stringify(response.data));
            }else{
                setIsError(true);
            }
        }).catch(c => {
          setIsError(true);
        });

  }

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
 
  
    return (
      <div>
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form">
            <div>
               <h4>Sign In</h4>
            </div>
          <div>
             <TextField id="username" 
               label="Username"
               error={isError} 
               variant="outlined"
               onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
             <TextField id="password" 
             label="Password" 
             type="password" 
             error={isError} 
             variant="outlined" 
             margin="dense"
             onChange={(e) => setPassword(e.target.value)} />
         </div>
         <div>
         <Button style={{backgroundColor: "#000000", color: "#ffffff"}} variant="outlined" onClick={handleLogin}>LogIn</Button>
         </div>
        <Link
            component="button"
            variant="body2"
            onClick={props.handleRegistrationClick}
            style={{ color: "#000000"}}
         >
         Register your self
         </Link>
          </Box>
        </Modal>
      </div>
    );
 }

 export default Login;