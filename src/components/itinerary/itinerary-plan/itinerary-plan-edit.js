import { Card, CardContent, Typography, TextField, Box, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import useItineraryContext from '../../../hooks/use-hooks-context';

const moment = require('moment');

function ItineraryPlanEdit({ itinerary, onCancelEdit }) {

    const { updateItineraryById, localUpdateItineraryById } = useItineraryContext();

    const handleSave = async (e) => {
        e.preventDefault();
        await updateItineraryById(itinerary._id, itinerary);
        onCancelEdit();
    };

    const handleAddDay = () => {
        let updateditinerary = itinerary.days.push({ date: dayjs().toISOString(), location: '', plans: [] });
        localUpdateItineraryById(itinerary._id, updateditinerary);
    };

    const handleAddPlan = (dayIndex) => {
        let updateditinerary = itinerary.days[dayIndex].plans.push({ time: '', description: '' });
        localUpdateItineraryById(itinerary._id, updateditinerary);
    };

    const handleDeletePlan = (dayIndex, planIndex) => {
        let updateditinerary = itinerary.days[dayIndex].plans.splice(planIndex, 1)
        localUpdateItineraryById(itinerary._id, updateditinerary);
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
                                        onClick={() => handleAddPlan(dayIndex)}>
                                        Add Plan
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