import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PetContextProps {
  selectedPets: number[];
  setSelectedPets: React.Dispatch<React.SetStateAction<number[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const PetContext = createContext<PetContextProps | undefined>(undefined);

interface PetProviderProps {
  children: ReactNode;
}

export const PetProvider: React.FC<PetProviderProps> = ({ children }) => {
  const [selectedPets, setSelectedPets] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <PetContext.Provider value={{ selectedPets, setSelectedPets, searchQuery, setSearchQuery }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = (): PetContextProps => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
};
