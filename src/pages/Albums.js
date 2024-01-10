import React, { useState, useEffect } from 'react';
import { getAlbums, deleteAlbum, updateAlbum } from '../components/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faPlus, faEdit, faTrash, faCheck, faX, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './Albums.css';
import { useUser } from '../context/UserContext';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const { user } = useUser();
  const { logoutUser } = useUser();
  const [editedAlbum, setEditedAlbum] = useState({
    albumName: '',
    artist: '',
    year: '',
  });
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false);
  const navigate = useNavigate();

  const fetchAlbums = async () => {
    try {
      setIsLoadingAlbums(true);
      const response = await getAlbums();
      setAlbums(response);
      console.log('Albums loaded successfully:', response);
    } catch (error) {
      setError(error);
      console.error('Error fetching albums:', error);
    } finally {
      setIsLoadingAlbums(false);
    }
  };

  useEffect(() => {
    console.log('User data:', user);
  }, [user]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleDeleteAlbum = async (albumId) => {
    try {
      await deleteAlbum(albumId);
      fetchAlbums();
      console.log('Album deleted successfully:', albumId);
    } catch (error) {
      setError(error);
      console.error('Error deleting album:', error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNewAlbum = () => {
    navigate('/create-album');
  };

  const handleEditAlbum = (albumId) => {
    setEditingAlbumId(albumId);
    const albumToEdit = albums.find((album) => album.id === albumId);
    setEditedAlbum({ ...albumToEdit });
  };

  const handleSaveEdit = async () => {
    try {
      await updateAlbum(editedAlbum);
      setEditingAlbumId(null);
      fetchAlbums();
      console.log('Successful album editing');
    } catch (error) {
      setError(error);
      console.error('Error saving album edit:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAlbumId(null);
    setEditedAlbum({
      albumName: '',
      artist: '',
      year: '',
    });
  };

  return (
    <div className="albums-container">
      <div className="header">
        <h2 className="page-title">Albums</h2>
        <div className="menu-container">
          <button className="new-album-button" onClick={handleNewAlbum}>
            <FontAwesomeIcon icon={faPlus} /> New Album
          </button>
          <button className="menu-button" onClick={handleMenuToggle}>
            <FontAwesomeIcon icon={faBars} /> Menu
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <Link to="/artists">Artists</Link>
              <button onClick={handleLogout}>
                Logout <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          )}
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="album-list">
        {albums.map((album) => (
          <div key={album.id} className="album-item">
            <div className="album-actions">
              {editingAlbumId !== album.id && (
                <button
                  className="edit-button"
                  onClick={() => handleEditAlbum(album.id)}
                  disabled={editingAlbumId !== null}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
              {editingAlbumId === album.id && (
                <>
                  <button
                    className="save-button"
                    onClick={handleSaveEdit}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className="cancel-button"
                    onClick={handleCancelEdit}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </>
              )}
              {editingAlbumId !== album.id && user === 'admin' && (
                <button
                  className="delete-button"
                  onClick={() => handleDeleteAlbum(album.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
            <strong>Album Name: </strong> 
            {editingAlbumId === album.id ? (
              <input
                type="text"
                value={editedAlbum.albumName}
                onChange={(e) =>
                  setEditedAlbum({ ...editedAlbum, albumName: e.target.value })
                }
              />
            ) : (
              album.albumName
            )}
            <br />
            <strong>Artist: </strong>
            {editingAlbumId === album.id ? (
              <input
                type="text"
                value={editedAlbum.artist}
                onChange={(e) =>
                  setEditedAlbum({ ...editedAlbum, artist: e.target.value })
                }
                disabled
              />
            ) : (
              album.artist
            )}
            <br />
            <strong>Year: </strong>
            {editingAlbumId === album.id ? (
              <input
                type="text"
                value={editedAlbum.year}
                onChange={(e) =>
                  setEditedAlbum({ ...editedAlbum, year: e.target.value })
                }
              />
            ) : (
              album.year
            )}
            <br />
          </div>
        ))}
      </div>
      {isLoadingAlbums ? (
        <div className="loading-overlay">
          <div className="loading-container text-center">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <p className="loading-message">Loading...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Albums;
