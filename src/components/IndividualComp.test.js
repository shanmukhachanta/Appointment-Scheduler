// IndividualComponents.test.js
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import IndividualComponents from './IndividualComp';

jest.mock('axios');

describe('IndividualComponents', () => {
  test('fetches appointment data and displays it', async () => {
    jest.setTimeout(60000);
    axios.get.mockResolvedValueOnce({
      data: {
        id: '1',
        title: 'Appointment Title',
        date: '2024-02-01',
        time: '12:00',
      },
    });
    render(
      <BrowserRouter>
        <IndividualComponents />
      </BrowserRouter>
    );

    await waitFor(() => screen.findByText('Appointment Title'), { timeout: 15000 });

    expect(screen.getByText('Appointment Title')).toBeInTheDocument();
    expect(screen.getByText('Date: 2/1/2024')).toBeInTheDocument();
    expect(screen.getByText('Time: 12:00')).toBeInTheDocument();
  });


});
