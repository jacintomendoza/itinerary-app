import { Card, CardContent, Typography, Grid } from '@mui/material';
import ItineraryPlan from './itinerary-plan/itinerary-plan'
import ItineraryPictures from './itinerary-pictures/itinerary-pictures'

function Itinerary() {
    return (
        <Card style={{ backgroundColor: 'grey', minHeight: '500px' }}>
            <CardContent style={{ height: '100%' }}>
                <Typography variant="h2" component="div" align='center' gutterBottom>Denver</Typography>
                <Grid container spacing={2} alignItems='stretch' style={{ minHeight: '400px' }}>
                    {/* <Grid item xs={1}><ItineraryLocation /></Grid> */}
                    <Grid item xs={6}><ItineraryPlan /></Grid>
                    {/* Card Pictures */}
                    <Grid item xs={6}><ItineraryPictures /></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
export default Itinerary;