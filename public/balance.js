function Balance(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [balance, setBalance] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ? (
        <>
        <BalanceForm  user={props.user} setShow={setShow} setStatus={setStatus} setBalance={setBalance}/> 
        </> ) : (
        <>
        {' '}
        <BalanceMsg balance={balance} setShow={setShow} setStatus={setStatus}/>
        </> )}
    />
  )
}
//the BalanceMsg component now receives the balance state as a prop from the parent Balance component. The BalanceMsg component then uses this prop to display the balance message and logs the balance value using console.log()

function BalanceMsg(props){
    const user = firebase.auth().currentUser;
  if (user !== null) {
    
    console.log('User balance:', props.balance);

  }
  return(<>
    <h5>Your Current Balance is ${props.balance}</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>)
}

function BalanceForm(props){
  //const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

  const user = firebase.auth().currentUser;

  if (user) {  
  function handle(){
    fetch(`/account/findOne/${user.email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(data.balance);
            props.setShow(false);
            props.setBalance(data.balance);
            console.log('JSON:', data);
            console.log(JSON.parse(data.balance));
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  return (<>
    User<br/>
    <h5>{user.email}</h5> 
    
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>)
} else {
  return(<>
    <p>Please login to check balance.</p>

  </>);
}

  
}

