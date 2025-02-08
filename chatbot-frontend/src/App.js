// src/App.js

function App() {
  React.useEffect(() => {
    alert("App Loaded");
  }, []);

  const [query, setQuery] = React.useState('');
  const [responses, setResponses] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user query to responses
    setResponses([...responses, { sender: 'user', text: query }]);

    try {
      const res = await axios.post('http://localhost:5000/query', { query });
      setResponses([...responses, { sender: 'user', text: query }, { sender: 'bot', text: res.data.response }]);
      setQuery('');
    } catch (error) {
      setResponses([...responses, { sender: 'user', text: query }, { sender: 'bot', text: 'Error processing your request.' }]);
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Chatbot Interface</h1>
      <div className="chat-container">
        {responses.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));