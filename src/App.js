
import './App.css';
let eventList=[["Company party","2023-10-31","Building A"],["Company meeting","2025-10-31","Building B"]];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to event planner</p>
        <div id="loginSection">
          <label for="lgemail">E-mail Address</label>
          <input type="text" id="lgemail" placeholder="example@mail.com"></input>
          <br></br>
          <label for="lgpass">Password</label>
          <input type="password" id="lgpass"></input>
          
          <button id="lgbtn" onClick={signinDisplayChange}>Sign in</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>

        <div id="eventsDisplay" style={{display: "none" }}>
        <p>Event list</p>
   <table id="eventTable">
      <thead>
      <tr>
         <th> Name </th>
         <th> Date </th>
         <th> Place </th>
      </tr>
      </thead>
      <tbody>
         <tr>
         </tr>
         <tr>
         </tr>
         <tr>
         </tr>
      </tbody>
   </table>
   <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        </div>

      {/* Show this div if login is admin */}
      <div id="addEvent" style={{display: "none" }}>
        <p>Add Events here</p>
        <label for="lgemail">Event Name</label>
        <input type="text" id="addEventName" placeholder=""></input>
        <br></br>
				<label for="lgpass">Event Date</label>
				<input type="date" id="addEventDate"></input>
        <br></br>
				<label for="lgpass">Event Place</label>
				<input type="text" id="addEventPlace"></input>
        <br></br>
        <button id="addEventBtn">Add event</button>
      </div>

      </header>

    </div>
  );
}

function signinDisplayChange(){
  //Login section dissappears when clicked and shows the event table
  let x =document.getElementById("loginSection");
  x.style.display="none";

  //Should have different if statements displaying users functions. example if admin show add event section, dont do that if employee
  let y =document.getElementById("eventsDisplay");
  y.style.display="block";
  let z =document.getElementById("addEvent");
  z.style.display="block";



  let eventTable = document.getElementById("eventTable");
  //Should loop through the database
  for (let index = 0; index < eventList.length; index++) {
    let row = eventTable.insertRow(-1);
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    c1.innerText = eventList[index][0];
    c2.innerText = eventList[index][1];
    c3.innerText = eventList[index][2];
  }
}

export default App;
