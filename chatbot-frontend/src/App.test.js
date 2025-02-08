// src/App.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Chatbot Interface title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Chatbot Interface/i);
  expect(titleElement).toBeInTheDocument();
});

test('allows user to input and send a query', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Type your query here.../i);
  const sendButton = screen.getByText(/Send/i);

  // Simulate user typing a query
  fireEvent.change(inputElement, { target: { value: 'What is the weather today?' } });
  expect(inputElement.value).toBe('What is the weather today?');

  // Simulate clicking the send button
  fireEvent.click(sendButton);
  expect(inputElement.value).toBe('');

  // Since the API call is asynchronous, additional tests would require mocking the API response
});