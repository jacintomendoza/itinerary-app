import { Grid, Card, CardContent, Typography } from '@mui/material';
import ItineraryPlan from './itinerary-plan/itinerary-plan';
import ItineraryPictures from './itinerary-pictures/itinerary-pictures';
import { ItineraryPlanContext } from '../../context/itinerary-plan-context';
import { useContext } from 'react';

function Itinerary() {

    const { itineraryDetail } = useContext(ItineraryPlanContext);

    return (
        <Card style={{ backgroundColor: 'grey', minHeight: '500px' }}>
            <CardContent style={{ height: '100%' }}>
                <Typography variant="h2" component="div" align='center' gutterBottom>{itineraryDetail.title}</Typography>
                <Grid container spacing={2} alignItems='stretch' style={{ minHeight: '400px' }}>
                    {/* Card Plan */}
                    <Grid item xs={6}><ItineraryPlan itineraryDetail={itineraryDetail} /></Grid>
                    {/* Card Pictures */}
                    <Grid item xs={6}><ItineraryPictures /></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
export default Itinerary;