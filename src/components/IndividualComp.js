const React = require('react');
const { useEffect, useState } = React;
const { useParams } = require('react-router-dom');
const axios = require('axios');
const format = require('date-fns/format');


const IndividualComponents = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`/api/${id}`);
        setAppointment(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!appointment) {
    return <p>No appointment found with the specified ID.</p>;
  }

  const formattedDate = new Date(appointment.date).toLocaleDateString();

  return (
    <div>
      <h4>{appointment.title}</h4>
      <p><strong>Date: </strong>{formattedDate}</p>
      <p><strong>Time: </strong>{appointment.time}</p>
    </div>
  );
};

export default IndividualComponents;
