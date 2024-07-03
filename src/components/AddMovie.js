import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const AddMovie = ({ show, onClose }) => {
  const [movieData, setMovieData] = useState({
    title: "",
    director: "",
    year: "",
    actors: "",
    description: "",
    genre: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/movies/addMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(movieData),
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Movie added successfully",
        });
        onClose();
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: data.message,
        });
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="director">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              name="director"
              value={movieData.director}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="text"
              name="year"
              value={movieData.year}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="actors">
            <Form.Label>Actors</Form.Label>
            <Form.Control
              type="text"
              name="actors"
              value={movieData.actors}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={movieData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={movieData.genre}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={movieData.imageUrl}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Movie
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMovie;
