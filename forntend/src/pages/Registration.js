import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import STRINGS from '../constant';
import axios from 'axios';
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/mutations";



const Registration = (props) => {

  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [createUser, { error }] = useMutation(REGISTER_USER);


  const handleRegistration = () => {
    if(username === "" || email === "" || password === "") {
      setIsError(true);
      return;
    }
    createUser({
      variables: {
        email: email,
        password: password,
        username: username
      },
    });
    var data = {
      username,
      password,
      email
    };
    // axios.post(STRINGS.url+'/register',data)
    //     .then(response => {
    //         console.log("Status Code : ",response.data);
    //         if(response.status === 200){
    //           props.handleClose()
    //           setIsError(false);
    //           props.loginOpen();
    //         }else{
    //           setIsError(true);
    //         }
    //     }).catch(c => {
    //       setIsError(true);
    //     });
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
          onClose={() => {props.handleClose(); setIsError(false);}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form">
            <div>
               <h4>Registration</h4>
            </div>
            <div>
             <TextField id="Email" 
               label="Email"
               error={isError} 
               variant="outlined"
               margin="dense"
               onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
             <TextField id="username" 
               label="Username"
               error={false} 
               variant="outlined"
               margin="dense"
               onChange={(e) => setUsername(e.target.value)} />
          </div>
          
          <div>
             <TextField id="password" 
             label="Password" 
             type="password" 
             variant="outlined" 
             margin="dense"
             onChange={(e) => setPassword(e.target.value)} />
         </div>
         <div>
         <Button style={{backgroundColor: "#000000", color: "#ffffff"}} variant="outlined" onClick={() => handleRegistration()}>Registration</Button>
         </div>
          </Box>
        </Modal>
      </div>
    );
 }

 export default Registration;