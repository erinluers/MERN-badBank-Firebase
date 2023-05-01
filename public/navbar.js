function NavBar(props){
  <script src="logout.js" defer type="text/babel"></script>
  const onLogout = (()=> {
    props.setUser({});
    alert("You are now logged out");
    
  }) 

  
    return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>          
          <li className="nav-item ">
            <a id="logout" className="nav-link" href="#/logout/">Log Out</a>
          </li>  
        </ul>
      </div>
      
    </nav>

  );
}
//learned how to integrate logout/props into the nav https://github.com/Kieran-Dillon/badBankMongodb_firebaseAuth/blob/main/public/navbar.js