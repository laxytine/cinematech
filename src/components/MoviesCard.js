import React from "react";
import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import star from "../assets/images/star.png";

const MoviesCards = ({ id, imgUrl, title, director, year, casts, description, genre }) => {
  const addToFavorites = () => {
    fetch(`http://localhost:4000/movies/addToFavorites/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        movieId: id,
        movieTitle: title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Movie added to favorites successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Movie added to favorites",
          });
        } else {
          Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "Please login to continue.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred. Please try again later.",
        });
        console.error("Error adding to favorites:", error);
      });
  };

  return (
    <Card
      style={{
        width: "20rem",
        background: "transparent",
        border: "1px solid yellow",
        margin: "10px",
      }}
    >
      <Card.Img
        variant="top"
        src={imgUrl}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
        }}
        className="img-fluid"
      />
      <Card.Body>
        <Card.Title style={{ color: "gray" }}>{title}</Card.Title>
        <Card.Text style={{ color: "gray" }}>
          <strong>Director:</strong> {director}
        </Card.Text>
        <Card.Text style={{ color: "gray" }}>
          <strong>Year:</strong> {year}
        </Card.Text>
        <Card.Text style={{ color: "gray" }}>
          <strong>Cast:</strong> {casts}
        </Card.Text>
        <Card.Text style={{ color: "gray" }}>
          <strong>Genre:</strong> {genre}
        </Card.Text>
        <Card.Text style={{ color: "gray" }}>
          <strong>Description:</strong> {description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="none" onClick={addToFavorites}>
            <img src={star} alt="Add to favorites" className="img-fluid hover" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MoviesCards;
