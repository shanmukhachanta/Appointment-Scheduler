import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders appointments and form', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // Wait for the asynchronous operation to complete
  const appointmentElement = await screen.findByTestId('user-number-0');
  console.log(appointmentElement);

  expect(appointmentElement).toBeInTheDocument();
});
