
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
describe('Link test',()=>{

    test('renders link1 in the header', () => {
      render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
      



    const appointmentLink = screen.getByRole('link', { name: /Appointment page/i });
    

    expect(appointmentLink).toBeInTheDocument();
  });

    test('renders link2 in the header', () => {
      render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
      



    const bookAppointmentLink = screen.getByRole('link', { name: /Book an appointment/i });



    expect(bookAppointmentLink).toBeInTheDocument();
    });


})
