import React from 'react';
import styled from 'styled-components';
import { usePetContext } from '../context/PetContext';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 5px;
`;

const Checkbox = styled.input`
  margin-top: 10px;
`;

const ImageItem: React.FC<{ pet: any }> = ({ pet }) => {
  const { selectedPets, setSelectedPets } = usePetContext();

  const handleSelectionChange = (id: number) => {
    setSelectedPets(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  return (
    <ImageContainer>
      <Image src={pet.imageUrl} alt={pet.title} />
      <h3>{pet.title}</h3>
      <p>{pet.description}</p>
      <Checkbox
        type="checkbox"
        checked={selectedPets.includes(pet.id)}
        onChange={() => handleSelectionChange(pet.id)}
      />
    </ImageContainer>
  );
};

export default ImageItem;
