// IndividualComponents.test.js
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import IndividualComponents from './IndividualComp';

jest.mock('axios');

describe('IndividualComponents', () => {
  const mockedAppointmentData = {
    id: '1',
    title: 'Test Appointment',
    date: '2024-02-03',
    time: '10:00 AM',
  };

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockedAppointmentData });
  });

  it('renders loading state initially', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/appointments/1" element={<IndividualComponents />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/1');
    });
  });

  it('renders appointment details after loading', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/appointments/1" element={<IndividualComponents />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Appointment')).toBeInTheDocument();
      expect(screen.getByText('Date: 2/3/2024')).toBeInTheDocument(); // Update the expected date format based on your locale
      expect(screen.getByText('Time: 10:00 AM')).toBeInTheDocument();
    });
  });

  it('renders error message if fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/appointments/1" element={<IndividualComponents />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
    });
  });

  it('renders "No appointment found" if no appointment data', async () => {
    axios.get.mockResolvedValueOnce({ data: null });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/appointments/1" element={<IndividualComponents />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No appointment found with the specified ID.')).toBeInTheDocument();
    });
  });
});
