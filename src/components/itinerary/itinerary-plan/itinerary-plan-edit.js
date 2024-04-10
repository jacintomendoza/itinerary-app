import { Card, CardContent, Typography, TextField, Box, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import useItineraryPlanContext from '../../../hooks/use-hooks-context';

const moment = require('moment');

function ItineraryPlanEdit({ itineraryDetail, onCancelEdit }) {

    const { editItineraryPlanById, getItineraryDetail, updateItineraryDetailById } = useItineraryPlanContext();

    const handleSave = async (e) => {
        e.preventDefault();
        await editItineraryPlanById(itineraryDetail._id, itineraryDetail);
        await getItineraryDetail();
        onCancelEdit();
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
                                defaultValue={itineraryDetail.title}
                                variant="standard"
                                fullWidth
                                onChange={(e) => {
                                    const value = e.target.value;
                                    itineraryDetail.title = value;
                                }} />
                            {itineraryDetail.days.map((day, dayIndex) => (
                                <div key={day.id}>
                                    <Box component='div' textAlign="left" sx={{ border: '1px solid grey', backgroundColor: 'yellow' }}>
                                        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Date"
                                                    defaultValue={dayjs(moment(day.date).toDate())}
                                                    onChange={(date) => {
                                                        itineraryDetail.days[dayIndex].date = date.toISOString();
                                                    }} />
                                            </LocalizationProvider>
                                            <TextField
                                                label="Location"
                                                defaultValue={day.location}
                                                variant="standard"
                                                fullWidth
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    itineraryDetail.days[dayIndex].location = value;
                                                }} />
                                        </div>
                                    </Box>
                                    {day.plans.map((plan, planIndex) => (
                                        <div key={plan.time}>
                                            <TextField
                                                label="Time"
                                                defaultValue={plan.time}
                                                variant="standard"
                                                fullWidth
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    itineraryDetail.days[dayIndex].plans[planIndex].time = value;
                                                }}
                                            />
                                            <TextField
                                                label="Description"
                                                defaultValue={plan.description}
                                                variant="standard"
                                                fullWidth
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    itineraryDetail.days[dayIndex].plans[planIndex].description = value;
                                                }}
                                            />
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => {
                                                    updateItineraryDetailById(itineraryDetail._id, itineraryDetail.days[dayIndex].plans.splice(planIndex, 1))
                                                }}>Delete Plan</Button>
                                        </div>
                                    ))}
                                </div>
                            ))}
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