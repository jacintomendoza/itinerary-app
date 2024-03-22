import { Card, CardContent, Typography, Box } from '@mui/material';

function ItineraryPlan() {
    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" align='center'>Day & Itinerary</Typography>
                <Box borderBottom={1} />
                <Typography color="text.secondary" component="div">
                    <div style={{ padding: '0px 5px 0px 5px', background: 'red' }}>
                        <Box component='div' textAlign="left" sx={{ border: '1px solid grey', backgroundColor: 'yellow' }}>
                            <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>3/20/24 - Wed</div>
                                <div>Dallas</div>
                            </div>
                        </Box>
                        5:00 PM - something here<br />
                        6:00 PM - something here<br />
                    </div>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ItineraryPlan;