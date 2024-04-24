import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ItineraryProvider } from './context/itinerary-context';
import { MediaProvider } from './context/media-context';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <ItineraryProvider>
        <MediaProvider>
            <App />
        </MediaProvider>
    </ItineraryProvider>
);