import React from 'react';
import {useState} from 'react';
import axios from 'axios';


const AppointmentForm = ({appointments,setAppointments}) => {
  const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [error, setError] = useState(null)
    
    


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const appointment = { title, date, time };
    
      try {
        const response = await axios.post('https://appointment-scheduler.azurewebsites.net/api', appointment, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
        const json = response.data;
    
        if (response.status === 201 || response.status === 200) {
          // Clear errors and form fields on successful update
          setError(null);
          setTitle('');
          setDate('');
          setTime('');
          console.log('New appointment added:', json);
    
          // Fetch updated appointments after adding a new one
          fetchAppointments();
        } else {
          setError(json.error);
        }
      } catch (error) {
        console.error('Error adding appointment:', error);
      }
    };
    
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://appointment-scheduler.azurewebsites.net/api');
        const json = response.data;
    
        if (response.status === 200) {
          setAppointments(json);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

  return (
    <form className="create needs-validation" onSubmit={handleSubmit} noValidate>
      <h3>Add a New Appointment</h3>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Appointment Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <div className="invalid-feedback">Please enter an appointment title.</div>
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date:
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          required
        />
        <div className="invalid-feedback">Please enter a valid date.</div>
      </div>

      <div className="mb-3">
        <label htmlFor="time" className="form-label">
          Time:
        </label>
        <input
          type="time"
          className="form-control"
          id="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
          required
        />
        <div className="invalid-feedback">Please enter a valid time.</div>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Appointment
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AppointmentForm;