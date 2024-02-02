import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import IndividualComponents from './components/IndividualComp';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
              <Routes>
                <Route 
                  path="/create" 
                  element={<Home />} 
                />
                <Route 
                  path="/" 
                  element={<Welcome />} 
                />
                 <Route path="/api/:id" element={<IndividualComponents />} />
                

              </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
