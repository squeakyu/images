import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchPets } from '../hooks/useFetchPets';
import { usePetContext } from '../context/PetContext';
import ImageItem from './ImageItem';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchBar = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 300px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const ImageGallery: React.FC = () => {
  const { pets, loading, error } = useFetchPets();
  const { selectedPets, setSelectedPets, searchQuery, setSearchQuery } = usePetContext();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSelectAll = () => {
    setSelectedPets(pets.map(pet => pet.id));
  };

  const handleClearSelection = () => {
    setSelectedPets([]);
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    for (const pet of pets.filter(pet => selectedPets.includes(pet.id))) {
      const response = await fetch(pet.imageUrl);
      const blob = await response.blob();
      zip.file(`${pet.title}.jpg`, blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'images.zip');
  };

  const filteredPets = pets
    .filter(pet => pet.title.includes(searchQuery) || pet.description.includes(searchQuery))
    .sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <GalleryContainer>
      <h1>Pet Gallery</h1>
      <SearchBar
        type="text"
        placeholder="Search by title or description"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ButtonGroup>
        <Button onClick={handleSelectAll}>Select All</Button>
        <Button onClick={handleClearSelection}>Clear Selection</Button>
        <Button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Name {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
        </Button>
        <Button onClick={handleDownload}>Download Selected</Button>
      </ButtonGroup>
      <ImageGrid>
        {filteredPets.map(pet => (
          <ImageItem key={pet.id} pet={pet} />
        ))}
      </ImageGrid>
    </GalleryContainer>
  );
};

export default ImageGallery;
