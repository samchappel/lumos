import React, { useState } from 'react';

const GalleryHover = ({ photo, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="bg-base-100 rounded overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => openModal(photo)}
    >
      <img
        src={photo.image}
        alt={photo.caption}
        onError={(e) => e.target.src = '/Lumos (2).png'}
        className="w-full h-auto max-h-60 object-cover cursor-pointer"
      />
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
          <div className="bg-black bg-opacity-50 rounded flex items-center justify-center p-4">
            <p className="text-white font-bold text-lg">Add/View Comments</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryHover;