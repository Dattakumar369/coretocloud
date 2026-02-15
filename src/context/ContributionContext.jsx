import { createContext, useContext, useState, useEffect } from 'react';

const ContributionContext = createContext();

export function ContributionProvider({ children }) {
  const [contributions, setContributions] = useState({});

  // Load contributions from localStorage on mount
  useEffect(() => {
    const savedContributions = localStorage.getItem('coretocloud_contributions');
    if (savedContributions) {
      try {
        setContributions(JSON.parse(savedContributions));
      } catch (error) {
        console.error('Error loading contributions:', error);
        setContributions({});
      }
    }
  }, []);

  // Save contributions to localStorage
  const saveContributions = (newContributions) => {
    localStorage.setItem('coretocloud_contributions', JSON.stringify(newContributions));
    setContributions(newContributions);
  };

  // Add a new topic contribution
  const addTopic = (topicData, userEmail, userName) => {
    const contribution = {
      ...topicData,
      id: `user-${Date.now()}`,
      contributedBy: {
        email: userEmail,
        name: userName,
        date: new Date().toISOString()
      },
      type: 'added',
      isUserContribution: true
    };

    const newContributions = {
      ...contributions,
      [contribution.id]: contribution
    };

    saveContributions(newContributions);
    return contribution;
  };

  // Edit an existing topic
  const editTopic = (topicId, editedData, userEmail, userName) => {
    const existingContribution = contributions[topicId];
    
    const contribution = {
      ...editedData,
      id: topicId,
      originalId: topicId,
      editedBy: {
        email: userEmail,
        name: userName,
        date: new Date().toISOString()
      },
      editHistory: [
        ...(existingContribution?.editHistory || []),
        {
          email: userEmail,
          name: userName,
          date: new Date().toISOString(),
          changes: 'Content updated'
        }
      ],
      type: 'edited',
      isUserContribution: true
    };

    const newContributions = {
      ...contributions,
      [topicId]: contribution
    };

    saveContributions(newContributions);
    return contribution;
  };

  // Get contribution for a topic
  const getContribution = (topicId) => {
    return contributions[topicId] || null;
  };

  // Get all user contributions
  const getAllContributions = () => {
    return Object.values(contributions);
  };

  // Get contributions by user email
  const getContributionsByUser = (email) => {
    return Object.values(contributions).filter(
      c => c.contributedBy?.email === email || c.editedBy?.email === email
    );
  };

  // Delete a contribution
  const deleteContribution = (topicId) => {
    const newContributions = { ...contributions };
    delete newContributions[topicId];
    saveContributions(newContributions);
  };

  // Export contributions as JSON (for backup/sharing)
  const exportContributions = () => {
    const dataStr = JSON.stringify(contributions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coretocloud-contributions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import contributions from JSON file
  const importContributions = (jsonData) => {
    try {
      const imported = JSON.parse(jsonData);
      const merged = { ...contributions, ...imported };
      saveContributions(merged);
      return true;
    } catch (error) {
      console.error('Error importing contributions:', error);
      return false;
    }
  };

  return (
    <ContributionContext.Provider value={{
      contributions,
      addTopic,
      editTopic,
      getContribution,
      getAllContributions,
      getContributionsByUser,
      deleteContribution,
      exportContributions,
      importContributions
    }}>
      {children}
    </ContributionContext.Provider>
  );
}

export function useContributions() {
  const context = useContext(ContributionContext);
  if (!context) {
    throw new Error('useContributions must be used within ContributionProvider');
  }
  return context;
}

export default ContributionContext;
