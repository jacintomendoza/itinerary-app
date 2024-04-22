import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const ItineraryContext = createContext();

function Provider({ children }) {
    const [itineraryArray, setItineraryArray] = useState(null);

    useEffect(() => {
        fetchItinerary();
    }, []);

    // CREATE
    const addItinerary = async (newItinerary) => {
        return axios.post('https://itinerary-app.netlify.app/api/itinerary/postItinerary', newItinerary);
    };

    // READ
    const fetchItinerary = async () => {
        try {
            const response = await axios.get('https://itinerary-app.netlify.app/api/itinerary/getItinerary');
            setItineraryArray(response.data);
        } catch (error) {
            console.error('Error fetching itinerary:', error);
        }
    };

    const getItineraryArray = async () => {
        await fetchItinerary();
    };

    // UPDATE
    const updateItineraryById = async (id, updatedItinerary) => {
        try {
            await axios.put(`https://itinerary-app.netlify.app/api/itinerary/putItineraryById/${id}`, updatedItinerary);
            setItineraryArray(prevItinerary => {
                const updatedItineraryArray = prevItinerary.map(itini => {
                    if (itini._id === id) {
                        return { ...itini, ...updatedItinerary };
                    } else {
                        return itini;
                    }
                });
                return updatedItineraryArray;
            });
        } catch (error) {
            console.error('Error updating itinerary:', error);
        }
    };

    const localUpdateItineraryById = async (id, updatedItinerary) => {
        setItineraryArray(prevItinerary => {
            const updatedItineraryArray = prevItinerary.map(itini => {
                if (itini._id === id) {
                    return { ...itini, ...updatedItinerary };
                } else {
                    return itini;
                }
            });
            return updatedItineraryArray;
        });
    };

    // DELETE
    const deleteItineraryById = async (id) => {
        try {
            await axios.delete(`https://itinerary-app.netlify.app/api/itinerary/deleteItineraryById/${id}`);
            setItineraryArray(prevItinerary => prevItinerary.filter(itini => itini._id !== id));
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    return (
        <ItineraryContext.Provider value={{ itineraryArray, updateItineraryById, deleteItineraryById, addItinerary, getItineraryArray, localUpdateItineraryById }}>
            {children}
        </ItineraryContext.Provider>
    );
}

export { Provider, ItineraryContext };