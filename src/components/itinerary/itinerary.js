import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import ItineraryPlan from './itinerary-plan/itinerary-plan';
import ItineraryPictures from './itinerary-pictures/itinerary-pictures';
import useItineraryPlanContext from '../../hooks/use-hooks-context';
import { useState } from 'react';
import ItineraryAdd from './itinerary-add/itinerary-add';

function Itinerary() {
    const { itineraryDetail } = useItineraryPlanContext();
    const [editView, setEditView] = useState(false);
    const [addView, setAddView] = useState(false);

    // const updateItineraryDetail = (updatedItineraryDetail) => {
    //     // Logic to update the itinerary detail state or send a request to update the backend
    // };

    const onAddClicked = () => {
        setAddView(true);
    }

    const onEditClicked = () => {
        setEditView(!editView);
    };

    if (!itineraryDetail) {
        return <div>Loading...</div>;
    }

    let addContent = ''
    if (addView) {
        addContent = <ItineraryAdd />;
    }

    return (
        <div style={{ paddingTop: '84px' }}>
            <Button variant="contained" style={{ marginBottom: '20px' }} color="primary" onClick={onAddClicked}>Add itinerary</Button>
            <Card>
                <CardContent>
                    <Grid item xs={12}>
                        <Grid item xs={12}>{addContent}</Grid>
                    </Grid>
                </CardContent>
            </Card>
            {itineraryDetail.map((itinerary) => (
                <Card key={itinerary._id} style={{ backgroundColor: 'grey', marginBottom: '20px' }}>
                    <CardContent style={{ height: '100%' }}>
                        <Typography variant="h2" component="div" align='center' gutterBottom>{itinerary.title}</Typography>
                        <Grid container spacing={2} alignItems='stretch' style={{ minHeight: '400px' }}>
                            {/* Card Plan */}
                            <Grid item xs={6}><ItineraryPlan itineraryDetail={itinerary} editClicked={onEditClicked} /></Grid>
                            {/* Card Pictures */}
                            <Grid item xs={6}><ItineraryPictures /></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
export default Itinerary;