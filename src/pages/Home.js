import { useEffect,useState} from "react";
import AppointmentDetails from "../components/AppointmentDetails";
import AppointmentForm from "../components/AppointmentForm";

const Home = () => {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      const response = await fetch('/api');
      const json = await response.json();

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
