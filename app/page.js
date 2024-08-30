"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { Coiny, Quicksand } from 'next/font/google';
import { addDoc,collection } from 'firebase/firestore';
import { db } from '@/firebase';

const coiny = Coiny({ subsets: ['latin'], weight: ['400'] });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });

const firebaseConfig = {
  apiKey: "AIzaSyDNDDlKIM_xYnSo8Djntaqai5-gGe4KLAE",
  authDomain: "kaykoo-25b27.firebaseapp.com",
  projectId: "kaykoo-25b27",
  storageBucket: "kaykoo-25b27.appspot.com",
  messagingSenderId: "1072509460988",
  appId: "1:1072509460988:web:50e1f172f19ca21e18d279",
  measurementId: "G-VTH8MQ0VSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const KayToonsLanding = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setMessage("Please enter an email address.");
      return;
    }

    try {
      await addDoc(collection(db,'signupUsers'), {
        email: email,
      });
      setEmail(""); // Clear the text field
      setMessage("Thanks for signing up. We will reach out with more information about Kaytoons shortly. Have a great day!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const playAudio = (audioSrc) => {
    if (audioRef.current) {
      const audsrc = audioRef.current.src;
      const curraud = "/" + audsrc.split('/').pop(); 
      if (curraud !== audioSrc) {
        audioRef.current.pause();
        audioRef.current.src = audioSrc;
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentAudio(audioSrc);
      } else {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } else {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentAudio(audioSrc);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };
    }
  }, [currentAudio]);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf4] to-orange-100">
      <header className="bg-white p-4 shadow-md ${quicksand.className}">
        <h1 className="text-4xl font-bold text-center text-orange-500" style={{ fontFamily: 'Impact, fantasy' }}>KayToons</h1>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
          <div className="max-w-md">
            <h2 className="text-5xl font-bold text-gray-700 font-medium mb-8 max-w-4xl mx-auto ${quicksand.className}" >
              We reimagined
              <br />
              childrens media.
            </h2>
            <h3 className="text-5xl font-bold text-gray-700 font-medium mb-8 max-w-4xl mx-auto {coiny.className}" >
              The healthy way:
              <br />
              <span className="text-orange-500 ${quicksand.className}">without screens.</span>
            </h3>
            <p className= "text-3xl font-bold text-gray-700 font-medium mb-8 max-w-4xl mx-auto ${quicksand.className}">
              <br />
              Listen to episodes of our
              <br />
              original audio cartoons
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <Carousel showThumbs={false} showStatus={false} showArrows={true} infiniteLoop
            renderArrowPrev={(onClickHandler, hasPrev) => hasPrev && (
              <button className="absolute top-1/2 -translate-y-1/2 left-4 z-10 p-2 rounded-full bg-white border-2 border-orange-500" onClick={onClickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            renderArrowNext={(onClickHandler, hasNext) => hasNext && (
              <button className="absolute top-1/2 -translate-y-1/2 right-4 z-10 p-2 rounded-full bg-white border-2 border-orange-500" onClick={onClickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          >
            <div onClick={() => playAudio('/aud1.wav')} className="relative cursor-pointer">
              <Image src="/pic1.png" alt="Image 1" width={400} height={400} className="rounded-2xl shadow-2xl" />
              {(!isPlaying || currentAudio !== '/aud1.wav') && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-orange-500 p-3 rounded-full shadow-lg animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-12 h-12">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div onClick={() => playAudio('/aud2.wav')} className="relative cursor-pointer">
                <Image src="/pic2.png" alt="Image 2" width={400} height={400} className="rounded-2xl shadow-2xl" />
                {(!isPlaying || currentAudio !== '/aud2.wav') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-500 p-3 rounded-full shadow-lg animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-12 h-12">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div onClick={() => playAudio('/aud3.wav')} className="relative cursor-pointer">
                <Image src="/pic3.png" alt="Image 3" width={400} height={400} className="rounded-2xl shadow-2xl" />
                {(!isPlaying || currentAudio !== '/aud3.wav') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-500 p-5 rounded-full shadow-lg animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-12 h-12">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
          </Carousel>
        </div>
      </main>
      
      <footer className="bg-orange-200 p-4 text-center mt-8 rounded-t-3xl ${quicksand.className}">
        <button onClick={scrollToBottom} className="text-lg font-semibold text-orange-700">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </footer>

      <p className="text-5xl font-bold text-gray-700 font-medium mb-8 items-center text-center max-w-4xl mx-auto ${quicksand.className}">
          <br />
          <br />
          <br />
          Fun and educational entertainment that <span className="text-orange-500">promotes childrens well-being.</span>
          <br />
        </p>

      <div className="bg-white p-12 rounded-2xl shadow-2xl text-center w-full max-w-4xl mx-auto mt-16">
        <h2 className="text-4xl font-semibold text-orange-500 mb-6 ${quicksand.className}" >
          Sign Up For KayToons for Free
        </h2>
        <p className="text-lg font-medium text-gray-700 mb-8 text-center max-w-3xl">
          Sign up to the Beta release of KayToons and be the first to know about any updates! 
        </p>
        <form onSubmit={handleSignUp} className="flex flex-col md:flex-row items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 border border-gray-300 rounded-md w-full mb-4 md:mb-0 md:mr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            required
          />
          <button
            onClick={handleSignUp}
            type="submit"
            className="bg-orange-500 text-white py-4 px-8 rounded-md hover:bg-orange-600 transition-colors shadow-md max-w-full md:w-auto whitespace-nowrap"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-orange-600 font-semibold">{message}</p>}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default KayToonsLanding;
