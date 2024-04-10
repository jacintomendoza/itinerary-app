import { useContext } from "react";
import { ItineraryContext } from "../context/itinerary-context";

function useItineraryContext() {
    return useContext(ItineraryContext);
}

export default useItineraryContext;