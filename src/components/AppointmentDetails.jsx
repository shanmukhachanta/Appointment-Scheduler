import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, Route,Routes } from 'react-router-dom';
import IndividualComponents from './IndividualComp';


const AppointmentDetails = ({ appointment, onDelete,onUpdateAppointment }) => {
  const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(appointment.title);
  const [updatedDate, setUpdatedDate] = useState(appointment.date);
  const [updatedTime, setUpdatedTime] = useState(appointment.time);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUpdatedTitle(appointment.title);
    setUpdatedDate(appointment.date);
    setUpdatedTime(appointment.time);
    console.log('New appointment:', appointment);
  }, [appointment]);
  

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`https://appointment-scheduler.azurewebsites.net/api/${appointment._id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        onDelete(appointment._id);
      } else {
        const json = response.data;
        console.log('Error deleting appointment:', json.error);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const validateDate = (dateString) => {
    // Check if the date string is in YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return "Invalid date format. Please use YYYY-MM-DD.";
    }
  
    const [year, month, day] = dateString.split("-");
    const dateObject = new Date(year, month - 1, day);
  
    // Check if the date components are valid
    if (
      dateObject.getFullYear() != year ||
      dateObject.getMonth() + 1 != month ||
      dateObject.getDate() != day
    ) {
      return "Invalid date.";
    }
  
    // Check if the date is in the past
    const currentDate = new Date();
    if (dateObject < currentDate) {
      return "Please enter a future date.";
    }
  
    return null;
  };
  
  

  const validateTime = (timeString) => {
    // Check if the time string is in HH:MM format
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!regex.test(timeString)) {
      return "Invalid time format. Please use HH:MM.";
    }
  

    const [hours, minutes] = timeString.split(":");
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
  

    if (hoursInt < 0 || hoursInt > 23 || minutesInt < 0 || minutesInt > 59) {
      return "Invalid time.";
    }
  
    return null;
  };
  
  

  const handleUpdate = async () => {
    console.log('Updated date:', updatedDate, 'Updated time:', updatedTime);
    const dateError = validateDate(updatedDate);
    const timeError = validateTime(updatedTime);
  
    if (dateError || timeError) {
      setErrors({ updatedDate: dateError, updatedTime: timeError });
      setIsUpdating(true);
      return;
    }
  
    try {
      const response = await axios.patch(`https://appointment-scheduler.azurewebsites.net/api/${appointment._id}`, {
        title: updatedTitle,
        date: updatedDate,
        time: updatedTime,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Updated date:', updatedDate, 'Updated time:', updatedTime);
      
      if (response.status !== 200) {
        const json = response.data;
        console.error('Error updating appointment:', json.error);
      } else {
        console.log('Updated date:', updatedDate, 'Updated time:', updatedTime);
        onUpdateAppointment({
          _id: appointment._id,
          title: updatedTitle,
          date: updatedDate,
          time: updatedTime,
        });
        
        // Reset state after successful update
        setUpdatedTitle(appointment.title);
        setUpdatedDate(appointment.date);
        setUpdatedTime(appointment.time);
        setErrors({});
        setIsUpdating(false);
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
};

  

 
return (
  <div className="workout-details">
    <Link to={`/api/${appointment._id}`}>
      <h4>{appointment.title}</h4>
    </Link>

    <p><strong>Date: </strong>{formattedDate}</p>
    <p><strong>Time: </strong>{appointment.time}</p>

    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
    <button onClick={() => setIsUpdating(true)} disabled={isDeleting}>
      Update
    </button>

    {isUpdating && (
      <form>
        <label>Title:</label>
        <input
          data-testid="my-input1"
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />

        <label>Date:</label>
        <input
          data-testid="my-input2"
          type="date"
          value={updatedDate}
          onChange={(e) => setUpdatedDate(e.target.value)}
          required
        />
        {errors.updatedDate && (
          <div className="invalid-feedback">{errors.updatedDate}</div>
        )}

        <label>Time:</label>
        <input
          data-testid="my-input3"
          type="time"
          value={updatedTime}
          onChange={(e) => setUpdatedTime(e.target.value)}
          required
        />
        {errors.updatedTime && (
          <div className="invalid-feedback">{errors.updatedTime}</div>
        )}

        <button onClick={handleUpdate}>Save</button>
      </form>
    )}
  </div>
);
};

export default AppointmentDetails;
