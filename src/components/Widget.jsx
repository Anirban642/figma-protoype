import React, { useState, useRef } from 'react';

const Widget = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=300&h=200&fit=crop'
  ]);
  const galleryRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages([...images, event.target.result]);
        setTimeout(() => {
          if (galleryRef.current) {
            galleryRef.current.scrollLeft = galleryRef.current.scrollWidth;
          }
        }, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 220;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Get the position for the sliding indicator
  const getTabPosition = () => {
    if (activeTab === 'about') return 'translate-x-0';
    if (activeTab === 'experiences') return 'translate-x-[calc(100%+0.125rem)]';
    if (activeTab === 'recommended') return 'translate-x-[calc(200%+0.25rem)]';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-16" 
         style={{ background: 'linear-gradient(180deg, #373E44 0%, #191B1F 100%)' }}>
      
      {/* Container */}
      <div className="flex w-full max-w-7xl h-full">
        {/* Left Section - Empty */}
        <div className="hidden lg:block lg:w-1/2 h-full"></div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          
          {/* ---------- ABOUT ME CARD ---------- */}
          <div className="bg-[#363C43] rounded-[18px] p-4 md:p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.4),-4px_-4px_12px_rgba(255,255,255,0.02)] relative">
            
            {/* Info Icon with Question Mark */}
            <div className="absolute top-4 left-4 w-6 h-6 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#888" strokeWidth="2"/>
                <path d="M7.5 7.5C7.5 5.84 8.84 4.5 10.5 4.5C12.16 4.5 13.5 5.84 13.5 7.5C13.5 8.5 12.5 9 11.5 9.5C10.8 9.85 10 10.3 10 11M10 14H10.01" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="ml-8 md:ml-10">
              {/* Tabs with Gliding Background and Shadow */}
              <div className="bg-[#171717] rounded-[20px] p-1 flex gap-0.5 mb-5 relative shadow-[4px_4px_12px_rgba(0,0,0,0.4),inset_2px_2px_6px_rgba(0,0,0,0.3)]">
                {/* Gliding Background Indicator with 2X More Shadow */}
                <div 
                  className={`absolute top-1 left-1 w-[calc(33.333%-0.167rem)] h-[calc(100%-0.5rem)] bg-[#28292F] rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.8),inset_6px_6px_12px_rgba(0,0,0,0.5),0px_0px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-in-out ${getTabPosition()}`}
                ></div>
                
                <button
                  onClick={() => setActiveTab('about')}
                  className={`flex-1 py-3 px-4 md:px-6 rounded-2xl font-medium text-sm md:text-[15px] transition-all duration-300 relative z-10 ${
                    activeTab === 'about'
                      ? 'text-white'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  About Me
                </button>
                <button
                  onClick={() => setActiveTab('experiences')}
                  className={`flex-1 py-3 px-4 md:px-6 rounded-2xl font-medium text-sm md:text-[15px] transition-all duration-300 relative z-10 ${
                    activeTab === 'experiences'
                      ? 'text-white'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Experiences
                </button>
                <button
                  onClick={() => setActiveTab('recommended')}
                  className={`flex-1 py-3 px-4 md:px-6 rounded-2xl font-medium text-sm md:text-[15px] transition-all duration-300 relative z-10 ${
                    activeTab === 'recommended'
                      ? 'text-white'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Recommended
                </button>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute right-4 top-20 w-1 h-[60px] bg-[#2E3439] rounded-full">
                <div className="w-full h-[30%] bg-linear-to-b from-[#888989] to-[#4A4E54] rounded-full"></div>
              </div>

              {/* Content without Shadow */}
              <div className="text-[#969696] text-base md:text-lg leading-relaxed pr-6">
                <p className="mb-4">
                  Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.
                </p>
                <p>
                  I was born and raised in Albany, NY& have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a...
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Divider */}
          <div className="w-full flex justify-center">
            <div className="w-[80%] h-1 bg-[#3b4550] rounded-full shadow-[4px_4px_8px_rgba(0,0,0,0.4),-2px_-2px_6px_rgba(255,255,255,0.02)]"></div>
          </div>

          {/* ---------- GALLERY CARD ---------- */}
          <div className="bg-[#363C43] rounded-[18px] p-4 md:p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.4),-4px_-4px_12px_rgba(255,255,255,0.02)] relative">
            
            {/* Info Icon with Question Mark */}
            <div className="absolute top-4 left-4 w-6 h-6 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#888" strokeWidth="2"/>
                <path d="M7.5 7.5C7.5 5.84 8.84 4.5 10.5 4.5C12.16 4.5 13.5 5.84 13.5 7.5C13.5 8.5 12.5 9 11.5 9.5C10.8 9.85 10 10.3 10 11M10 14H10.01" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="ml-8 md:ml-10">
              {/* Gallery Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
                <button className="bg-[#171717] text-white px-6 md:px-7 py-3 md:py-3.5 rounded-2xl text-base md:text-lg font-medium shadow-[4px_4px_8px_rgba(0,0,0,0.4),inset_2px_2px_4px_rgba(0,0,0,0.2)]">
                  Gallery
                </button>

                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-transparent text-white px-5 md:px-6 py-2.5 md:py-3 rounded-[20px] text-xs md:text-[13px] font-semibold shadow-[inset_0px_4px_8px_rgba(0,0,0,0.3),4px_5px_20px_2px_rgba(0,0,0,0.5)] hover:bg-white/5 hover:scale-105 transition-all duration-300"
                  >
                    + ADD IMAGE
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAddImage}
                    className="hidden"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => scrollGallery('left')}
                      className="w-10 h-10 md:w-[45px] md:h-[45px] rounded-full flex items-center justify-center shadow-[4px_5px_20px_2px_rgba(0,0,0,0.5),inset_0px_-4px_8px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, #303439 0%, #161718 100%)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M12 4L6 10L12 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollGallery('right')}
                      className="w-10 h-10 md:w-[45px] md:h-[45px] rounded-full flex items-center justify-center shadow-[4px_5px_20px_2px_rgba(0,0,0,0.5),inset_0px_-4px_8px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, #303439 0%, #161718 100%)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M8 4L14 10L8 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery Images with Left Rotation */}
              <div
                ref={galleryRef}
                className="flex gap-10 overflow-x-auto overflow-y-hidden py-6 px-4 scrollbar-thin scrollbar-track-[#2E3439] scrollbar-thumb-[#4A4E54]"
                style={{ scrollBehavior: 'smooth' }}
              >

                {/* done  */}
                {images.map((src, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-[140px] h-[130px] md:w-[190px] md:h-[180px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 hover:scale-110 hover:-rotate-6 hover:z-10"
                  >
                    <img
                      src={src}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Horizontal Divider */}
          <div className="w-full flex justify-center">
            <div className="w-[80%] h-1 bg-[#3b4550] rounded-full shadow-[4px_4px_8px_rgba(0,0,0,0.4),-2px_-2px_6px_rgba(255,255,255,0.02)]"></div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Widget;