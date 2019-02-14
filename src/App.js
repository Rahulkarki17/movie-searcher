import React, { Component } from "react";
import "./App.css";
import MovieRow from "./MovieRow.js";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log("This is my initializer");
    /* 
    const movies = [
      {
        id: 0,
        poster_src: "/../avengers2.jpg",
        title: "Avengers Inifinity War",
        overview:
          "Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sixth film in the Marvel Cinematic Universe (MCU)."
      },
      {
        id: 1,
        poster_src: "/../alita.jpg",
        title: " Alita",
        overview:
          "Set several centuries in the future, the abandoned Alita is found in the scrapyard of Iron City by Ido, a compassionate cyber-doctor who takes the unconscious cyborg Alita to his clinic. When Alita awakens, she has no memory of who she is, nor does she have any recognition of the world she finds her…"
      }
    ];

    var movieRows = [];
    movies.forEach(movie => {
      console.log(movie.title);
      const movieRow = <MovieRow movie={movie} />;
      movieRows.push(movieRow);
    });

    this.state = { rows: movieRows };
   */

    this.performSearch("Ant man");
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb");
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=ac5a2b6483b6f4e137f25c3e82a0e4dd&language=en-US&&page=1&include_adult=false&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("Fetched data successfully");
        //console.log(searchResults);
        const results = searchResults.results;
        //console.log(results);

        var movieRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          //console.log(movie.poster_path);
          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });

        this.setState({ rows: movieRows });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundOjbect = this;
    const searchTerm = event.target.value;
    this.performSearch(searchTerm);
    boundOjbect.performSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img
                  alt="app icon"
                  src="movie_play_light_green.png"
                  width="50"
                  height="50"
                />
              </td>
              <td width="8" />
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddinngTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Enter search term"
        />

        {this.state.rows}
      </div>
    );
  }
}

export default App;
