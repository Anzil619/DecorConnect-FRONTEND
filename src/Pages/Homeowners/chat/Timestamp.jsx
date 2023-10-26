import React from 'react';

function Timestamp({ message }) {

    const timestampString = message.timestamp;
    const [hours, minutes, seconds] = timestampString.split(":");
    const formattedTimestamp = `${hours}:${minutes}:${seconds}`;

  return (
    <div className="flex justify-end mr-6 mb-2">
      <h1 className="text-xs font-serif text-gray-500">{formattedTimestamp}</h1>
    </div>
  );
}

export default Timestamp;
