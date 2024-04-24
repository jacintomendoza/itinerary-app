import { useContext } from "react";
import { ItineraryContext } from "../context/itinerary-context";
import { MediaContext } from "../context/media-context";

export function useItineraryContext() {
    return useContext(ItineraryContext);
}

export function useMediaContext() {
    return useContext(MediaContext);
}