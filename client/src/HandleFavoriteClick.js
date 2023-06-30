const handleFavoriteClick = (locationId, isFavorite) => {
    const requestBody = {
      location_id: locationId
    };
  
    const endpoint = isFavorite ? '/userfavorites/delete' : '/userfavorites';
  
    fetch(endpoint, {
      method: isFavorite ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error ${isFavorite ? 'removing' : 'adding'} location to favorites: ${response.status}`);
        }
        // Handle success or update state accordingly
      })
      .catch(error => {
        console.error(`Error ${isFavorite ? 'removing' : 'adding'} location to favorites:`, error);
      });
  };
  
  export default handleFavoriteClick;