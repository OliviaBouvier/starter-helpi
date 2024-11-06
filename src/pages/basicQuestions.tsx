import { Button, Form } from "react-bootstrap";
import { BasicRadioButtons } from "../components/BasicQuestionRBOne";
import { useState } from "react";

export function BasicQuestions() {
    let keyData = "";
        const saveKeyData = "MYKEY";
        const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
        if (prevKey !== null) {
            keyData = JSON.parse(prevKey);
        }
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
            
        <div>
        <h1>Basic Questions</h1>
        <p>A simplified version of the quiz containing only multiple choice questions. There is no time limit.</p>
        <BasicRadioButtons apiKey={key}/>
        <Form>
            <Form.Label>API Key:</Form.Label>
            <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
            <br></br>
            <Button className="Submit-Button" onClick={handleSubmit}>Submit API key</Button>
        </Form>
        </div>
    );
}