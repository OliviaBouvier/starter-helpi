import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import OpenAI from "openai";

interface ChatGPTProps {
    apiKey: string;
}

export function ChatGPT({ apiKey }: ChatGPTProps): React.JSX.Element {
    const [message, setMessage] = useState<string>("");
    const [contents, setContents] = useState<string>("");
    const [response, setResponse] = useState<string>("");

    function updateMessage(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    async function handleChatGPTSubmission() {
        const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant who gives career advice." },
                    {
                        role: "user",
                        content: `${contents}`,
                    },
                ],
            });

            // Extract the response and set it in state
            if (completion.choices[0].message.content != null){
                setResponse(completion.choices[0].message.content);
            }
        } catch (error) {
            console.error("Error fetching completion:", error);
        }
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>ChatGPT input: </Form.Label>
                <Form.Control value={message} onChange={updateMessage} />
            </Form.Group>
            <Button onClick={() => {
                    setContents(message);
                    handleChatGPTSubmission();
                }}>Submit to ChatGPT</Button>
        
        <p>{response}</p>
        </div>
    );
}