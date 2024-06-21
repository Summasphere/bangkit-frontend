import React, { useState, useRef, useEffect } from 'react';
import iconSend from './assets/icons/iconsend.png';
import iconUpload from './assets/icons/iconupload.png';
import iconLink from './assets/icons/iconlink.png';
import WordCloud from './WordCloud';
import TopicDistribution from './TopicDistribution';
import { PropagateLoader } from 'react-spinners';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'

import { toast } from 'react-toastify';

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [sourceUrl, setSourceUrl] = useState('');
  const fileInputRef = useRef(null);
  const [analyzeLength, setAnalyzeLength] = useState(3);
  const [sampleData, setSampleData] = useState(null);
  const [topicDistributionData, setTopicDistributionData] = useState(null);
  const [markdown, setMarkdown] = useState('');

  const wordCloudDataBuilder = (data) => {
    const sorted = [];
    for (var topic in data)
      sorted.push([topic, data[topic]]);

    sorted.sort((a, b) => a[1] - b[1]);
    const top80 = sorted.slice(Math.max(sorted.length - 80, 1));
    console.log(top80.length)

    const wordCloudData = {};
    top80.forEach((element) => {
      wordCloudData[element[0]] = element[1];
    });
    return wordCloudData;
  }

  const topicDistributionDataBuilder = (data) => {
    let topicDistributionData = {
      "Topic Distribution": {}
    };

    data.forEach((element) => {
      topicDistributionData["Topic Distribution"][element.topic] = element.percentage;
    });

    return topicDistributionData;
  }

  const markdownBuilder = (data) => {
    let markdown = "";

    data.forEach((element) => {
      markdown += `**${element.topic}**\n\n\n${element.detail}\n\n\n`;
    });

    return markdown;
  }

  const toggleButtonLoading = (isLoading = true) => {
    if (isLoading) {
      document.getElementById('analyzing-button-text').classList.add('hidden');
      document.getElementById('analyzing-button-spinner').classList.remove('!hidden');
      document.getElementById('analyzing-button').setAttribute('disabled', true);
    } else {
      document.getElementById('analyzing-button-text').classList.remove('hidden');
      document.getElementById('analyzing-button-spinner').classList.add('!hidden');
      document.getElementById('analyzing-button').removeAttribute('disabled');
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['application/pdf', 'text/csv', 'text/plain'];
    if (allowedTypes.includes(file.type)) {
      setFile(file);
    } else {
      alert('Please select a PDF, CSV, or TXT file.');
    }
  };

  const handleSourceUrlChange = (event) => {
    setSourceUrl(event.target.value);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const displayFileName = () => {
    if (file) {
      return (
        <div className="bg-gray-200 rounded-lg py-3 px-4 ml-3 max-w-[60%]">
          <p className="text-gray-700 text-sm truncate">{file.name}</p>
        </div>
      );
    }
    return null;
  };

  const handleLengthChange = (event) => {
    const value = parseInt(event.target.value);
    if (value < 9) {
      setAnalyzeLength(value);
    } else {
      setAnalyzeLength(10);
    }
  };

  const handleSubmit = async () => {
    toggleButtonLoading(true);

    console.log("File to process: ", file);
    console.log("Source URL: ", sourceUrl);

    const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + '/api/v1/analyzer';
    const formData = new FormData();

    formData.append('urlInput', sourceUrl);
    formData.append('file', file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    let result = await axios.post(url, formData, config).catch((error) => {
      toast.error(error.response.data.message);
      toggleButtonLoading(false);
    });

    await handleResponse(result);
  };

  const handleResponse = async (response) => {
    // if (response && response.data) {
    //   document.getElementById('summarizer-result-text').innerText = response.data.summary;
    //   document.getElementById('summarizer-result').classList.remove('hidden');
    // }

    setSampleData(wordCloudDataBuilder(response.data.data.analysis.wordcloud));
    setTopicDistributionData(topicDistributionDataBuilder(response.data.data.analysis.topic_distribution));
    setMarkdown(markdownBuilder(response.data.data.analysis.topic_distribution));

    console.log("Result: ", response)
    toggleButtonLoading(false);

    const resultSection = document.getElementById('analyzer-result');
    resultSection.classList.remove('hidden');
  }

  useEffect(() => {
    console.log("Sample Data: ", sampleData);
  }, [sampleData]); // This effect runs whenever `sampleData` changes

  useEffect(() => {
    console.log("Topic Distribution Data: ", topicDistributionData);
  }, [topicDistributionData]); // This effect runs whenever `topicDistributionData` changes

  useEffect(() => {
    console.log("Markdown: ", markdown);
  }, [markdown]); // This effect runs whenever `markdown` changes

  return (
    <div className="flex justify-center flex-col items-center">
      <section className="bg-white rounded-3xl p-6 m-4 flex flex-col items-stretch w-[50%] max-w-4xl" style={{ boxShadow: "0 6px 24px rgba(255, 255, 255, 0.5)" }}>
        <div className="flex items-center border-2 rounded-lg bg-white p-2 mb-2">
          <div className="bg-white rounded-lg p-2">
            <img src={iconLink} alt="Link" className="h-6 w-6" style={{ backgroundSize: 'auto' }} />
          </div>
          <input
            type="text"
            value={sourceUrl}
            onChange={handleSourceUrlChange}
            placeholder="www.sourcedocument.com"
            className="bg-white w-full focus:outline-none ml-3"
          />
        </div>
        <div className="flex items-center justify-center mb-2">
          <div className="flex-1 border-t-2 ml-4 mr-1 border-gray-300"></div>
          <p className="px-3 text-black text-m">or</p>
          <div className="flex-1 border-t-2 ml-1 mr-4 border-gray-300"></div>
        </div>
        <div
          className={`flex items-center justify-center border-2 rounded-lg bg-white p-2 mb-4 cursor-pointer ${file ? 'py-4' : ''}`}
          onClick={handleFileUpload}
        >
          <div className="flex items-center">
            <img src={iconUpload} alt="Upload" className="h-4.5 w-4.5 mr-3" style={{ backgroundSize: 'auto', backgroundColor: 'transparent' }} />
            {!file && <span className="text-gray-500">Upload pdf, csv, txt</span>}
          </div>
          {displayFileName()}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.csv,.txt"
            className="hidden"
          />
        </div>
        <button
          id="analyzing-button"
          className="bg-gradient-to-bl from-[#7ED4EF] via-[#298BD0] to-[#0169C2] text-white text-lg font-bold py-2 px-4 rounded-2xl hover:bg-blue-600 min-h-[40px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
        >
          <span id='analyzing-button-text' className='flex flex-row'>
            <img src={iconSend} alt="Send" className="mr-3" width={24} height={18} style={{ backgroundSize: 'auto' }} />
            Start Analyzing
          </span>
          <PropagateLoader color="#ffffff" id='analyzing-button-spinner' size={10} className='!hidden top-[-5px]' />
        </button>
      </section>

      {/* <section id="analyzer-result" className="flex flex-col items-center">
        <h2 className="text-2xl montserrat font-bold text-white" id="analyzer-result-label">
          Analyzed document results
        </h2>
        <div
          className="bg-white shadow-md rounded-3xl p-6 m-4 flex flex-col items-stretch w-full max-w-4xl"
          id="analyzer-result-text"
        ></div>
      </section> */}

      <div id="analyzer-result" className="hidden flex justify-center w-full max-w-4xl h-[1000px]">
        <div className="w-1/2 mr-4 h-full">
          <div className="bg-white rounded-lg h-full overflow-hidden">
            <div className='h-full p-4 overflow-y-scroll [scrollbar-width:thin] [scrollbar-color:#808080_#FFFFFF]'>
              <ReactMarkdown children={markdown} className="react-markdown-test" />
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-4 flex flex-col">
          <div className="bg-white rounded-lg p-4 mb-4 h-1/2">
            <TopicDistribution topicDistributionData={topicDistributionData} />
          </div>
          <div className="bg-white rounded-lg p-4 mt-4 h-1/2">
            <WordCloud sampleData={sampleData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyzer;