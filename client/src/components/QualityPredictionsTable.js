import React from 'react';

const QualityPredictionsTable = () => {

    const qualityDescriptions = [
        { quality: 'Poor', percentage: '0-25%', description: 'Little to no color, with precipitation or a thick cloud layer often blocking a direct view of the sun.' },
        { quality: 'Fair', percentage: '25-50%', description: 'Some color for a short time, with conditions ranging from mostly cloudy, or hazy, to clear, with little to no clouds at all levels.' },
        { quality: 'Good', percentage: '50-75%', description: 'A fair amount of color, often multi-colored, lasting a considerable amount of time. Often caused by scattered clouds at multiple levels.' },
        { quality: 'Great', percentage: '75-100%', description: 'Extremely vibrant color lasting 30 minutes or more. Often caused by multiple arrangements of clouds at multiple levels, transitioning through multiple stages of vivid color.' }
      ];

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Quality (%)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>{qualityDescriptions[0].quality} ({qualityDescriptions[0].percentage})</th>
            <td>{qualityDescriptions[0].description}</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>{qualityDescriptions[1].quality} ({qualityDescriptions[1].percentage})</th>
            <td>{qualityDescriptions[1].description}</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>{qualityDescriptions[2].quality} ({qualityDescriptions[2].percentage})</th>
            <td>{qualityDescriptions[2].description}</td>
          </tr>
          {/* row 4 */}
          <tr>
            <th>{qualityDescriptions[3].quality} ({qualityDescriptions[3].percentage})</th>
            <td>{qualityDescriptions[3].description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QualityPredictionsTable;