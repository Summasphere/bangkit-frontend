import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'
import { PropagateLoader } from 'react-spinners';
import React, { useState, useRef, useEffect } from 'react';
import iconLink from './assets/icons/iconlink.png';
import iconSend from './assets/icons/iconsend.png';
import iconUpload from './assets/icons/iconupload.png';

import { toast } from 'react-toastify';

const Summarizer = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [markdown, setMarkdown] = useState('')
  const textareaRef = useRef(null);
  const [isBasic, setIsBasic] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const textarea = textareaRef.current;
    textarea.addEventListener('input', handleResize);
    return () => {
      textarea.removeEventListener('input', handleResize);
    };
  }, []);

  const clearInputs = () => {
    setInputText('');
    setSourceUrl('');
    setFile(null);
  }

  const handleInputChange = (event) => {
    clearInputs();
    setInputText(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['application/pdf', 'text/csv', 'text/plain'];
    if (allowedTypes.includes(file.type)) {
      clearInputs();
      setFile(file);
    } else {
      toast.error('Please select a PDF, CSV, or TXT file.');
    }
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

  const toggleButtonLoading = (isLoading = true) => {
    if (isLoading) {
      document.getElementById('summarizer-result').classList.add('hidden');
      document.getElementById('summarizing-button-text').classList.add('hidden');
      document.getElementById('summarizing-button-spinner').classList.remove('!hidden');
      document.getElementById('summarizing-button').setAttribute('disabled', true);
    } else {
      document.getElementById('summarizing-button-text').classList.remove('hidden');
      document.getElementById('summarizing-button-spinner').classList.add('!hidden');
      document.getElementById('summarizing-button').removeAttribute('disabled');
    }
  }

  const handleSubmit = async () => {
    toggleButtonLoading(true);
    console.log("Processing text: ", inputText);
    console.log("Source URL: ", sourceUrl);
    console.log("File to process: ", file);

    const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + '/api/v1/summary';
    const formData = new FormData();

    if (inputText != "")
      formData.append('textInput', inputText);
    if (sourceUrl != "")
      formData.append('urlInput', sourceUrl);
    if (file != null) {
      formData.append('file', file);
      console.log("file uploaded")
    }
    formData.append('model', isBasic ? 'basic' : 'ultra');

    console.log(formData)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    let result = await axios.post(url, formData, config).catch((error) => {
      console.log("Error: ", error)
      toast.error(error.response.data.message);
      toggleButtonLoading(false);
    });

    console.log("Result: ", result.data.summary)
    await handleResponse(result);
  };

  const handleSourceUrlChange = (event) => {
    clearInputs();
    setSourceUrl(event.target.value);
  };

  const handleResponse = async (result) => {
    toggleButtonLoading(false);
    let data = result.data.data.summary;
    console.log(data);
    data.replace(/\n/gi, '<br />')
    data = data.replace(/\$\$([^$]+)\$\$/g, '```latex\n$1\n```');

    setMarkdown(data)
    console.log(data);
    const resultSection = document.getElementById('summarizer-result');
    resultSection.classList.remove('hidden');
    setTimeout(() => {
      const element = document.getElementById('summarizer-result-label');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  return (
    <div className="flex justify-center flex-col">
      <section className="mx-auto bg-white rounded-3xl p-6 my-4 flex flex-col items-stretch w-[50%] max-w-4xl" style={{ boxShadow: "0 6px 24px rgba(255, 255, 255, 0.5)" }}>
        <div className="flex items-center border-2 rounded-lg bg-white p-2 mb-2">
          <textarea
            ref={textareaRef}
            className="bg-white w-full focus:outline-none resize-y overflow-auto min-h-32 max-h-32 mt-1 ml-1"
            placeholder="Input the text to be summarized..."
            value={inputText}
            onChange={handleInputChange}
            rows={1}
          />
        </div>
        <div className="flex items-center justify-center mb-2">
          <div className="flex-1 border-t-2 ml-4 mr-1 border-gray-300"></div>
          <p className="px-3 text-black text-m">or</p>
          <div className="flex-1 border-t-2 ml-1 mr-4 border-gray-300"></div>
        </div>
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
        <div className="flex flex-col items-center mb-5">
          <p className="text-black text-m mb-2">Choose your model</p>
          <div className="flex justify-center">
            <button
              className={`px-16 py-3 rounded-2xl mr-5 ${isBasic ? 'bg-gradient-to-bl from-[#7ED4EF] via-[#298BD0] to-[#0169C2] text-white font-bold' : 'bg-gray-300 text-gray-700'}`}
              onClick={() => setIsBasic(true)}
              disabled={isBasic}
            >
              Basic
            </button>
            <button
              className={`px-16 py-3 rounded-2xl ml-5 ${isBasic ? 'bg-gray-300 text-gray-700' : 'bg-gradient-to-br from-[#BA55D3] via-[#9B30FF] to-[#6B0AC9] text-white font-bold shadow-md shadow-[#5B5FC7]'}`}
              onClick={() => setIsBasic(false)}
              disabled={!isBasic}
            >
              Ultra
            </button>
          </div>
        </div>
        <button
          className="bg-gradient-to-bl from-[#7ED4EF] via-[#298BD0] to-[#0169C2] text-white text-lg font-bold py-2 px-4 rounded-2xl hover:bg-blue-600 min-h-[40px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          id="summarizing-button"
          onClick={handleSubmit}
        >
          <span id='summarizing-button-text' className='flex flex-row'>
            <img src={iconSend} alt="Send" className="mr-3" width={30} height={18} />
            Start Summarization
          </span>
          <PropagateLoader color="#ffffff" id='summarizing-button-spinner' size={10} className='!hidden top-[-5px]' />
        </button>
      </section>

      <section id="summarizer-result" className='hidden flex flex-col items-center'>
        <h2 className='text-2xl montserrat font-bold text-white' id="summarizer-result-label">Summarized text results</h2>
        <div className="bg-white shadow-md rounded-3xl p-6 m-4 flex flex-col items-stretch w-full max-w-4xl" id="summarizer-result-text">
          {/* <ReactMarkdown children={markdown} className="react-markdown-test" /> */}
          <Markdown className="react-markdown-test">{markdown}</Markdown>
        </div>
      </section>
    </div>
  );
};

export default Summarizer;