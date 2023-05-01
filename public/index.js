function Spa() {
  const [user, setUser] = React.useState({});
  return (
    <HashRouter>
      <div>
        <NavBar setUser={setUser} user={user}/>        
        {/* <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}> */}
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/logout/" component={Logout} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        {/* </UserContext.Provider> */}
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
//helpful info on getting user inserted from https://github.com/Kieran-Dillon/badBankMongodb_firebaseAuth/blob/main/public/index.js