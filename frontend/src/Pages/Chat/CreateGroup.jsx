import React, { useState } from 'react';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName) {
      setError('Group name is required');
      return;
    }

    try {
      const response = await fetch('/api/groups/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(`Group "${result.name}" created successfully!`);
        setGroupName(''); // Reset the group name field
        setError('');
      } else {
        const result = await response.json();
        setError(result.message || 'Error creating group');
      }
    } catch (err) {
      setError('Network error: Unable to create group');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Group</h2>
        <form onSubmit={handleCreateGroup} className="space-y-4">
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-600">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
