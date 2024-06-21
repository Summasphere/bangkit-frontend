import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ReactMarkdown from 'react-markdown';
import WordCloud from '../WordCloud';
import TopicDistribution from '../TopicDistribution';

const AnalyzerHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis || {
    markdown: "No analysis available.",
    topicDistribution: { "Topic Distribution": {} },
    wordCloud: {}
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-[#0B001A] to-[#0A2A43]">
      <img src="/src/assets/mainpages.png" className='-top-12 absolute w-full z-10' alt="Background" />
      <Header activeTab="analyzer" />
      <div className="flex-grow flex justify-center items-start z-10 pt-10">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={handleBack}
              className="text-white text-lg hover:text-gray-300"
            >
              ← Back
            </button>
            <h1 className="text-4xl montserrat font-bold text-white text-center">Analysis History</h1>
            <div className="w-16"></div>
          </div>

          <div className="flex justify-center w-full h-[1000px]">
            <div className="w-1/2 mr-4 h-full">
              <div className="bg-white rounded-lg h-full overflow-hidden">
                <div className='h-full p-4 overflow-y-scroll [scrollbar-width:thin] [scrollbar-color:#808080_#FFFFFF]'>
                  <ReactMarkdown children={analysis.markdown} className="react-markdown-test" />
                </div>
              </div>
            </div>
            <div className="w-1/2 ml-4 flex flex-col">
              <div className="bg-white rounded-lg p-4 mb-4 h-1/2">
                <TopicDistribution topicDistributionData={analysis.topicDistribution} />
              </div>
              <div className="bg-white rounded-lg p-4 mt-4 h-1/2">
                <WordCloud sampleData={analysis.wordCloud} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyzerHistory;