import { useState } from 'react';
import api from '../../api/api';

const useDelete = () => {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteItem = async (id, apiUrl) => {
    setIsLoading(true);
    try {
      const response = await api.delete(`${apiUrl}/${id}`);
      
      if (response.status === 200 || response.status === 204) {
        setMessage('Item deleted successfully!');
        setIsSuccess(true);
      } else {
        setMessage('Failed to delete the item.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('An error occurred while deleting the item.');
      setIsSuccess(false);
      console.error('Error deleting item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteItem, message, isSuccess, isLoading };
};

export default useDelete;