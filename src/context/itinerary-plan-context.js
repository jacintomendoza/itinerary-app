import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const ItineraryPlanContext = createContext();

function Provider({ children }) {
    const [itineraryDetail, setItineraryDetail] = useState(null);

    useEffect(() => {
        fetchItinerary();
    }, []);

    const fetchItinerary = async () => {
        try {
            const response = await axios.get('https://itinerary-app.netlify.app/api/itinerary');
            setItineraryDetail(response.data);
        } catch (error) {
            console.error('Error fetching itinerary:', error);
        }
    };

    const getItineraryDetail = async () => {
        await fetchItinerary();
    };

    // CREATE
    const addItineraryPlan = async (newPlan) => {
        try {
            await axios.post('https://itinerary-app.netlify.app/api/itinerary', newPlan);
        } catch (error) {
            console.error('Error creating itinerary plan:', error);
        }
    }

    // UPDATE
    const editItineraryPlanById = async (id, updatedPlan) => {
        try {
            const response = await axios.put(`https://itinerary-app.netlify.app/api/itinerary/${id}`, updatedPlan);
            setItineraryDetail(response.data);
        } catch (error) {
            console.error('Error updating itinerary plan:', error);
        }
    };

    // EDIT
    const updateItineraryPlan = (newPlan) => {
        setItineraryDetail(newPlan);
    };

    // DELETE
    const deleteItineraryPlanById = async (id) => {
        try {
            await axios.delete(`https://itinerary-app.netlify.app/api/itinerary/${id}`);
            setItineraryDetail(null);
        } catch (error) {
            console.error('Error deleting itinerary plan:', error);
        }
    };

    return (
        <ItineraryPlanContext.Provider value={{ itineraryDetail, updateItineraryPlan, editItineraryPlanById, deleteItineraryPlanById, addItineraryPlan, getItineraryDetail }}>
            {children}
        </ItineraryPlanContext.Provider>
    );
}

export { Provider, ItineraryPlanContext };