// AppointmentForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';

jest.mock('axios');

describe('AppointmentForm', () => {
  test('submits form and adds new appointment', async () => {
    const setAppointmentsMock = jest.fn();

    render(<AppointmentForm appointments={[]} setAppointments={setAppointmentsMock} />);

    // Mock the axios.post method to return a specific response
    axios.post.mockResolvedValueOnce({
      status: 201,
      data: { id: '1', title: 'New Appointment', Date: '2024-02-01', Time: '12:00' },
    });

    // Fire events to change form inputs
    fireEvent.change(screen.getByText('New Appointment'), { target: { value: 'New Appointment' } });
    fireEvent.change(screen.getByText('Date:'), { target: { value: '2024-02-01' } });
    fireEvent.change(screen.getByText('Time:'), { target: { value: '12:00' } });

    // Fire event to submit the form
    fireEvent.click(screen.getByText('Add Appointment'));

    // Assert that UI reflects the changes
    expect(screen.getByText('New Appointment')).toBeInTheDocument();
    expect(screen.getByText('Date: 2/1/2024')).toBeInTheDocument();
    expect(screen.getByText('Time: 12:00')).toBeInTheDocument();

    // Verify that setAppointmentsMock was called with the correct arguments
    expect(setAppointmentsMock).toHaveBeenCalledWith([{ id: '1', title: 'New Appointment', date: '2024-02-01', time: '12:00' }]);
  });

  // Add more tests for form validation, error handling, etc.
});
