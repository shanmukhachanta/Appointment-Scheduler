import { useEffect,useState} from "react";
import AppointmentDetails from "../components/AppointmentDetails";
import AppointmentForm from "../components/AppointmentForm";
import axios from "axios";

const Home = () => {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      const response = await axios.get('https://appointment-scheduler.azurewebsites.net/api');
        const json = response.data;

      if (response.ok) {
        setAppointments(json);
      }
    };

    fetchAppointment();
  }, [appointments]);

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
        <div data-testid={`user-number-${index}`}>
          <AppointmentDetails
            key={appointment._id}
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
