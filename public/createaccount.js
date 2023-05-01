function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  
  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  //const [balance, setBalance] = React.useState('');

  function handle(){
    console.log(name,email,password/* , balance */);
    /* const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })(); */
    //help with figuring out how to integrate firebase - https://github.com/Kieran-Dillon/badBankMongodb_firebaseAuth/blob/main/public/createaccount.js
    const auth = firebase.auth();
    //const database = firebase.database();
    const promise = auth.createUserWithEmailAndPassword(
      email,
      password
    );
    promise.then(()=> {
          //help connecting user info to realtime database from https://www.youtube.com/watch?v=b1ULt_No3IY
          // Declare user variable
        //const url = `/account/create/${name}/${email}/${password}/${balance}`;
        const url = `/account/create/${name}/${email}/${password}/`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })();
    });
    promise.catch((e) => console.log(e.message));
    props.setShow(false);
    promise.then(()=> {
      var user = auth.currentUser

        // Add this user to Firebase Database
        var database_ref = database.ref()

        // Create User data
        var user_data = {
          name: name,
          email : email,
          balance: 0,
          last_login : Date.now()
        }

        // Push to Firebase Database
        database_ref.child('users/' + user.uid).update(user_data)

        // Done
        alert('User Logged In!!')
        //
    });
    props.setShow(false);
  }    
  
  /* function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      balance: 0
    });
  } */
  return (<>
  <form>
    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      autoComplete="email"
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      autoComplete="new-password"
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>
</form>
  </>);
}