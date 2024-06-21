import React from 'react';

// Sample history data
const sampleHistoryData = {
  summarizer: [
    "Here's a brief summary of the most important points. This might be a really long text to test how the design looks when the text exceeds the container width.",
    "This summary reflects the key insights from the discussion."
  ],
  analyzer: [
    "Analysis of the current data trends and their implications. Again, let's make this really long to see the effect of text overflow handling in a beautiful way.",
    "Detailed examination and interpretation of the results."
  ]
};

const History = ({ activeTab }) => {
  // Function to handle click events on history items
  const handleHistoryItemClick = (item) => {
    console.log("Clicked on history item:", item); // Example action, replace with your actual function
  };

  const renderHistory = () => {
    if (!activeTab || !sampleHistoryData[activeTab]) {
      return null;
    }

    const dataToDisplay = sampleHistoryData[activeTab];
    return (
      <div className="px-4 flex flex-col">
        {dataToDisplay.map((item, index) => (
          <div
            key={index}
            className={`
            py-2.5 px-6 text-base cursor-pointer truncate overflow-hidden font-normal rounded-xl text-black
            hover:bg-gradient-to-bl hover:from-[#7ED4EF] hover:via-[#298BD0] hover:to-[#0169C2] hover:text-white
            `}
            onClick={() => handleHistoryItemClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#fafafa] text-black font-bold text-lg mb-1 px-0 pt-4">
      <div className="px-4">
        History
        <hr className="relative flex justify-center w-full h-[2px] mx-auto bg-[hsla(0,0%,0%,0.2)] border-0 rounded md:mb-4 dark:white mt-1"></hr>
      </div>
      {renderHistory()}
    </div>
  );
};

export default History;