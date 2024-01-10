import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Artists.css';
import { useUser } from '../context/UserContext';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('/artists-api-controller', {
          headers: {
            Authorization: 'Basic ZGV2ZWxvcGVyOlpHVjJaV3h2Y0dWeQ==',
          },
        });

        setArtists(response.data.json);
      } catch (error) {
        setError('Error fetching artists');
        console.error('Error fetching artists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="artists-container">
      <div className="header">
        <h2 className="page-title">Artists</h2>
        <div className="menu-container">
          <button className="menu-button" onClick={handleMenuToggle}>
            <FontAwesomeIcon icon={faBars} /> Menu
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <Link to="/albums">Albums</Link>
              <button onClick={handleLogout}>
                Logout <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          )}
        </div>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <p className="loading-message">Loading artists...</p>
          </div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && (
        <div className="artist-list">
          {artists.map((artist, index) => (
            <div key={index} className="artist-item">
              <strong>Name:</strong> {artist[0].name}<br />
              <strong>Twitter:</strong> {artist[0].twitter}<br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artists;
