import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../assets/css/searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:4000/movies/searchByTitle',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: searchTerm }),
        }
      );
      const data = await response.json();
      if (data.length === 0) {
        Swal.fire({
          title: "No Movies Found",
          text: "No movie matched your search criteria.",
          icon: "warning",
        });
      } else {
        onSearch(data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error fetching search results. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <Form onSubmit={handleSearch} className="search-input-container">
      <Form.Control
        type="text"
        placeholder="Search for title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <Button type="submit" className="search-button">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
