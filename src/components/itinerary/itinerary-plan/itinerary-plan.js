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
                <Typography variant="h4" align='center'>Day & Itinerary</Typography>
                <Box borderBottom={1} />
                <Typography color="text.secondary" component="div">
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        {itinerary.days.map((day) => (
                            <Box key={day._id} sx={{ backgroundColor: 'pink', border: '1px solid black', borderRadius: '10px', marginTop: '10px', overflow: 'hidden', padding: '5px 5px 5px 5px' }}>
                                <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ overflow: 'hidden' }}>
                                        <strong>{moment(day.date).format("M/DD - ddd")}</strong>
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ overflow: 'hidden' }}>
                                        {day.location}
                                    </Typography>
                                </div>
                                {day.plans.map((plan) => (
                                    <Box
                                        key={plan.time}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            cursor: 'pointer',
                                            backgroundColor: selectedPlan === plan ? 'lightblue' : 'inherit'
                                        }}
                                        onClick={() => handlePlanClick(plan)}
                                    >
                                        <Typography component="div" sx={{ whiteSpace: 'pre-line' }}>
                                            <strong>{plan.time}</strong> - {plan.description}
                                        </Typography>
                                        {plan.url && (
                                            <img
                                                src={plan.url}
                                                alt="Plan"
                                                style={{ width: '40px', height: '40px', borderRadius: '5px', objectFit: 'cover' }}
                                            />
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </div>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ItineraryPlan;
