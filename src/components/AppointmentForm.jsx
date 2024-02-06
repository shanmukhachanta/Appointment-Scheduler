import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = ({ appointments, setAppointments }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const appointment = { title, date, time };

      try {
        const response = await axios.post(
          'https://appointment-scheduler.azurewebsites.net/api',
          appointment,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const json = response.data;

        if (response.status === 201 || response.status === 200) {
          setErrors({});
          setTitle('');
          setDate('');
          setTime('');
          console.log('New appointment added:', json);

          fetchAppointments();
        } else {
          setErrors({ server: json.error });
        }
      } catch (error) {
        console.error('Error adding appointment:', error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = 'Please enter an appointment title.';
    }

    if (!date.trim()) {
      errors.date = 'Please enter a date.';
    } else {
      const enteredDate = new Date(date);
      const currentDate = new Date();
      if (enteredDate < currentDate) {
        errors.date = 'Please enter a date in the future.';
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        errors.date = 'Please enter a valid date (YYYY-MM-DD).';
      }
    }

    if (!time.trim()) {
      errors.time = 'Please enter a time.';
    } else if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      errors.time = 'Please enter a valid time (HH:MM).';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        'https://appointment-scheduler.azurewebsites.net/api'
      );
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
      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
      id="title"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      placeholder="Enter appointment title"
      required
    />
    {errors.title && <div className="invalid-feedback text-danger">{errors.title}</div>}
  </div>

  <div className="mb-3">
    <label htmlFor="date" className="form-label">
      Date:
    </label>
    <input
      type="date"
      className={`form-control ${errors.date ? 'is-invalid' : ''}`}
      id="date"
      onChange={(e) => setDate(e.target.value)}
      value={date}
      placeholder="Select date"
      required
    />
   {errors.date && (
      <div className={`invalid-feedback ${errors.date ? 'text-danger' : ''}`}>
        {errors.date}
        {errors.date === 'Please enter a valid date.'}
      </div>
    )}
  </div>

  <div className="mb-3">
    <label htmlFor="time" className="form-label">
      Time:
    </label>
    <input
      type="time"
      className={`form-control ${errors.time ? 'is-invalid' : ''}`}
      id="time"
      onChange={(e) => setTime(e.target.value)}
      value={time}
      placeholder="Select time"
      required
    />
    {errors.time && <div className="invalid-feedback text-danger">{errors.time}</div>}
  </div>

  <button type="submit" className="btn btn-primary">
    Add Appointment
  </button>
  {errors.server && <div className="error">{errors.server}</div>}
</form>


  );
};

export default AppointmentForm;
