import React, { useState } from 'react';
import axios from 'axios';

function QuestionAnswerPage({ filesUploaded }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const handleAskQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:5000/ask', {
        question,
 // Pass your chain data here if needed
        history,
      });
      setAnswer(response.data.answer);
      setHistory(response.data.history);
    } catch (error) {
      setError('Error asking question');
    }
  };

  return (
    <div>
      <h1>Question and Answer Page</h1>
      <div>
        {filesUploaded ? (
          <div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
            />
            <button onClick={handleAskQuestion}>Ask</button>
            {answer && (
              <div>
                <h2>Answer:</h2>
                <p>{answer}</p>
              </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Conversation History:</h2>
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  <strong>Question:</strong> {item.question} <br />
                  <strong>Answer:</strong> {item.answer}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Please upload files first.</p>
        )}
      </div>
    </div>
  );
}

export default QuestionAnswerPage;
