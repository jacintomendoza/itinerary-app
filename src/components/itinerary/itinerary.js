import { Grid, Card, CardContent, Typography, Button, Modal, Box, IconButton } from '@mui/material';
import ItineraryPlan from './itinerary-plan/itinerary-plan';
import ItineraryPictures from './itinerary-pictures/itinerary-pictures';
import ItineraryAdd from './itinerary-add/itinerary-add';
import ItineraryPlanEdit from './itinerary-plan/itinerary-plan-edit';
import { useItineraryContext } from '../../hooks/use-hooks-context';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

function Itinerary() {
    const { itineraryArray, deleteItineraryById } = useItineraryContext();
    const [addView, setAddView] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedPlanUrls, setSelectedPlanUrls] = useState({});

    const handleEditClicked = (id) => {
        setEditId(id === editId ? null : id);
    }

    const handleDeleteClicked = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        await deleteItineraryById(deleteId);
        handleCloseModal();
    }

    const handleCloseModal = () => setDeleteModal(false);

    const handleUrlSelect = (itineraryId, url) => {
        setSelectedPlanUrls(prevState => ({
            ...prevState,
            [itineraryId]: url
        }));
    };

    const onAddClicked = () => {
        setAddView(!addView);
    }

    if (!itineraryArray) {
        return <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><CircularProgress size='20vh' /></div>;
    }

    let addContent = '';
    if (addView) {
        addContent = <ItineraryAdd closeAddClicked={onAddClicked} />;
    }

    return (
        <div style={{ paddingTop: '84px' }}>

            <Modal
                open={deleteModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{ position: 'absolute', top: 5, right: 5, color: 'inherit' }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Warning</Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this itinerary?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleDelete} variant="contained" color="error" sx={{ mr: 2 }}>Delete</Button>
                        <Button onClick={handleCloseModal} variant="contained">Cancel</Button>
                    </Box>
                </Box>
            </Modal>
            <Button variant="contained" color="primary" onClick={onAddClicked}>Add itinerary</Button>
            <Grid item xs={12}>
                <Grid item xs={12}>{addContent}</Grid>
            </Grid>
            {Array.isArray(itineraryArray) && itineraryArray.map((itinerary) => (
                <Card key={itinerary._id} style={{ backgroundColor: 'grey' }} sx={{ mt: 4 }}>
                    <CardContent style={{ height: '100%', position: 'relative' }}>
                        <EditIcon style={{ cursor: 'pointer', position: 'absolute', top: 5, right: 5 }} onClick={() => handleEditClicked(itinerary._id)} />
                        <DeleteIcon style={{ cursor: 'pointer', position: 'absolute', top: 5, right: 25 }} onClick={() => handleDeleteClicked(itinerary._id)} />
                        <Typography variant="h2" component="div" align='center' gutterBottom>{itinerary.title}
                        </Typography>
                        <Grid container spacing={2} alignItems='stretch' style={{ minHeight: '400px' }}>
                            {/* Card Plan */}
                            <Grid item xs={12} sm={6}>
                                {editId === itinerary._id ? (
                                    <ItineraryPlanEdit itinerary={itinerary} onCancelEdit={() => handleEditClicked(itinerary._id)} />

                                ) : (
                                    <ItineraryPlan itinerary={itinerary} onPlanUrlSelect={(url) => handleUrlSelect(itinerary._id, url)} />
                                )}
                            </Grid>
                            {/* Card Pictures */}
                            <Grid item xs={6}><ItineraryPictures selectedPlanUrl={selectedPlanUrls[itinerary._id]} /></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
export default Itinerary;