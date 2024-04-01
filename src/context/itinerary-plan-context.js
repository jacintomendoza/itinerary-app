import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const ItineraryPlanContext = createContext();

function Provider({ children }) {
    const [itineraryDetail, setItineraryPlan] = useState(null);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const response = await axios.get('https://itinerary-app.netlify.app/api/itinerary');
                setItineraryPlan(response.data);
            } catch (error) {
                console.error('Error fetching itinerary:', error);
            }
        };
        fetchItinerary();
    }, []);

    const updateItineraryPlan = (newPlan) => {
        setItineraryPlan(newPlan);
    };

    // UPDATE
    const editItineraryPlanById = async (id, updatedPlan) => {
        try {
            const response = await axios.put(`https://itinerary-app.netlify.app/api/itinerary/${id}`, updatedPlan);
            setItineraryPlan(response.data);
        } catch (error) {
            console.error('Error updating itinerary plan:', error);
        }
    };

    // DELETE
    const deleteItineraryPlanById = async (id) => {
        try {
            await axios.delete(`https://itinerary-app.netlify.app/api/itinerary/${id}`);
            setItineraryPlan(null); // or update the itinerary plan as needed
        } catch (error) {
            console.error('Error deleting itinerary plan:', error);
        }
    };

    return (
        <ItineraryPlanContext.Provider value={{ itineraryDetail, updateItineraryPlan, editItineraryPlanById, deleteItineraryPlanById }}>
            {children}
        </ItineraryPlanContext.Provider>
    );
}

export { Provider, ItineraryPlanContext };
