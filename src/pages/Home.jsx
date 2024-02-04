import { useEffect, useState } from "react";
import AppointmentDetails from "../components/AppointmentDetails";
import AppointmentForm from "../components/AppointmentForm";
import axios from "axios";

const Home = () => {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://appointment-scheduler.azurewebsites.net/api');
        const json = response.data;

        // Check if response status is in the success range (2xx)
        if (response.status >= 200 && response.status < 300) {
          setAppointments(json);
        } else {
          console.error('Failed to fetch appointments:', json);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array to fetch appointments only once on component mount

  const handleDeleteAppointment = (deletedAppointmentId) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== deletedAppointmentId)
    );
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      )
    );
  };

  return (
    <div>
      {appointments !== null && appointments.map((appointment, index) => (
        <div key={appointment._id} data-testid={`user-number-${index}`}>
          <AppointmentDetails
            appointment={appointment}
            onDelete={handleDeleteAppointment}
            onUpdateAppointment={handleUpdateAppointment}
          />
        </div>
      ))}
      <AppointmentForm appointments={appointments} setAppointments={setAppointments}></AppointmentForm>
    </div>
  );
};

export default Home;
