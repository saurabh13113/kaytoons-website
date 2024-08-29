"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { firestore } from "@/firebase"; // Adjust the path as necessary
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
const auth = getAuth(app);
const database = getDatabase(app);

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleSignUp = async () => {
    if (email.trim() === "") {
      alert("Please enter an email address.");
      return;
    }

    try {
      const docRef = doc(collection(firestore, 'signupUsers'), email);
      await setDoc(docRef, { email: email });
      setEmail(""); // Clear the text field
      alert("Email added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add email. Please try again.");
    }
  };

  const playAudio = (audioSrc) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };


  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 bg-white text-white p-4 shadow-lg z-50">
        <h1 className="text-4xl font-bold text-center text-orange-500" style={{ fontFamily: 'Impact, fantasy' }}>K a y    T o o n s</h1>
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen pt-24 bg-gradient-to-b from-[#fdfaf4] to-orange-100 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-9xl mb-12">
          <div className="flex flex-col justify-center text-left md:text-left md:mr-12 mb-8 md:mb-0" style={{ padding: '0px 0px' }}>
            <p className="text-5xl font-bold font-medium text-black mb-4 text-center max-w-1xl" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
              We reimagined 
              <br />childrens media
              <br />
            </p>
            <p className="text-5xl text-black font-bold font-medium mb-4 text-center max-w-6xl" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
              <br />
              The healthy way:
              <br /> <span className="text-orange-500" style={{ fontFamily: 'Impact, fantasy' }}>without screens.</span>
            </p>
            <p className="text-3xl text-black font-medium mb-4 text-center max-w-2xl" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
              <br />
              <br />
              <br />
              Listen to episodes of our original handmade audio cartoons
            </p>
          </div>
          <div className="flex-shrink-0 md:ml-0 relative" style={{ padding: '0 20px' }}>
            <Carousel showThumbs={true} showStatus={true} infiniteLoop>
              <div onClick={() => playAudio('/aud1.wav')} className="relative cursor-pointer">
                <Image src="/pic1.png" alt="Image 1" width={100} height={100} className="rounded-2xl shadow-2xl" quality={100}/>
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-500 p-5 rounded-full shadow-lg animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-4.586-2.637a1 1 0 00-1.513.858v5.278a1 1 0 001.513.858l4.586-2.637a1 1 0 000-1.716z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div onClick={() => playAudio('/aud2.wav')} className="relative cursor-pointer">
                <Image src="/pic2.png" alt="Image 1" width={120} height={120} className="rounded-2xl shadow-2xl" />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-500 p-5 rounded-full shadow-lg animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-4.586-2.637a1 1 0 00-1.513.858v5.278a1 1 0 001.513.858l4.586-2.637a1 1 0 000-1.716z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div onClick={() => playAudio('/aud3.wav')} className="relative cursor-pointer">
                <Image src="/pic3.png" alt="Image 2" width={120} height={120} className="rounded-2xl shadow-2xl" />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-500 p-5 rounded-full shadow-lg animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-4.586-2.637a1 1 0 00-1.513.858v5.278a1 1 0 001.513.858l4.586-2.637a1 1 0 000-1.716z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </Carousel>
          </div>
        </div>
        <div className="mt-10 text-center">
          <button onClick={scrollToBottom} className="text-orange-50 text-2xl font-bold py-4 px-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <p className="text-5xl font-bold text-black font-medium mb-8 text-center max-w-3xl" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
          <br />
          <br />
          <br />
          <br />
          Fun and educational entertainment that <span className="text-orange-500">promotes childrens well-being.</span>
          <br />
          <br />
        </p>
        <div className="bg-white p-12 rounded-2xl shadow-2xl text-center w-full max-w-4xl">
          <h2 className="text-4xl font-semibold text-orange-500 mb-6" style={{ fontFamily: 'Impact, fantasy' }}>
            Sign Up For KayToons for Free
          </h2>
          <p className="text-lg font-medium text-gray-700 mb-8 text-center max-w-3xl">
            Sign up to the Beta release of KayToons and be the first to know about any updates! 
            <br /> We will never share your email address with anyone and your confidentiality shall be protected.
        </p>
          <form onSubmit={handleSignUp} className="flex flex-row items-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              required
            />
            <button
              onClick={handleSignUp}
              type="submit"
              className="bg-orange-500 text-white py-5 px-20 rounded-md hover:bg-orange-600 transition-colors shadow-md ml-4"
            >
              Sign Up
            </button>
          </form>
          {message && <p className="mt-4 text-orange-600 font-semibold">{message}</p>}
        </div>
      </main>
    </div>
  );
}
