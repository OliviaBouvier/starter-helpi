import React, { useState } from 'react';
import './App.css';
import { Button, Form, Navbar } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
//import logo from './logo.svg';
import {Home} from "./pages/home";
import {BasicQuestions} from "./pages/basicQuestions";
import {DetailedQuestions} from "./pages/detailedQuestions";
import {BasicButton} from "./components/basicButton";
import {DetailedButton} from "./components/detailedButton";
import {NavBarElements} from "./components/NavBar/NavBarElements"
import { ChatGPT } from './components/chatgpt';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <div className="App">
      <Router>
            <Navbar />
              <NavBarElements />
            <Routes>
                <Route path="/starter-helpi/" element={
                  <>
                    <Home /> 
                    <div>
                      <header className="App-header">  
                        <BasicButton />
                      </header> 
                      <header className="App-header">  
                        <DetailedButton />
                      </header>
                    </div>
                  </>
                } />
                <Route
                    path="/basicQuestions"
                    element={<BasicQuestions />}
                />
                <Route
                    path="/detailedQuestions"
                    element={<DetailedQuestions />}
                />
            </Routes>
        </Router>
        <ChatGPT apiKey={key} />
       <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default App;