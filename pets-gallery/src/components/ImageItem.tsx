import React from 'react';
import styled from 'styled-components';
import { usePetContext } from '../context/PetContext';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 8px;
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
