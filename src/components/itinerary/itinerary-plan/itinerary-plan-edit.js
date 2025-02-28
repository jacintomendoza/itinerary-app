import { Card, CardContent, Typography, TextField, Box, Button, Input, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useItineraryContext } from '../../../hooks/use-hooks-context';
import { useMediaContext } from '../../../hooks/use-hooks-context';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';

const moment = require('moment');

function ItineraryPlanEdit({ itinerary, onCancelEdit }) {
    const { updateItineraryById, localUpdateItineraryById } = useItineraryContext();
    const { uploadMedia, deleteMedia } = useMediaContext();

    const handleSave = async (e) => {
        e.preventDefault();
        await updateItineraryById(itinerary._id, itinerary);
        onCancelEdit();
    };

    const handleAddDay = () => {
        const newDay = { date: dayjs().toISOString(), location: '', plans: [] };
        const updatedItinerary = { ...itinerary };
        updatedItinerary.days.push(newDay);
        localUpdateItineraryById(itinerary._id, updatedItinerary);
    };

    const handleAddPlan = (dayIndex, planIndex) => {
        const updatedItinerary = { ...itinerary };
        const updatedPlans = [...updatedItinerary.days[dayIndex].plans];
        updatedPlans.splice(planIndex, 0, { time: '', description: '', url: '' });
        updatedItinerary.days[dayIndex] = {
            ...updatedItinerary.days[dayIndex],
            plans: updatedPlans,
        };
        localUpdateItineraryById(itinerary._id, updatedItinerary);
    };

    const handleDeletePlan = (dayIndex, planIndex) => {
        const updatedItinerary = { ...itinerary };
        const updatedPlans = [...updatedItinerary.days[dayIndex].plans];
        updatedPlans.splice(planIndex, 1);
        updatedItinerary.days[dayIndex] = {
            ...updatedItinerary.days[dayIndex],
            plans: updatedPlans,
        };
        localUpdateItineraryById(itinerary._id, updatedItinerary);
    };

    const handleUpload = async (e, dayIndex, planIndex) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const mediaInfo = await uploadMedia(file);
            itinerary.days[dayIndex].plans[planIndex].url = mediaInfo.downloadURL;
            itinerary.days[dayIndex].plans[planIndex].fileName = mediaInfo.filename;
        } catch (error) {
            console.error('Error uploading media:', error);
        }
    };

    const handleDeleteMediaClicked = async (fileUrl, dayIndex, planIndex) => {
        if (!fileUrl) return;
        try {
            await deleteMedia(fileUrl);
            const updatedItinerary = { ...itinerary };
            delete updatedItinerary.days[dayIndex].plans[planIndex].url;
            delete updatedItinerary.days[dayIndex].plans[planIndex].fileName;
            localUpdateItineraryById(itinerary._id, updatedItinerary);
        } catch (error) {
            console.error('Error deleting media:', error);
        }
    };


    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Typography color="text.secondary" component="div">
                    <form onSubmit={handleSave}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField
                                sx={{ marginTop: '10px' }}
                                label="Title"
                                defaultValue={itinerary.title}
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    const value = e.target.value;
                                    itinerary.title = value;
                                }} />
                            <AnimatePresence>
                                {itinerary.days.map((day, dayIndex) => (
                                    <motion.div
                                        key={day._id}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                                    >
                                        <Box key={day._id} sx={{ backgroundColor: 'pink', border: '1px solid black', borderRadius: '10px', padding: '10px', mb: 1, mt: 1 }}>
                                            <Box component='div' textAlign="left" sx={{ borderRadius: '10px' }}>
                                                <Box className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Date"
                                                            defaultValue={dayjs(moment(day.date).toDate())}
                                                            onChange={(date) => {
                                                                itinerary.days[dayIndex].date = date.toISOString();
                                                            }} />
                                                    </LocalizationProvider>
                                                    <TextField
                                                        label="Location"
                                                        defaultValue={day.location}
                                                        variant="standard"
                                                        fullWidth
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            itinerary.days[dayIndex].location = value;
                                                        }} />
                                                </Box>
                                            </Box>
                                            <AnimatePresence>

                                                {day.plans.map((plan, planIndex) => (
                                                    <motion.div
                                                        key={plan._id}
                                                        initial={{ opacity: 0, y: -20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                                                    >
                                                        <Tooltip title="Add Plan">
                                                            <Button
                                                                sx={{
                                                                    borderRadius: '50%',
                                                                    minWidth: '20px',
                                                                    height: '20px',
                                                                    padding: '0',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    position: 'relative',
                                                                    margin: '0 auto',
                                                                }}
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => handleAddPlan(dayIndex, planIndex)}>
                                                                <Typography>
                                                                    +
                                                                </Typography>
                                                            </Button>
                                                        </Tooltip>
                                                        <TextField
                                                            label="Time"
                                                            defaultValue={plan.time}
                                                            variant="standard"
                                                            fullWidth
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                itinerary.days[dayIndex].plans[planIndex].time = value;
                                                            }}
                                                        />
                                                        <TextField
                                                            label="Description"
                                                            defaultValue={plan.description}
                                                            variant="standard"
                                                            fullWidth
                                                            multiline
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                itinerary.days[dayIndex].plans[planIndex].description = value;
                                                            }}
                                                        />
                                                        <div>
                                                            <label htmlFor={`upload-media-${dayIndex}-${planIndex}`}>
                                                                Upload Media:
                                                            </label>
                                                            <Input
                                                                type="file"
                                                                id={`upload-media-${dayIndex}-${planIndex}`}
                                                                onChange={(e) => handleUpload(e, dayIndex, planIndex)}
                                                            />
                                                            <span>{plan.fileName}</span>
                                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteMediaClicked(itinerary.days[dayIndex].plans[planIndex].url, dayIndex, planIndex)} />
                                                        </div>

                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleDeletePlan(dayIndex, planIndex)}>
                                                            Delete Plan
                                                        </Button>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                            <Tooltip title="Add Plan">
                                                <Button
                                                    sx={{
                                                        borderRadius: '50%',
                                                        minWidth: '20px',
                                                        height: '20px',
                                                        padding: '0',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        position: 'relative',
                                                        margin: '0 auto',
                                                    }}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleAddPlan(dayIndex, day.plans.length)}>
                                                    <Typography>
                                                        +
                                                    </Typography>
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddDay}>
                                    Add Day
                                </Button>
                            </Box>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                            <Button variant="contained" type="submit">Save</Button>
                        </Box>
                    </form>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ItineraryPlanEdit;