import { Card, CardContent, Typography, TextField, Box, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
const moment = require('moment');

function ItineraryPlanEdit({ itineraryDetail }) {



    const handleSave = (e) => {
        e.preventDefault();
        // Handle saving the itinerary detail data
        console.log(itineraryDetail);
    };

    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" align='center'>Day & Itinerary Edit</Typography>
                <Box borderBottom={1} />
                <Typography color="text.secondary" component="div">
                    <form onSubmit={handleSave}>
                        <div style={{ padding: '0px 5px 0px 5px', background: 'green' }}>
                            {itineraryDetail.days.map((day, dayIndex) => (
                                <div key={day.id}>
                                    <Box component='div' textAlign="left" sx={{ border: '1px solid grey', backgroundColor: 'yellow' }}>
                                        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>

                                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Date"
                                                    defaultValue={dayjs(moment(day.date).toDate())}
                                                    onChange={(e) => {
                                                        itineraryDetail.days[dayIndex].date = moment(e).toISOString();
                                                    }}
                                                renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider> */}
                                            {/* <TextField
                                                label="Date"
                                                onChange={(e) => {
                                                    itineraryDetail.days[dayIndex].date = moment(e).toISOString();
                                                }}
                                            /> */}

                                            <TextField
                                                label="Location"
                                                defaultValue={day.location}
                                                variant="standard"
                                                fullWidth
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    itineraryDetail.days[dayIndex].location = value;
                                                }}
                                            />
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
                                                    // Update the time in itineraryDetail
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
                                                    // Update the description in itineraryDetail
                                                    itineraryDetail.days[dayIndex].plans[planIndex].description = value;
                                                }}
                                            />
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
