import { Card, CardContent, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
const moment = require('moment');

function ItineraryPlan({ itineraryDetail, editClicked }) {



    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" align='center'>Day & Itinerary <EditIcon style={{ cursor: 'pointer' }} onClick={editClicked} /></Typography>
                <Box borderBottom={1} />
                <Typography color="text.secondary" component="div">
                    <div style={{ padding: '0px 5px 0px 5px', background: 'green' }}>
                        {itineraryDetail.days.map((day) => (
                            <div key={day.id}>
                                <Box component='div' textAlign="left" sx={{ border: '1px solid grey', backgroundColor: 'yellow' }}>
                                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>{moment(day.date).format("M/DD - ddd")}</div>
                                        <div> {day.location}</div>
                                    </div>
                                </Box>
                                {day.plans.map((plan) => (
                                    <div key={plan.time}>
                                        {plan.time} - {plan.description}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ItineraryPlan;
