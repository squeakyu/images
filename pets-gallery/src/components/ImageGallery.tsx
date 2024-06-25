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
`;

const SearchBar = styled.input`
  margin: 10px;
  padding: 5px;
  width: 200px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  width: 80%;
`;

const ImageGallery: React.FC = () => {
  const { pets, loading } = useFetchPets();
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

  return (
    <GalleryContainer>
      <SearchBar
        type="text"
        placeholder="Search by title or description"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <Button onClick={handleSelectAll}>Select All</Button>
        <Button onClick={handleClearSelection}>Clear Selection</Button>
        <Button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Name {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
        </Button>
        <Button onClick={handleDownload}>Download Selected</Button>
      </div>
      <ImageGrid>
        {filteredPets.map(pet => (
          <ImageItem key={pet.id} pet={pet} />
        ))}
      </ImageGrid>
    </GalleryContainer>
  );
};

export default ImageGallery;
