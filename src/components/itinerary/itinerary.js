import { Grid, Card, CardContent, Typography } from '@mui/material';

function Itinerary() {
    return (
        <Card style={{ backgroundColor: 'grey', minHeight: '500px' }}>
            <CardContent>
                <Typography variant="h2" component="div" align='center' gutterBottom>
                    Denver
                </Typography>
                <Grid container spacing={2} alignItems='stretch' style={{ minHeight: '400px'}}>
                    {/* Card Location */}
                    <Grid item xs={1}>
                        <Card style={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" align='center'>Location</Typography>
                                <Typography color="text.secondary" align='center'>
                                    Dallas<br />to<br />Denver
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Card Day & Itinerary */}
                    <Grid item xs={6}>
                        <Card style={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" align='center'>
                                    Day & Itinerary
                                </Typography>
                                <Typography color="text.secondary">
                                    Seperate by day and Itinerary
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Card Pictures */}
                    <Grid item xs={5}>
                        <Card style={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" align='center'>
                                    Pictures
                                </Typography>
                                <Typography color="text.secondary">
                                    Dallas to Denver
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
export default Itinerary;