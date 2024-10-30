import React, { useState } from "react";
import { Button, Spinner, Alert} from "react-bootstrap";
import OpenAI from "openai";

interface ChatGPTProps {
    apiKey: string;
    chatGPTcontents: string;
}

export function ChatGPT({ apiKey, chatGPTcontents }: ChatGPTProps): React.JSX.Element {
//    const [message, setMessage] = useState<string>("");
//    const [contents, setContents] = useState<string>(chatGPTcontents);
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    // function updateMessage(event: React.ChangeEvent<HTMLInputElement>) {
    //     setMessage(event.target.value);
    // }

    async function handleChatGPTSubmission() {
        const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant" },
                    {
                        role: "user",
                        content: `Create a report describing a potential career for me with format: 
                        "career name
                        career description
                        why the user is suited to this career
                        similar careers"
                        based on the following: ${chatGPTcontents}`,
                    },
                ],
            });

            // Extract the response and set it in state
            if (completion.choices[0].message.content != null){
                setResponse(completion.choices[0].message.content);
            }
            setSubmitted(true);
        } catch (error) {
            console.error("Error fetching completion:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {/* <Form.Group>
                <Form.Label>ChatGPT input: </Form.Label>
                <Form.Control value={message} onChange={updateMessage} />
            </Form.Group> */}
            {/* <div>Submitting to ChatGPT: {ChatGPTContents()}</div> */}
            <Button onClick={() => {
                    //setContents(message);
                    handleChatGPTSubmission();
                }}
                disabled ={loading}
                >
                    {loading ? <Spinner as ="span" animation="border" size="sm" /> : "Submit to ChatGPT"}
                    </Button>
                
                {submitted && (
                    <Alert variant="success" className="mt-3">
                        Response successfully recorded!
                    </Alert>
                )}
        
        <pre>{response}</pre>
        </div>
    );
}