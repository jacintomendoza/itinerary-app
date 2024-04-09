import { Card, CardContent, Typography, TextField, Button, Divider, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import useItineraryPlanContext from '../../../hooks/use-hooks-context';

function ItineraryAdd({ closeAddClicked }) {
    const { addItineraryPlan, getItineraryDetail } = useItineraryPlanContext();
    const [itineraryTitle, setItineraryTitle] = useState('');
    const [itinerary, setItinerary] = useState([]);

    const handleAddDay = () => {
        setItinerary([...itinerary, { day: `Day ${itinerary.length + 1}`, plans: [] }]);
    };

    const handleAddPlan = (dayIndex) => {
        setItinerary((prevItinerary) => {
            const newItinerary = [...prevItinerary];
            newItinerary[dayIndex].plans.push({ description: '', time: '', url: '' });
            return newItinerary;
        });
    };

    const handlePlanChange = (dayIndex, planIndex, field, value) => {
        setItinerary((prevItinerary) => {
            const newItinerary = [...prevItinerary];
            if (field === 'description') {
                newItinerary[dayIndex].plans[planIndex].description = value;
            } else if (field === 'time') {
                newItinerary[dayIndex].plans[planIndex].time = value;
            } else if (field === 'url') {
                newItinerary[dayIndex].plans[planIndex].url = value;
            }
            return newItinerary;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Loading here");
        try {
            await addItineraryPlan({ title: itineraryTitle, itinerary });
            // Reset form after successful submission
            setItineraryTitle('');
            setItinerary([]);
            await getItineraryDetail();
        } catch (error) {
            console.error('Error adding itinerary plan:', error);
        } finally {
            console.log("Finish here");
        }
    };

    return (
        <Card style={{ height: '100%', backgroundColor: 'pink' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={closeAddClicked}>
                        <Close />
                    </IconButton>
                </Box>
                <Typography variant="h4" align='center'>Add Itinerary</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        value={itineraryTitle}
                        onChange={(e) => setItineraryTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {itinerary.map((day, dayIndex) => (
                        <div key={dayIndex}>
                            <Box component='div' textAlign="left" sx={{ border: '1px solid grey', backgroundColor: 'yellow' }}>
                                <Typography variant="h5">{day.day}</Typography>
                            </Box>
                            <Divider />
                            {day.plans.map((plan, planIndex) => (
                                <div key={planIndex}>
                                    <Typography variant="h6">Plan {planIndex + 1}</Typography>
                                    <TextField
                                        label={`Description`}
                                        value={plan.description}
                                        onChange={(e) => handlePlanChange(dayIndex, planIndex, 'description', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label={`Time`}
                                        value={plan.time}
                                        onChange={(e) => handlePlanChange(dayIndex, planIndex, 'time', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        className="text-field"
                                    />
                                    <TextField
                                        label={`URL`}
                                        value={plan.url}
                                        onChange={(e) => handlePlanChange(dayIndex, planIndex, 'url', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        className="text-field"
                                    />
                                </div>
                            ))}
                            <Button onClick={() => handleAddPlan(dayIndex)}>Add Plan</Button>
                        </div>
                    ))}
                    <Button onClick={handleAddDay}>Add Day</Button>
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
}

export default ItineraryAdd;