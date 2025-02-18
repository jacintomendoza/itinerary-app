import Itinerary from './components/itinerary/itinerary';
import DrawerAppBar from './components/drawer-app-bar';
import WelcomePage from './components/welcome-page/welcome-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <DrawerAppBar />

      Router:

      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;