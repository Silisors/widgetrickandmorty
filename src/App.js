import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch('https://rickandmortyapi.com/api/character?limit=5')
        .then(response => response.json())
        .then(data => {
          setCharacters(data.results);
          setIsLoading(false);
        })
        .catch(err => {
          setError('Error al cargar los personajes');
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="rick-and-morty-container">
      <button onClick={openModal}>Ver personajes de Rick and Morty</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Personajes de Rick and Morty</h2>
            <button className="close-button" onClick={closeModal}>X</button>
            
            {isLoading ? (
              <p>Cargando personajes...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="character-list">
                {characters.map(character => (
                  <div key={character.id} className="character-card">
                    <img src={character.image} alt={character.name} />
                    <h3>{character.name}</h3>
                    <p><strong>Especie:</strong> {character.species}</p>
                    <p><strong>Estado:</strong> {character.status}</p>
                  </div>
                ))}
              </div>
            )}
            <button className="close-modal-button" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;