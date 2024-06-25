import { useState, useEffect } from 'react';

const mockPetsData = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1556228724-4bfe2c8f5b39',
      title: 'Dog',
      description: 'This is a dog!',
      creationDate: '2024-06-25',
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1592194996308-7f070b6db0a7',
      title: 'Cat',
      description: 'This is a cat!',
      creationDate: '2024-06-025',
    },
  ];

export const useFetchPets = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        console.log('Fetching pets...');
        // Mock the fetch call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPets(mockPetsData);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return { pets, loading, error };
};
