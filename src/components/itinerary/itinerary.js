import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import ItineraryPlan from './itinerary-plan/itinerary-plan';
import ItineraryPictures from './itinerary-pictures/itinerary-pictures';
import ItineraryAdd from './itinerary-add/itinerary-add';
import ItineraryPlanEdit from './itinerary-plan/itinerary-plan-edit';
import useItineraryPlanContext from '../../hooks/use-hooks-context';
import { useState, useRef  } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Itinerary() {
    const { itineraryDetail, deleteItineraryDetailById } = useItineraryPlanContext();
    const [addView, setAddView] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleEditClicked = (id) => {
        setEditId(id === editId ? null : id);
    }

    const handleDeleteClicked = async (id) => {
        await deleteItineraryDetailById(id);
    }
    

    const onAddClicked = () => {
        console.log(itineraryDetail);
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

            {Array.isArray(itineraryDetail) && itineraryDetail.map((itinerary) => (
                <Card key={itinerary._id} style={{ backgroundColor: 'grey', marginBottom: '20px' }}>
                    <CardContent style={{ height: '100%' }}>
                        <Typography variant="h2" component="div" align='center' gutterBottom>{itinerary.title}
                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleEditClicked(itinerary._id)} />
                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteClicked(itinerary._id)} /></Typography>
                        <Grid container spacing={2} alignItems='stretch' style={{ minHeight: '400px' }}>
                            {/* Card Plan */}
                            {editId === itinerary._id ? (
                                <Grid item xs={6}><ItineraryPlanEdit itineraryDetail={itinerary} onCancelEdit={() => handleEditClicked(itinerary._id)} /></Grid>
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