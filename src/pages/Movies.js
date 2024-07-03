import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import "../assets/css/movies.css";
import AdminDashboard from "../components/AdminDashboard";
import MoviesCards from "../components/MoviesCard";
import SearchBar from "../components/SearchBar";
import Favorite from "../components/Favorite";

export default function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const token = localStorage.getItem("token");

  useEffect(() => {
    retrieveMovies();
  }, []);

  const retrieveMovies = async () => {
    try {
      const response = await fetch('http://localhost:4000/movies/getAllMovies', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving movies:", error);
      setLoading(false);
    }
  };

  const handleSearch = (data) => {
    setMovies(data);
  };

  const handleViewAll = () => {
    retrieveMovies();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4 min-vh-100">
        <Spinner animation="border" className="text-white" />
      </div>
    );
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="bg bg-feature">
      <SearchBar onSearch={handleSearch} />
      <div className="container min-vh-100">
        <div className="row">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div className="col-md-4 mt-5" key={movie._id}>
                <MoviesCards
                  imgUrl={movie.imageUrl}
                  title={movie.title}
                  director={movie.director}
                  year={movie.year}
                  actors={movie.actors}
                  description={movie.description}
                  genre={movie.genre}
                  id={movie._id}
                />
                {token && <Favorite movieId={movie._id} />}
              </div>
            ))
          ) : (
            <div className="text-center text-white mt-5 no-movies">
              <p className="nomovie">No movie found.</p>
              <Button className="view" variant="warning" onClick={handleViewAll}>
                View All Movies
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
