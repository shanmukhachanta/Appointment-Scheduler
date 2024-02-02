import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import '@testing-library/react'
import '@testing-library/jest-dom';


test('renders welcome page by default', () => {
  render(

      <App />

  );

  const welcomeText = screen.getByText(/Welcome/i);
  expect(welcomeText).toBeInTheDocument();
});

test('renders home page when navigating to /create', () => {
  render(

        <App />
    
      
  );

  const homeText = screen.getByRole('link', { name: /create/i });
  expect(homeText).toBeInTheDocument();
});



