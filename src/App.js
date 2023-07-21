
import './App.css';

import { API } from "aws-amplify";
import { createEvent } from './graphql/mutations';

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ListEvent from "./components/ListEvent.js"

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="App">
      <header className="App-header">
        <p>Event Planner V1.0</p>
        <div id="loginSection">
          <label>E-mail Address</label>
          <input type="text" id="lgemail" placeholder="example@mail.com"></input>
          <br></br>
          <label>Password</label>
          <input type="password" id="lgpass"></input>
          <br></br>
          <label>Name</label>
          <input type="text" id="lgname"></input>
          
          <button id="lgbtn" onClick={signinDisplayChange}>Sign in</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>

        <div id="eventsDisplay" style={{display: "none" }}>
        <p>Event list</p>
        <div id="listEventDiv">
          <ListEvent />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        </div>

      {/* Show this div if login is admin */}
      <div id="addEvent" style={{display: "none" }}>
        <p>Add Events:</p>
        <label>Event Name</label>
        <input type="text" id="addEventName" placeholder=""></input>
        <br></br>
        <label>Event Description</label>
        <input type="text" id="addEventDesc" placeholder=""></input>
        <br></br>
				<label>Event Date</label>
        <DatePicker selected={date} onChange={date => setDate(date)}
        showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" />
        <br></br>
				<label>Event Duration</label>
				<input type="number" id="addEventDur" defaultValue={0}></input>
        <br></br>
        <label>Event Required?</label>
				<input id="addEventReq" type="checkbox"/>
        <br></br>
        <button onClick={() => {addEventForm(date, getInput("lgname"))}} id="addEventBtn">Add event</button>
      </div>

      </header>

    </div>
  );
}

function getInput(id) {
  return document.getElementById(id).value;
}

async function addEventForm(date, userName) {
  try {
    await API.graphql({
      query: createEvent,
      variables: {
          input: {
          "name": getInput("addEventName"),
          "description": getInput("addEventDesc"),
          "startTime": date.toISOString(),
          "durationMinutes": getInput("addEventDur"),
          "isRequired": document.getElementById("addEventReq").checked,
          "managedBy": userName
        }
      }
    });
  } catch(e) {
    console.error(e);
  }

  //Refresh table

}

async function signinDisplayChange(){
  //Login section dissappears when clicked and shows the event table
  let x =document.getElementById("loginSection");
  x.style.display="none";

  //Should have different if statements displaying users functions. example if admin show add event section, dont do that if employee
  let y =document.getElementById("eventsDisplay");
  y.style.display="block";
  
  let z =document.getElementById("addEvent");

  if (getInput("lgemail").includes("admin")) {
    
    z.style.display="block";    
  }else{
    z.style.display="none"
  }

}

export default App;