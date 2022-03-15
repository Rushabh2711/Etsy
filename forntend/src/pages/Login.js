import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';



const Login = (props) => {

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
               error={false} 
               variant="outlined" />
          </div>
          <div>
             <TextField id="password" 
             label="Password" 
             type="password" 
             variant="outlined" 
             margin="dense" />
         </div>
         <div>
         <Button style={{backgroundColor: "#000000", color: "#ffffff"}} variant="outlined">LogIn</Button>
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