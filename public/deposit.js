function Deposit(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [amount, setAmount] = React.useState('');
  //const [balance, setBalance] = React.useState('');

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        //add in props and setAmount
        <DepositForm user={props.user} setShow={setShow} setStatus={setStatus} setAmount={setAmount}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Deposit Successful</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  //const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  //const [balance, setBalance] = React.useState('');
  const user = firebase.auth().currentUser;

  
if (user) {
  function handle(){
    const email = user.email;
    //const balance = user.balance;
    //fetch(`/account/update/${email}/${amount}/${balance}`)
    fetch(`/account/update/${email}/${amount}/`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            //props.setBalance(JSON.parseInt(data.balance));
            console.log('JSON:', data);
            console.log('Deposit amount:', JSON.parse(amount));
            //console.log(JSON.parseInt(data.amount));
            //console.log(JSON.parseInt(data.balance));
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }})
  
    /* .then(()=> {
          // Add this user to Firebase Database
            var database_ref = database.ref()
            
            // Create User data
            var user_data = {
              balance: {amount},
            }
    
            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)
           
            // Done
            alert('Your deposit was successful!!')
            //
        });   */
    }

  return(<>
    User:<br/>
    <h5>{user.email}</h5> 
          
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
} else {
  return(<>
    <p>Please login to make a deposit.</p>

  </>);
}

  
}