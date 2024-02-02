import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
  
      <Link to="/" className="bold-link">
        Appointment page
      </Link>

      <Link to="/create" className="button-link">
        Book an appointment
      </Link>

      </div>
    </header>
  )
}

export default Navbar