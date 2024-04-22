import { Card, CardContent, Typography } from '@mui/material';

function ItineraryPictures({ selectedPlanUrl }) {
    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" align='center'>Pictures</Typography>
                <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
                    <img src={selectedPlanUrl} alt="Select a Plan" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
            </CardContent>
        </Card>
    );
}

export default ItineraryPictures;