import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Markdown from 'markdown-to-jsx';

const SummarizerHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const summary = location.state?.summary || "No summary available.";

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-[#0B001A] to-[#0A2A43]">
      <img src="/src/assets/mainpages.png" className='-top-12 absolute w-full z-10' alt="Background" />
      <Header activeTab="summarizer" />
      <div className="flex-grow flex justify-center items-start z-10 pt-10">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={handleBack}
              className="text-white text-lg hover:text-gray-300"
            >
              ← Back
            </button>
            <h1 className="text-4xl montserrat font-bold text-white text-center">Summary History</h1>
            <div className="w-16"></div> {/* This empty div is to balance the "Back" button */}
          </div>
          <section className='flex flex-col items-center'>
            <div className="bg-white shadow-md rounded-3xl p-6 m-4 flex flex-col items-stretch w-full">
              <Markdown className="react-markdown-test">{summary}</Markdown>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SummarizerHistory;