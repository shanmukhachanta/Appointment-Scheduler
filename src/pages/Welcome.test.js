
import { render, screen } from '@testing-library/react';
import Welcome from './Welcome'
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('welcome page check1',()=>{
    render(
        <BrowserRouter>
            <Welcome />
        </BrowserRouter>
    );
    const welcomeTitle = screen.getByRole('heading', { name: /Welcome/i });
    expect(welcomeTitle).toBeInTheDocument();
    expect(welcomeTitle).toHaveTextContent('Welcome to Our Appointment Scheduling Page');

    
})
test('welcome page check2',()=>{
    render(
        <BrowserRouter>
            <Welcome />
        </BrowserRouter>
    );
    
    const welcomeMessage = screen.getByText(/Book your appointments easily and conveniently/i);
    expect(welcomeMessage).toBeInTheDocument();
})