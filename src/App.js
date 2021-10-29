import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  //* STATE
  const [albums, setAlbums] = useState([]);
  const [id, setId] = useState(1);
  const [gotAlbum, setGotAlbum] = useState(false);
  let albumId = [];

  //! EFFECTS
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/photos`
        );
        setAlbums(res.data);
      } catch (e) {
        console.log(`Error getting data ${e}`);
      }
    };
    getData();
  }, []);

  const getAlbumId = () => {
    for (let id of albums) {
      //   console.log(id.albumId)
      if (!albumId[id.albumId]) {
        albumId.push(id.albumId);
      }
    }

    albumId.shift();
  };
  console.log(albumId);
  getAlbumId();

  const handleChange = async (e) => {
    e.preventDefault();

    const { value } = e.target;

    setId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
      );
      setAlbums(res.data);
      setGotAlbum(true);
    } catch (e) {
      console.log(`Error getting specific album. ${e}`);
    }
    setGotAlbum(true);
  };

  return (
    <div className="body">
      <div className="header">
        <h1>Albums</h1>
        <form onSubmit={handleSubmit}>
          <label>Select Album: </label>
          <select onChange={handleChange}>
            {albumId.map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
          <button type="submit">Enter</button>
        </form>
      </div>

      {gotAlbum && <h1 className="albumID">Album {id}</h1>}
      <div className="center">
        {gotAlbum &&
          albums.map((data) => (
            <div className="card" key={data.id}>
              <p>{data.id}</p>
              <div className="title">
                <h2>{data.title}</h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
