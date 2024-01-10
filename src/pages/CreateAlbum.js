import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createAlbum } from '../components/api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateAlbum.css';

const CreateAlbum = () => {
  const [artists, setArtists] = useState([]);
  const [albumData, setAlbumData] = useState({
    artist: '',
    albumName: '',
    year: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Inicia como true para exibir o spinner inicialmente

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('/artists-api-controller', {
          headers: {
            Authorization: 'Basic ZGV2ZWxvcGVyOlpHVjJaV3h2Y0dWeQ==',
          },
        });

        setArtists(response.data.json);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching artists');
        console.error('Error fetching artists:', error);
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!albumData.artist || !albumData.albumName || !albumData.year) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await createAlbum(albumData);

      setSuccess('Album created successfully');
      console.log('Album created successfully:', response);

      setAlbumData({
        artist: '',
        albumName: '',
        year: '',
      });

      setError(null);
    } catch (error) {
      setError(error.message || 'An error occurred during album creation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Link
        to="/albums"
        className="btn btn-secondary mb-3"
        style={{ background: 'none', border: 'none', float: 'right' }}
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} /> Back to Albums
      </Link>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create New Album</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}
          {isLoading ? (
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" />
              <p>Loading artists...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="artist" className="form-label">
                  Artist:
                </label>
                <select
                  name="artist"
                  id="artist"
                  className="form-select"
                  value={albumData.artist}
                  onChange={handleChange}
                >
                  <option value="">Select an artist</option>
                  {artists.map((artist, index) => (
                    <option key={index} value={artist[0].name}>
                      {artist[0].name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="albumName" className="form-label">
                  Album Name:
                </label>
                <input
                  name="albumName"
                  type="text"
                  className="form-control"
                  id="albumName"
                  value={albumData.albumName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="year" className="form-label">
                  Year:
                </label>
                <input
                  name="year"
                  type="text"
                  className="form-control"
                  id="year"
                  value={albumData.year}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Creating Album...' : 'Create Album'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAlbum;
