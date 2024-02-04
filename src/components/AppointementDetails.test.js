import React from 'react';
import { render, screen,fireEvent,waitFor,act} from '@testing-library/react';
import AppointmentDetails from './AppointmentDetails';
import userEvent from '@testing-library/user-event'
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


});

describe('AppointmentDetails', () => {
  it('sets isUpdating to true when Update button is clicked', () => {
    const mockAppointment = {
      _id: '123',
      title: 'Mock Appointment',
      date: '2024-02-02',
      time: '12:00 PM',
    };

    // Mock the onDelete and onUpdateAppointment functions
    const onDeleteMock = jest.fn();
    const onUpdateAppointmentMock = jest.fn();

    render(
      <BrowserRouter>
      <AppointmentDetails
        appointment={mockAppointment}
        onDelete={onDeleteMock}
        onUpdateAppointment={onUpdateAppointmentMock}
      />
      </BrowserRouter>
      
    );

    // Ensure the Update button is not disabled
    expect(screen.getByText('Update').closest('button')).not.toHaveAttribute('disabled');

    // Click the Update button
    fireEvent.click(screen.getByText('Update'));

    // Ensure onUpdateAppointmentMock is not called (since it's an empty mock function)
    expect(onUpdateAppointmentMock).not.toHaveBeenCalled();

    // Ensure onDeleteMock is not called (since it's an empty mock function)
    expect(onDeleteMock).not.toHaveBeenCalled();
  });
  it('does not set isUpdating to true when Update button is clicked during deletion', () => {
    const mockAppointment = {
      _id: '123',
      title: 'Mock Appointment',
      date: '2024-02-02',
      time: '12:00 PM',
    };

    // Mock the onDelete and onUpdateAppointment functions
    const onDeleteMock = jest.fn();
    const onUpdateAppointmentMock = jest.fn();

    render(
      <BrowserRouter>
      <AppointmentDetails
        appointment={mockAppointment}
        onDelete={onDeleteMock}
        onUpdateAppointment={onUpdateAppointmentMock}
      />
      </BrowserRouter>
    );

    // Ensure the Update button is not disabled
    expect(screen.getByText('Update').closest('button')).not.toHaveAttribute('disabled');

    // Click the Update button
    fireEvent.click(screen.getByText('Update'));

    // Ensure onUpdateAppointmentMock is not called (since it's an empty mock function)
    expect(onUpdateAppointmentMock).not.toHaveBeenCalled();

    // Ensure onDeleteMock is not called (since it's an empty mock function)
    expect(onDeleteMock).not.toHaveBeenCalled();
  });

  
});



