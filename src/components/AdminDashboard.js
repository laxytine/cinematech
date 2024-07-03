import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import AddMovie from "./AddMovie"; // Ensure this is the correct path to your AddMovie component

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);

  // Modal control functions
  const openAddMovieModal = () => setShowAddMovieModal(true);
  const closeAddMovieModal = () => setShowAddMovieModal(false);

  // Fetch all movies from API
  const retrieveAllMovies = async () => {
    try {
      const response = await fetch("http://localhost:4000/movies/getAllMovies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Update movie details
  const updateMovie = async (id) => {
    const movieToEdit = movies.find((movie) => movie._id === id);
    try {
      const response = await fetch(`http://localhost:4000/movies/updateMovie/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(movieToEdit),
      });
      const data = await response.json();
      Swal.fire({
        title: "Success",
        icon: "success",
        text: data.message,
      });
      setEditingId(null);
      retrieveAllMovies();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  // Delete movie
  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/movies/deleteMovie/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      Swal.fire({
        title: "Success",
        icon: "success",
        text: data.message,
      });
      retrieveAllMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Initial fetch of movies
  useEffect(() => {
    retrieveAllMovies();
  }, []);

  // Handle editing state and input changes
  const handleEdit = (id) => setEditingId(id);
  const handleInputChange = (event, id, field) => {
    const newValue = event.target.value;
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie._id === id ? { ...movie, [field]: newValue } : movie
      )
    );
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end">
        <Button className="btn btn-success m-2" onClick={openAddMovieModal}>
          ADD MOVIE
        </Button>
      </div>
      <AddMovie show={showAddMovieModal} onClose={closeAddMovieModal} />
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Movie Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Actors</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Image URL</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id} className={editingId === movie._id ? "editing" : ""}>
              <td>
                <input
                  type="text"
                  value={movie.title}
                  onChange={(e) => handleInputChange(e, movie._id, "title")}
                  disabled={editingId !== movie._id}
                  className="text-center text-dark"
                  style={{ background: "none", border: "none", outline: "none" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.director}
                  onChange={(e) => handleInputChange(e, movie._id, "director")}
                  disabled={editingId !== movie._id}
                  className="text-center text-dark"
                  style={{ background: "none", border: "none", outline: "none" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.year}
                  onChange={(e) => handleInputChange(e, movie._id, "year")}
                  disabled={editingId !== movie._id}
                  className="text-center text-dark"
                  style={{ background: "none", border: "none", outline: "none" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.actors}
                  onChange={(e) => handleInputChange(e, movie._id, "actors")}
                  disabled={editingId !== movie._id}
                  className="text-center text-dark"
                  style={{ background: "none", border: "none", outline: "none" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.description}
                  onChange={(e) => handleInputChange(e, movie._id, "description")}
                  disabled={editingId !== movie._id}
                  className="text-center text-dark"
                  style={{ background: "none", border: "none", outline: "none" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.genre}
                  onChange={(e) => handleInputChange(e, movie._id, "genre")}
                  disabled={editingId !== movie._id}
                  className="text-center text-dark"
                  style={{ background: "none", border: "none", outline: "none" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.imageUrl}
                  onChange={(e) => handleInputChange(e, movie._id, "imageUrl")}
                  disabled={editingId !== movie._id}
                  className="text-center text-dark"
                  style={{ background: "none", border: "none", outline: "none" }}
                />
              </td>
              <td>
                {editingId === movie._id ? (
                  <Button className="btn btn-success" onClick={() => updateMovie(movie._id)}>
                    Save
                  </Button>
                ) : (
                  <Button className="btn btn-primary" onClick={() => handleEdit(movie._id)}>
                    Edit
                  </Button>
                )}
              </td>
              <td>
                <Button className="btn btn-danger" onClick={() => deleteMovie(movie._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
