import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import LiquidChrome from "./bits/liquidchrome";
import Stepper, { Step } from "./bits/stepper";
import CircularGallery from "./bits/circulargallery";
import TiltedCard from "./bits/tiltedcard";
import "./App.css";
import "./bits/reveal.css";

const ConfettiSideCannons = () => {
  useEffect(() => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const isMobile = window.innerWidth <= 640;

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: isMobile ? 1 : 2, // Fewer particles on mobile
        angle: 60,
        spread: isMobile ? 45 : 55, // Smaller spread on mobile
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: isMobile ? 1 : 2,
        angle: 120,
        spread: isMobile ? 45 : 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();

    // Cleanup confetti on unmount
    return () => confetti.reset();
  }, []);

  return null; // No UI elements needed
};

const App = () => {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const revealRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (revealRef.current) {
      observer.observe(revealRef.current);
    }

    return () => {
      if (revealRef.current) {
        observer.unobserve(revealRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      {!showFinalScreen && (
        <>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#C5C9A4] to-[#363732]">
            {/* <LiquidChrome
              baseColor={[0.1, 0.1, 0.1]}
              speed={0.4}
              amplitude={0.6}
              interactive={true}
            /> */}
          </div>

          <div className="relative z-10 flex items-center justify-center w-full min-h-screen px-4 animate-fadeIn">
            <Stepper
              initialStep={1}
              onStepChange={(step) => console.log(step)}
              onFinalStepCompleted={() => {
                console.log("All steps completed!");
                setTimeout(() => setShowFinalScreen(true), 400);
              }}
              backButtonText="Previous"
              nextButtonText="Next"
              className="backdrop-blur-md bg-[#020202] p-6 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg"
            >
              <Step>
                <h2 className="text-xl sm:text-2xl text-white font-bold mb-4">
                  WELCOME
                </h2>
                <p className="text-sm sm:text-base text-white">
                  Specially Made for you...
                </p>
              </Step>
              <Step>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  What's your name?
                </h2>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name?"
                  className="w-full p-3 rounded-md text-white border border-gray-300 bg-transparent focus:outline-none text-sm sm:text-base"
                />
              </Step>
              <Step>
                <h2 className="text-xl sm:text-2xl text-white font-bold mb-4">
                  What is your gender?
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer text-white text-sm sm:text-base">
                    <input
                      type="radio"
                      name="options"
                      value="Male"
                      checked={selectedOption === "Male"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="accent-black w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white text-sm sm:text-base">
                    <input
                      type="radio"
                      name="options"
                      value="Female"
                      checked={selectedOption === "Female"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="accent-black w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </Step>
            </Stepper>
          </div>
        </>
      )}

      {showFinalScreen && (
        <div className="w-screen min-h-screen overflow-y-auto bg-white text-white flex flex-col">
          <ConfettiSideCannons />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-gray-500">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase text-black">
                {name}
              </h1>
              <p className="text-sm sm:text-md uppercase text-black">
                {selectedOption}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-center px-4 sm:px-8 pt-8 sm:pt-12">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-black uppercase text-center">
              तुला वाढदिवसाच्या शुभेच्छा
            </h2>
            <p className="text-lg uppercase text-black mt-2">
              {name}
            </p>
          </div>
          <section className="flex items-center justify-center w-full min-h-[50vh] sm:min-h-screen border-b border-gray-500">
            <div className="relative w-full h-[300px] sm:h-[500px] flex items-center justify-center mb-12 sm:mb-52 ">
              <CircularGallery
                bend={3}
                textColor="#000000"
                borderRadius={0.05}
              />
            </div>
          </section>

          {/* <section className="flex flex-col items-center w-full min-h-[50vh] sm:min-h-screen border-b border-gray-500">
            <div className="w-full flex justify-center px-4 sm:px-8 pt-8 sm:pt-12">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-black">
                TRY YOUR LUCK
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8 sm:gap-16 mt-8 sm:mt-16">
              <TiltedCard
                imageSrc="./s1.jpg"
                altText="SCAN QR WITH SPOTIFY CAMERA"
                captionText="SCAN QR WITH SPOTIFY CAMERA"
                containerHeight="200px"
                containerWidth="200px"
                imageHeight="230px"
                imageWidth="190px"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="text-2xl sm:text-3xl font-extrabold tilted-card-demo-text select-none">
                    OPTION 1
                  </p>
                }
              />
              <TiltedCard
                imageSrc="./s2.jpg"
                altText="SCAN QR WITH SPOTIFY CAMERA"
                captionText="SCAN QR WITH SPOTIFY CAMERA"
                containerHeight="200px"
                containerWidth="200px"
                imageHeight="230px"
                imageWidth="190px"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="select-none text-2xl sm:text-3xl backdrop-blur-2xl text-[#0C1618] font-extrabold tilted-card-demo-text">
                    OPTION 2
                  </p>
                }
              />
              <TiltedCard
                imageSrc="./s3.jpg"
                altText="SCAN QR WITH SPOTIFY CAMERA"
                captionText="SCAN QR WITH SPOTIFY CAMERA"
                containerHeight="200px"
                containerWidth="200px"
                imageHeight="230px"
                imageWidth="190px"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="select-none text-2xl sm:text-3xl font-extrabold text-[#37423D] tilted-card-demo-text">
                    OPTION 3
                  </p>
                }
              />
            </div>
          </section> */}

          <section
            ref={revealRef}
            className={`flex items-center justify-start w-full min-h-[50vh] sm:min-h-screen py-6 sm:py-10 px-4 sm:px-6 bg-white ${
              isRevealed ? "scroll-reveal" : ""
            }`}
          >
            <div className="w-full max-w-3xl px-4 sm:px-6">
              <p className="text-center text-base sm:text-xl md:text-3xl tracking-wider font-mono uppercase font-bold leading-relaxed text-black">
                Happiest b'day Ishant i hope this year brings you all the joy and you also listen to your mom as she works hard for you every day so you can study and become a person she dreams and thinks of, stop wasting time on useless mobile games and youtube, start studying and choose what you want to become from now itself or else the time is gone and you lose everything, think again after reading this, you always have me to support you but i need you to do the same. Live your life to the fullest and don't let it waste in the wrong direction, i hope you have a great year ahead and you achieve everything you want to, i am always there for you. See you until your next birthday.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default App;