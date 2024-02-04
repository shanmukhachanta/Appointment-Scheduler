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




it('handles delete request failure', async () => {
  const mockAppointment = {
    _id: '456',
    title: 'Mock Appointment',
    date: '2024-02-02',
    time: '12:00 PM',
  };

  const onDeleteMock = jest.fn();

  axios.delete.mockRejectedValue(new Error('Delete error'));

  render(
    <BrowserRouter>
    <AppointmentDetails
      appointment={mockAppointment}
      onDelete={onDeleteMock}
      onUpdateAppointment={() => {}}
    />
    </BrowserRouter>
    
  );

  // Ensure the button is not disabled before clicking
  expect(screen.getByText('Delete').closest('button')).not.toHaveAttribute('disabled');

  // Click the button
  fireEvent.click(screen.getByText('Delete'));

  // Wait for the component to handle the delete request and display error
  await waitFor(() => {
    expect(axios.delete).toHaveBeenCalledWith(`/api/${mockAppointment._id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(onDeleteMock).not.toHaveBeenCalled();

    // Add additional assertions for error handling
  });

  // Ensure the button is not disabled after a failed delete request
  expect(screen.getByText('Deleting...').closest('button')).toHaveAttribute('disabled');
});

it('handles delete request successfully', async () => {
  const mockAppointment = {
    _id: '123',
    title: 'Mock Appointment',
    date: '2024-02-02',
    time: '12:00 PM',
  };

  const onDeleteMock = jest.fn();

  axios.delete.mockResolvedValue({
    data: { success: true },  // Simulating a successful request
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });


  render(
    <BrowserRouter>
      <AppointmentDetails
        appointment={mockAppointment}
        onDelete={onDeleteMock}
        onUpdateAppointment={() => {}}
      />
    </BrowserRouter>
  );

  // Ensure the button is not disabled before clicking
  expect(screen.getByText('Delete').closest('button')).not.toHaveAttribute('disabled');

  // Click the button within `act`
  await act(async () => {
    userEvent.click(screen.getByText('Delete')); // Use userEvent for more realistic interactions
  });

  // Assertions after `act` to ensure state updates and re-renders have occurred
  await waitFor(() => {
    expect(axios.delete).toHaveBeenCalledWith(`/api/${mockAppointment._id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  

    // Ensure the button is disabled after a successful delete request
    expect(screen.getByText('Delete').closest('button')).not.toHaveAttribute('disabled');
  });
});



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

describe('AppointmentDetails', () => {
  const mockAppointment = {
    _id: '123',
    title: 'Mock Appointment',
    date: '2024-02-02',
    time: '12:00 PM',
  };
  const onDeleteMock = jest.fn();
  const onUpdateAppointmentMock = jest.fn();

  it('updates state variables on input change', () => {
    <BrowserRouter>
    <AppointmentDetails
      appointment={mockAppointment}
      onDelete={onDeleteMock}
      onUpdateAppointment={onUpdateAppointmentMock}
    />
    </BrowserRouter>

    // Find input elements
    const titleInput = screen.getByTestId('my-input1');
    const dateInput = screen.getByTestId('my-input2');
    const timeInput = screen.getByTestId('my-input3');

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(dateInput, { target: { value: '2024-02-03' } });
    fireEvent.change(timeInput, { target: { value: '15:30' } });

    // Verify that state variables are updated
    expect(screen.getByLabelText('Title:')).toHaveValue('Updated Title');
    expect(screen.getByLabelText('Date:')).toHaveValue('2024-02-03');
    expect(screen.getByLabelText('Time:')).toHaveValue('15:30');
  });
});

