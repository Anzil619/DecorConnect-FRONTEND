import React from 'react'
import { useState } from 'react';


function ReadMore({ text, maxLines }) {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
      setShowMore(!showMore);
    };
  
    const shouldShowButton = text.split('\n').length > maxLines;
  
    const textToShow = showMore ? text : text.split('\n').slice(0, maxLines).join('\n');
    const buttonText = showMore ? 'Read Less' : 'Read More';
  
    return (
      <div className="mt-2">
        <p className="whitespace-normal text-md font-serif" style={{ display: showMore ? 'block' : '-webkit-box', WebkitLineClamp: maxLines, overflow: 'hidden' }}>
          {textToShow}
        </p>
        {shouldShowButton && (
          <button onClick={toggleShowMore} className="text-blue-500 underline">
            {buttonText}
          </button>
        )}
      </div>
    );
  }


export default ReadMore