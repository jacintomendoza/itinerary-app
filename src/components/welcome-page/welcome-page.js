import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material'
import Typography from '@mui/material/Typography';

function WelcomePage() {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/itinerary', { replace: true })
    }

    return (
        <div style={{ paddingTop: '56px' }}>
            {/* Hero Section */}
            <Box sx={{
                width: '100vw',
                height: 'calc(100vh - 56px)',
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

            {/* Overview Section */}
            <Grid container sx={{ height: '70vh', width: '100vw', padding: '40px' }}>
                <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Typography variant="h4">Overview</Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <Typography>
                        Planning your trips just got easier. This platform is designed to streamline the itinerary-making process, giving you a seamless way to organize your travels. With a simple UI, you can effortlessly add itinerary details like time, location, pictures, and day-wise schedules—all in one place. <br /><br />

                        Start planning your next adventure with ease!
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '10px' }}>
                    <Typography sx={{ marginBottom: '10px' }}>
                        Click here to try a demo!
                    </Typography>
                    <Button variant="contained" onClick={handleGetStarted}>Demo</Button>
                </Grid>
            </Grid>

            {/* Features Section */}
            <Grid container sx={{ height: '70vh', width: '100vw', backgroundColor: '#f5f5f5', padding: '40px' }}>
                <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Typography variant="h4">Key Features</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center', padding: '20px' }}>
                    <Typography variant="h6">📍 Add Locations</Typography>
                    <Typography>Pinpoint all your destinations effortlessly.</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center', padding: '20px' }}>
                    <Typography variant="h6">🕒 Set Times</Typography>
                    <Typography>Keep track of your plans with a time-based schedule.</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center', padding: '20px' }}>
                    <Typography variant="h6">📷 Upload Images</Typography>
                    <Typography>Attach photos to each stop on your itinerary.</Typography>
                </Grid>
            </Grid>

            {/* How It Works Section */}
            <Grid container sx={{ height: '70vh', width: '100vw', padding: '40px' }}>
                <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Typography variant="h4">How It Works</Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', padding: '10px' }}>
                    <Typography variant="h6">Step 1: Create an Itinerary</Typography>
                    <Typography>Start by setting up a new trip with a name and basic details.</Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', padding: '10px' }}>
                    <Typography variant="h6">Step 2: Add Locations & Details</Typography>
                    <Typography>Include places, times, images, and notes to keep everything organized.</Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', padding: '10px' }}>
                    <Typography variant="h6">Step 3: Share & Enjoy</Typography>
                    <Typography>Share your itinerary with friends or access it on the go!</Typography>
                </Grid>
            </Grid>

            {/* Start Planning Section */}
            <Grid container sx={{ height: '50vh', width: '100vw', backgroundColor: '#000', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', flexDirection: 'column' }}>
                <Typography variant="h4">Start Planning Your Next Adventure!</Typography>
                <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleGetStarted}>Get Started</Button>
            </Grid>
        </div>
    )
}
export default WelcomePage;