import React, { useEffect, useRef, useState } from "react";
import LiquidChrome from "./bits/liquidchrome";
import Stepper, {Step} from "./bits/stepper";
import CircularGallery from "./bits/circulargallery";
import TiltedCard from "./bits/tiltedcard";
import "./App.css";
import "./bits/reveal.css";
import { Step } from "./bits/stepper";

const App = () => {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const revealRef = useRef(null); // Reference for the section to be animated
  const [isRevealed, setIsRevealed] = useState(false);

  // Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect(); // Stop observing once it's revealed
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
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
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Show Liquid Background + Stepper only if not final screen */}
      {!showFinalScreen && (
        <>
          {/* Liquid Background */}
          <div className="absolute inset-0 z-0">
            <LiquidChrome
              baseColor={[0.1, 0.1, 0.1]}
              speed={0.4}
              amplitude={0.6}
              interactive={true}
            />
          </div>

          {/* Centered Stepper */}
          <div className="relative z-10 flex items-center justify-center w-full h-full animate-fadeIn">
            <Stepper
              initialStep={1}
              onStepChange={(step) => {
                console.log(step);
              }}
              onFinalStepCompleted={() => {
                console.log("All steps completed!");
                setTimeout(() => setShowFinalScreen(true), 400); // slight delay for smoother UX
              }}
              backButtonText="Previous"
              nextButtonText="Next"
              className="backdrop-blur-md bg-white/30 p-8 rounded-2xl shadow-lg max-w-md w-full"
            >
              {/* Step 1 */}
              <Step>
                <h2 className="text-2xl text-white font-bold mb-4">
                  WELCOME TO THE IMMERSIVE EXPERIENCE OF SOME DIABOLICAL
                </h2>
                <p>
                  Specially Made for my Friend in need is a Friend in deed wala
                  DOST
                </p>
              </Step>

              {/* Step 2 */}
              <Step>
                <h2 className="text-2xl font-bold text-white mb-4">
                  What iz yuwar name?
                </h2>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name?"
                  className="w-full p-3 rounded-md text-white border border-gray-300 bg-transparent focus:outline-none"
                />
              </Step>

              {/* Step 3 */}
              <Step>
                <h2 className="text-2xl text-white font-bold mb-4">
                  Identify your gender
                </h2>
                <div className="space-y-4">
                  {/* Option 1 */}
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="radio"
                      name="options"
                      value="GAY"
                      checked={selectedOption === "GAY"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="accent-black"
                    />
                    <span>GAY</span>
                  </label>

                  {/* Option 2 */}
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="radio"
                      name="options"
                      value="NIGGEST GAY"
                      checked={selectedOption === "NIGGEST GAY"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="accent-black"
                    />
                    <span>NIGGEST GAY</span>
                  </label>

                  {/* Option 3 */}
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="radio"
                      name="options"
                      value="Male (but still GAY)"
                      checked={selectedOption === "Male (but still GAY)"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="accent-black"
                    />
                    <span>Male (but still GAY)</span>
                  </label>
                </div>
              </Step>

              {/* Step 4 */}
              <Step>
                <h2 className="text-2xl font-bold text-white mb-4">
                  CONGRATULATIONS!!
                </h2>
                <p className="text-white">You Passed SEM 4!</p>
              </Step>
            </Stepper>
          </div>
        </>
      )}

      {/* New Section after completion */}
      {showFinalScreen && (
        <div className="w-screen h-screen overflow-y-auto bg-[#020202] text-white flex flex-col">
          {/* Navbar */}
          <div className="flex justify-between items-center p-6 border-b border-gray-500">
            <div>
              <h1 className="text-2xl font-bold uppercase">{name}</h1>
              <p className="text-md uppercase text-gray-400">
                {selectedOption}
              </p>
            </div>
          </div>

          {/* Section 1 with CircularGallery */}
          <div className="w-full flex justify-end px-16 pt-12">
            <h2 className="text-8xl font-extrabold">SOME MEMORIES</h2>
          </div>
          <section className="flex items-center justify-center min-h-screen w-full border-b border-gray-500">
            <div className="relative h-[600px] w-full flex items-center justify-center mb-52">
              <CircularGallery
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
              />
            </div>
          </section>

          {/* Section 2 */} {/* Section 2 with 3 TiltedCards */}
          <section className="flex flex-col items-center min-h-screen w-full border-b border-gray-500">
            <div className="w-full flex justify-start px-16 pt-12">
              <h2 className="text-8xl mb-15 font-extrabold">TRY YOUR LUCK</h2>
            </div>

            {/* TiltedCards */}
            <div className="flex flex-wrap justify-center gap-32 mt-16">
              <TiltedCard
                imageSrc="./s1.jpg"
                altText="SCAN QR WITH SPOTIFY CAMERA"
                captionText="SCAN QR WITH SPOTIFY CAMERA"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="350px"
                imageWidth="290px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="text-4xl font-extrabold tilted-card-demo-text">
                    OPTION 1
                  </p>
                }
              />
              <TiltedCard
                imageSrc="./s2.jpg"
                altText="SCAN QR WITH SPOTIFY CAMERA"
                captionText="SCAN QR WITH SPOTIFY CAMERA"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="350px"
                imageWidth="290px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="text-4xl backdrop-blur-2xl text-[#0C1618] font-extrabold tilted-card-demo-text">
                    OPTION 2
                  </p>
                }
              />
              <TiltedCard
                imageSrc="./s3.jpg"
                altText="SCAN QR WITH SPOTIFY CAMERA"
                captionText="SCAN QR WITH SPOTIFY CAMERA"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="350px"
                imageWidth="290px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="text-4xl font-extrabold text-[#37423D] tilted-card-demo-text">
                    OPTION 3
                  </p>
                }
              />
            </div>
          </section>

          {/* Section 3 with ScrollReveal */}
          <section
            ref={revealRef}
            className={`flex items-center justify-start min-h-screen w-full py-10 px-4 bg-[#020202] ${
              isRevealed ? "scroll-reveal" : ""
            }`}
          >
            <div className="w-full max-w-4xl px-6">
              <p className="text-start text-white text-xl md:text-5xl tracking-wider font-mono uppercase font-bold leading-relaxed">
                When does a man die? When he is hit by a bullet? No! When he suffers a disease?
                No! When he ate a soup made out of a poisonous mushroom?
                No! A man dies when he is forgotten!
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
