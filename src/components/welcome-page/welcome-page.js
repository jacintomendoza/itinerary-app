import { useNavigate } from 'react-router-dom';

function WelcomePage() {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/itinerary', { replace: true })
    }

    return (
        <div style={{ paddingTop: '84px' }}>

            <button onClick={handleGetStarted}>Get Started</button>
        </div>
    )
}
export default WelcomePage;