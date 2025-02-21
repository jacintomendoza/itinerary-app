import Itinerary from './components/itinerary/itinerary';
import DrawerAppBar from './components/drawer-app-bar';
import WelcomePage from './components/welcome-page/welcome-page';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <DrawerAppBar />
        <Routes>
          <Route path="/welcomePage" element={<WelcomePage />} />
          <Route path="/itinerary-app" element={<Navigate to="/welcomePage"/>}/>
          <Route path="/" element={<Navigate to="/welcomePage"/>} >
            
          </Route>
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;