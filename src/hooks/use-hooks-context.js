import { useContext } from "react";
import { ItineraryPlanContext } from "../context/itinerary-plan-context";

function useItineraryPlanContext() {
    return useContext(ItineraryPlanContext);
}

export default useItineraryPlanContext;