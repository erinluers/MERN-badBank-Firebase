function Logout(props){
    //const [show, setShow]     = React.useState(true);
    //const [status, setStatus] = React.useState('');    
    firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
      console.log("User logged out");
    }).catch((error) => {
      // An error happened.
    });
      
      return (<>
      <h5>You've been logged out!</h5>
    </>);
  }
