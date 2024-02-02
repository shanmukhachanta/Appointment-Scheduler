import React, { useState } from 'react';
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

const handleDelete = async () => {
  try {
    setIsDeleting(true);
    const response = await axios.delete(`/api/${appointment._id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const json = response.data;
      console.error('Error deleting appointment:', json.error);
    } else {
      onDelete(appointment._id);
      console.log('Appointment deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);
  } finally {
    setIsDeleting(false);
  }
};

const handleUpdate = async () => {
  try {
    const response = await axios.patch(`/api/${appointment._id}`, {
      title: updatedTitle,
      date: updatedDate,
      time: updatedTime,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const json = response.data;
      console.error('Error updating appointment:', json.error);
    } else {
      console.log('Appointment updated successfully');
      onUpdateAppointment({
        _id: appointment._id,
        title: updatedTitle,
        date: updatedDate,
        time: updatedTime,
      });
      setIsUpdating(false);
      console.log(appointment);
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
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
  
          <label>Date:</label>
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
          />
  
          <label>Time:</label>
          <input
            type="time"
            value={updatedTime}
            onChange={(e) => setUpdatedTime(e.target.value)}
          />
  
          <button onClick={handleUpdate}>Save</button>
        </form>
      )}
    </div>
  );
  
};

export default AppointmentDetails;