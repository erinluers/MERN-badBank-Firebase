//just integrating props/amount and setamount like in this example: https://github.com/Kieran-Dillon/badBankMongodb_firebaseAuth/blob/main/public/withdraw.js

function Withdraw(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [amount, setAmount] = React.useState(''); 

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm user={props.user} setShow={setShow} setStatus={setStatus} setAmount={setAmount}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Withdraw successfully</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  //const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  const user = firebase.auth().currentUser;

  if (user) {  
  function handle(){
    const email = user.email;
    fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
            console.log('Withdraw amount:',JSON.parse(amount));
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }


  return(<>
    User<br/>
    <h5>{user.email}</h5> 
    {/* Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/> */}

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
} else {
  return(<>
    <p>Please login to withdraw money.</p>

  </>);
}

  
}
