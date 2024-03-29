import { Card, CardContent, Typography, Box } from '@mui/material';

function ItineraryPlan({ itineraryDetail }) {

    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" align='center'>Day & Itinerary</Typography>
                <Box borderBottom={1} />
                <Typography color="text.secondary" component="div">
                    <div style={{ padding: '0px 5px 0px 5px', background: 'red' }}>
                        {itineraryDetail.days.map((day) => (
                            <div key={day.id}>
                                <Box component='div' textAlign="left" sx={{ border: '1px solid grey', backgroundColor: 'yellow' }}>
                                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>{day.date}</div>
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
