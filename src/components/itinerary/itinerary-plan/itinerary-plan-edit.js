import { Card, CardContent, Typography, TextField, Box, Button, InputBase, Grid, Input } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useItineraryContext } from '../../../hooks/use-hooks-context';
import { useMediaContext } from '../../../hooks/use-hooks-context';

const moment = require('moment');

function ItineraryPlanEdit({ itinerary, onCancelEdit }) {
    const { updateItineraryById, localUpdateItineraryById } = useItineraryContext();
    const { uploadMedia } = useMediaContext();

    const handleSave = async (e) => {
        e.preventDefault();
        await updateItineraryById(itinerary._id, itinerary);
        onCancelEdit();
    };

    const handleAddDay = () => {
        const newDay = { date: dayjs().toISOString(), location: '', plans: [] };
        const updatedItinerary = { ...itinerary };
        updatedItinerary.days.push(newDay);
        localUpdateItineraryById(itinerary._id, updatedItinerary);
    };

    const handleAddPlan = (dayIndex, planIndex) => {
        const updatedItinerary = { ...itinerary };
        const updatedPlans = [...updatedItinerary.days[dayIndex].plans];
        updatedPlans.splice(planIndex, 0, { time: '', description: '', url: '' });
        updatedItinerary.days[dayIndex] = {
            ...updatedItinerary.days[dayIndex],
            plans: updatedPlans,
        };
        localUpdateItineraryById(itinerary._id, updatedItinerary);
    };

    const handleDeletePlan = (dayIndex, planIndex) => {
        const updatedItinerary = { ...itinerary };
        const updatedPlans = [...updatedItinerary.days[dayIndex].plans];
        updatedPlans.splice(planIndex, 1);
        updatedItinerary.days[dayIndex] = {
            ...updatedItinerary.days[dayIndex],
            plans: updatedPlans,
        };
        localUpdateItineraryById(itinerary._id, updatedItinerary);
    };

    const handleUpload = async (e, dayIndex, planIndex) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const mediaInfo = await uploadMedia(file);
            itinerary.days[dayIndex].plans[planIndex].url = mediaInfo.downloadURL;
            itinerary.days[dayIndex].plans[planIndex].fileName = mediaInfo.filename;
        } catch (error) {
            console.error('Error uploading media:', error);
        }
    };

    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" align='center'>Day & Itinerary Edit</Typography>
                <Box borderBottom={1} />
                <Typography color="text.secondary" component="div">
                    <form onSubmit={handleSave}>
                        <div style={{ padding: '0px 5px 0px 5px', background: 'green' }}>
                            <TextField
                                label="Title"
                                defaultValue={itinerary.title}
                                variant="standard"
                                fullWidth
                                onChange={(e) => {
                                    const value = e.target.value;
                                    itinerary.title = value;
                                }} />
                            {itinerary.days.map((day, dayIndex) => (
                                <div key={day._id}>
                                    <Box component='div' textAlign="left" sx={{ border: '1px solid grey', backgroundColor: 'yellow' }}>
                                        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Date"
                                                    defaultValue={dayjs(moment(day.date).toDate())}
                                                    onChange={(date) => {
                                                        itinerary.days[dayIndex].date = date.toISOString();
                                                    }} />
                                            </LocalizationProvider>
                                            <TextField
                                                label="Location"
                                                defaultValue={day.location}
                                                variant="standard"
                                                fullWidth
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    itinerary.days[dayIndex].location = value;
                                                }} />
                                        </div>
                                    </Box>
                                    {day.plans.map((plan, planIndex) => (
                                        <div key={plan._id}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleAddPlan(dayIndex, planIndex)}>
                                                Add Plan Above
                                            </Button>
                                            <TextField
                                                label="Time"
                                                defaultValue={plan.time}
                                                variant="standard"
                                                fullWidth
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    itinerary.days[dayIndex].plans[planIndex].time = value;
                                                }}
                                            />
                                            <TextField
                                                label="Description"
                                                defaultValue={plan.description}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    itinerary.days[dayIndex].plans[planIndex].description = value;
                                                }}
                                            />
                                            <div>
                                                <label htmlFor={`upload-media-${dayIndex}-${planIndex}`}>
                                                    Upload Media:
                                                </label>
                                                <Input
                                                    type="file"
                                                    id={`upload-media-${dayIndex}-${planIndex}`}
                                                    onChange={(e) => handleUpload(e, dayIndex, planIndex)}
                                                />
                                                <span>{plan.fileName}</span>
                                            </div>

                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDeletePlan(dayIndex, planIndex)}>
                                                Delete Plan
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAddPlan(dayIndex, day.plans.length)}>
                                        Add Plan Below
                                    </Button>
                                </div>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddDay}>
                                    Add Day
                                </Button>
                            </Box>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                            <Button variant="contained" type="submit">Save</Button>
                        </Box>
                    </form>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ItineraryPlanEdit;