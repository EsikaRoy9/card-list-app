"use client"
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Grid,
} from '@mui/material';

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [newCard, setNewCard] = useState({ name: '', videoUrl: '' });

  const handleOpenModal = (card) => {
    setCurrentCard(card);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentCard(null);
  };

  const handleChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleAddCard = () => {
    setCards([...cards, newCard]);
    setNewCard({ name: '', videoUrl: '' });
  };

  const handleEditCard = (index) => {
    const updatedCards = [...cards];
    updatedCards[index] = newCard;
    setCards(updatedCards);
    setNewCard({ name: '', videoUrl: '' });
  };

  const handleDeleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  return (
    <div style={{background:'white'}}>
     <h1>Card List Management </h1>
      <TextField
        label="Card Name"
        name="name"
        value={newCard.name}
        onChange={handleChange}
        
        fullWidth
      />
      <TextField
        label="Video URL"
        name="videoUrl"
        style={{
            marginTop:'20px',
            marginBottom:'20px'
        }}
        value={newCard.videoUrl}
        onChange={handleChange}
        fullWidth
      />
      <Button onClick={handleAddCard} variant="contained">Add Card</Button>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{card.name}</Typography>
                <Button onClick={() => handleOpenModal(card)}>Play Video</Button>
                <Button onClick={() => handleEditCard(index)}>Edit</Button>
                <Button onClick={() => handleDeleteCard(index)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openModal} onClose={handleCloseModal} width="50vw">
        <DialogTitle>{currentCard?.name}</DialogTitle>
        <DialogContent>
            <iframe src={currentCard?.videoUrl} width="100%" controls></iframe>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardContainer;
