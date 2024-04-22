import { Card, CardContent, Typography, TextField, Button, Divider, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import useItineraryContext from '../../../hooks/use-hooks-context';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';

function ItineraryAdd({ closeAddClicked }) {
    const { addItinerary, getItineraryArray } = useItineraryContext();
    const [itineraryTitle, setItineraryTitle] = useState('');
    const [itinerary, setItinerary] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddDay = () => {
        setItinerary([...itinerary, { date: dayjs().toISOString(), location: '', plans: [] }]);
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
            if (field === 'description' || field === 'time' || field === 'url') {
                newItinerary[dayIndex].plans[planIndex][field] = value;
            } else if (field === 'location' || field === 'date') {
                newItinerary[dayIndex][field] = value;
            }
            return newItinerary;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);
        try {
            await addItinerary({ title: itineraryTitle, days: itinerary });
            setItineraryTitle('');
            setItinerary([]);
            await getItineraryArray();
        } catch (error) {
            setErrorMessage('Error adding itinerary plan:' + error.message);
        } finally {
            setIsLoading(false);
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
                                <TextField
                                    label="Location"
                                    value={day.location}
                                    onChange={(e) => handlePlanChange(dayIndex, null, 'location', e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Date"
                                    type="date"
                                    value={day.date}
                                    onChange={(e) => handlePlanChange(dayIndex, null, 'date', e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
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
                                        multiline
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
                        <LoadingButton type="submit" variant="contained" color="primary" loading={isLoading}>
                            Submit
                        </LoadingButton >
                        <Typography sx={{ mt: 1 }} variant="body2" color="error" gutterBottom>
                            {errorMessage}
                        </Typography>
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
}

export default ItineraryAdd;