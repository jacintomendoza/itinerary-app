import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import ItineraryPlan from './itinerary-plan/itinerary-plan';
import ItineraryPictures from './itinerary-pictures/itinerary-pictures';
import ItineraryAdd from './itinerary-add/itinerary-add';
import ItineraryPlanEdit from './itinerary-plan/itinerary-plan-edit';
import useItineraryPlanContext from '../../hooks/use-hooks-context';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

function Itinerary() {
    const { itineraryDetail } = useItineraryPlanContext();
    const [editView, setEditView] = useState(false);
    const [addView, setAddView] = useState(false);

    // const updateItineraryDetail = (updatedItineraryDetail) => {
    //     // Logic to update the itinerary detail state or send a request to update the backend
    // };

    const handleEditClicked = () => {
        setEditView(!editView);
    }

    const onAddClicked = () => {
        setAddView(!addView);
    }

    if (!itineraryDetail) {
        return <div>Loading...</div>;
    }

    let addContent = '';
    if (addView) {
        addContent = <ItineraryAdd closeAddClicked={onAddClicked} />;
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
                        <Typography variant="h2" component="div" align='center' gutterBottom>{itinerary.title} <EditIcon style={{ cursor: 'pointer' }} onClick={handleEditClicked} /></Typography>
                        <Grid container spacing={2} alignItems='stretch' style={{ minHeight: '400px' }}>
                            {/* Card Plan */}
                            {editView ? (
                                <Grid item xs={6}><ItineraryPlanEdit itineraryDetail={itinerary} /></Grid>
                            ) : (
                                <Grid item xs={6}><ItineraryPlan itineraryDetail={itinerary} /></Grid>
                            )}
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