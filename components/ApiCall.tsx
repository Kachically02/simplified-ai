import React, { useState } from "react";
import axios from "axios";

// Define a component that makes an OpenAI API call
function apiCall() {
  // Define the state variables for the input, output, and error
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Define a function that handles the submit event
  const handleSubmit = async (e: any) => {
    // Prevent the default behavior of the form
    e.preventDefault();

    // Clear the output and error state
    setOutput("");
    setError("");

    // Check if the input is empty
    if (!input) {
      // Set the error state to "Please enter some text"
      setError("Please enter some text");
      return;
    }

    // Define the API endpoint and parameters
    // Use the chat endpoint and the gpt-3.5-turbo model
    const url = "https://api.openai.com/v1/chat/completions";
    const params = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
      temperature: 0.7,
    };

    // Define the API headers with your secret API key
    // Note: This exposes your API key in client-side code!
    // Do not do this in production use!


    const key = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    const headers = {
      Authorization: `Bearer ${key}`,
    };

    try {
      // Make a POST request to the API endpoint with the parameters and headers
      const response = await axios.post(url, params, { headers });

      // Check if the response has data
      if (response.data) {
        // Get the text from the response data
        const text = response.data.choices[0].message.content;

        // Set the output state to the text
        setOutput(text);
      } else {
        // Set the error state to "No data received"
        setError("No data received");
      }
    } catch (err: any) {
      // Set the error state to the error message
      setError(err.message);
    }
  };

  return (
    <div className="OpenAI">
      <h1>OpenAI API Demo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Enter some text:</label>
        <input
          id="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {output && <p>Output: {output}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default apiCall;
