import { Card, CardContent, Typography, Box } from '@mui/material';
import { useState } from 'react';

const moment = require('moment');

function ItineraryPlan({ itinerary, onPlanUrlSelect }) {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePlanClick = (plan) => {
        setSelectedPlan(plan);
        onPlanUrlSelect(plan.url);
    };

    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" align='center'>Day & Itinerary</Typography>
                <Box borderBottom={1} />
                <Typography color="text.secondary" component="div">
                    <div style={{ padding: '0px 5px 0px 5px', background: 'green' }}>
                        {itinerary.days.map((day) => (
                            <div key={day._id}>
                                <Box component='div' textAlign="left" sx={{ border: '1px solid grey', backgroundColor: 'yellow' }}>
                                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>{moment(day.date).format("M/DD - ddd")}</strong>
                                        <strong> {day.location}</strong>
                                    </div>
                                </Box>
                                {day.plans.map((plan) => (
                                    <Typography key={plan.time} component="div" sx={{
                                        whiteSpace: 'pre-line',
                                        cursor: 'pointer',
                                        backgroundColor: selectedPlan === plan ? 'lightblue' : 'inherit'
                                    }} onClick={() => handlePlanClick(plan)}>
                                        <strong>{plan.time}</strong> - {plan.description}
                                    </Typography >
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