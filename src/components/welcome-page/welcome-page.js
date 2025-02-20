import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material'
import Typography from '@mui/material/Typography';

function WelcomePage() {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/itinerary', { replace: true })
    }

    return (
        <div style={{ paddingTop: '56px' }}>
            <Box sx={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${require('./../../assets/images/luggageBeach.jpg')})`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                <Typography variant="h2" sx={{ color: 'white' }}>
                    Welcome Traveler!
                </Typography>
            </Box>

            {/* <Grid container spacing={2} sx={{height: '100vh'}}>
                <Grid item xs={6} alignItems='stretch' bgcolor='red'>
                    tset
                </Grid>
                <Grid item xs={6} alignItems='stretch' bgcolor='blue'>
                    tset
                </Grid>
            </Grid> */}

            <button onClick={handleGetStarted}>Get Started</button>
        </div>
    )
}
export default WelcomePage;