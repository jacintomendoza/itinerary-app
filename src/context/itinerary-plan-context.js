import { createContext, useState } from "react";

const ItineraryPlanContext = createContext();

const defaultItineraryPlan = {
    title: "Denver, CO",
    startDate: "2024-04-01",
    days: [
        {
            id: 0,
            location: "Dallas",
            date: "3/20/24",
            plans: [
                {
                    time: "5:00 PM",
                    description: "Dinner at a local restaurant",
                    url: "https://thispersondoesnotexist.com/",
                },
                {
                    time: "8:00 PM",
                    description: "Visit a nearby museum"
                }
            ]
        },
        {
            id: 1,
            location: "Denver",
            date: "3/21/24",
            plans: [
                {
                    time: "10:00 AM",
                    description: "Explore downtown area"
                },
                {
                    time: "1:00 PM",
                    description: "Lunch at a cafe"
                }
            ]
        }
    ]
};

function Provider({ children }) {
    const [itineraryDetail, setItineraryPlan] = useState(defaultItineraryPlan);

    const updateItineraryPlan = (newPlan) => {
        setItineraryPlan(newPlan);
    };

    return (
        <ItineraryPlanContext.Provider value={{ itineraryDetail, updateItineraryPlan }}>
            {children}
        </ItineraryPlanContext.Provider>
    );
}

export { Provider, ItineraryPlanContext };