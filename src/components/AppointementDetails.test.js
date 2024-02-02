import React from 'react';
import { render, screen,fireEvent,waitFor} from '@testing-library/react';
import AppointmentDetails from './AppointmentDetails';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/react'
import axios from 'axios';
jest.mock('axios');



describe('AppointmentDetails component', () => {
  const mockAppointment = {
    _id: '123',
    title: 'Test Appointment',
    date: new Date('2024-01-31'),
    time: '10:00 AM',
  };
  const mockOnDelete = jest.fn();
  const mockOnUpdateAppointment = jest.fn();

  test('renders appointment details correctly', () => {
    render(
        <BrowserRouter>
        <AppointmentDetails appointment={mockAppointment} onDelete={mockOnDelete} onUpdateAppointment={mockOnUpdateAppointment} />
        </BrowserRouter>
    
    );

    const titleElement = screen.getByText(mockAppointment.title);
    const dateElement = screen.getByText('2024-01-31');
    const timeElement = screen.getByText('10:00 AM');

    expect(titleElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
  });

  test('opens link on click',()=>{
    render(
      <BrowserRouter>
      <AppointmentDetails appointment={mockAppointment} onDelete={mockOnDelete} onUpdateAppointment={mockOnUpdateAppointment} />
      </BrowserRouter>
  
  );

      
  const appointmentTitleLink = screen.getByRole('link', { name: /Test Appointment/i });

  fireEvent.click(appointmentTitleLink);

  expect(window.location.pathname).toBe('/api/123'); // Verify redirected URL
  

})




test('handles appointment deletion correctly', async () => {
  // ... (mocking implementation)

  render(
    
    <BrowserRouter>
        <AppointmentDetails appointment={mockAppointment} onDelete={mockOnDelete} onUpdateAppointment={mockOnUpdateAppointment} />
    </BrowserRouter>
    
  );

  // Find and click the delete button
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  // Wait for the "Deleting..." message to appear
  await waitFor(() => {
    expect(screen.getByText('Deleting...')).toBeInTheDocument();
  });

  // Wait for axios.delete to be called and complete
  await waitFor(() => {
    expect(axios.delete).toHaveBeenCalledWith(`/api/${mockAppointment._id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  // Assert that onDelete function is called with the correct appointment ID
  expect(mockOnDelete).toHaveBeenCalledWith(mockAppointment._id);

  // Wait for the "Deleting..." message to disappear
  await waitFor(() => {
    expect(screen.queryByText('Deleting...')).not.toBeInTheDocument();
  });
});
test('updates appointment successfully and handles success scenario', async () => {
  const mockResponse = { status: 200, data: { message: 'Appointment updated' } };
  axios.patch.mockResolvedValueOnce(mockResponse);

  // ... component rendering and setup
  const updateButton = screen.getByText(/Delete/i);




  // Use act to wrap async interactions within a simulated React environment
  await act(async () => {
    // Use userEvent for more natural user interactions
    await userEvent.click(updateButton);
  });

  // Assertions:
  await waitFor(() => {
    expect(axios.patch).toHaveBeenCalledWith(`/api/${appointment._id}`, {
      title: updatedTitle,
      date: updatedDate,
      time: updatedTime,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  expect(onUpdateAppointment).toHaveBeenCalledWith({
    _id: appointment._id,
    title: updatedTitle,
    date: updatedDate,
    time: updatedTime,
  });
  expect(setIsUpdating).toHaveBeenCalledWith(false);
  expect(console.log).toHaveBeenCalledWith('Appointment updated successfully');
  expect(console.log).toHaveBeenCalledWith(appointment);
});

  

});
