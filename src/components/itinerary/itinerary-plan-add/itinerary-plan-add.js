import { Card, CardContent, Typography, TextField, Button, Divider, IconButton } from '@mui/material';
import { useState } from 'react';
import useItineraryPlanContext from '../../../hooks/use-hooks-context';

function ItineraryPlanAdd({ itineraryDetail }) {

    // const { deleteItineraryPlanById, addItineraryPlan } = useItineraryPlanContext();

    const { title, days } = itineraryDetail;
    
    const [description, setDescription] = useState('');
    const [plans, setPlans] = useState([]);

    const handleChange = (index, field, value) => {
        const updatedPlans = [...plans];
        updatedPlans[index][field] = value;
        setPlans(updatedPlans);
    }

    const handleAddPlan = () => {
        const newPlan = {
            time: '',
            description: '',
            url: ''
        };
        setPlans([...plans, newPlan]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(plans);
    };

    // TODO: Add delete function
    // deleteItineraryPlanById("660116dcc97f623642699034");

    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" align='center'>Add Itinerary</Typography>
                    <Typography variant="h6">Trip</Typography>
                    <Divider sx={{ marginBottom: '20px' }} />
                    <TextField label="title" />
                    <Typography variant="h6">Days</Typography>
                    <Divider sx={{ marginBottom: '20px' }} />
                    <TextField label="location" />
                    <TextField label="date" />
                    <Typography variant="h6">Plans</Typography>
                    <Divider sx={{ marginBottom: '20px' }} />
                    {}
                    {plans.map((plan, index) => (
                        <div key={index}>
                            <Typography variant="h6">Plan {index + 1}</Typography>
                            <TextField label="time" value={plan.time} onChange={(e) => handleChange(index, 'time', e.target.value)} />
                            <TextField label="description" value={plan.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
                            <TextField label="url" value={plan.url} onChange={(e) => handleChange(index, 'url', e.target.value)} />
                        </div>
                    ))}
                    <Button onClick={handleAddPlan} aria-label="add plan">Add Plan</Button>
                    <Button type="submit" variant="contained" color="primary">Save Changes</Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default ItineraryPlanAdd;
