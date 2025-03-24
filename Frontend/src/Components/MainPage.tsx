import React from "react";
import amazon from "../Images/amazon.png";
import adobe from "../Images/adobe.png";
import google from "../Images/google.png";
import intuit from "../Images/intuit.png";
import microsoft from "../Images/microsoft.jpg";
import uber from "../Images/uber.jpg";
import linkedin from "../Images/linkedin.png";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";



const MainPage: React.FC = () => {

    const navigate = useNavigate();

    const [isHovered, setIsHovered] = React.useState(false);

    const companyLogos = [
      { src: google, alt: "Google" },
      { src: amazon, alt: "Amazon" },
      { src: microsoft, alt: "Microsoft" },
      { src: adobe, alt: "Adobe" },
      { src: uber, alt: "Uber" },
      { src: intuit, alt: "Intuit" },
      { src: linkedin, alt: "LinkedIn" },
    ];

    

    return (
      <div className="min-h-screen px-4 py-12 bg-[#101010]">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold text-white ">
            <div>Transform Your Coding Journey</div>
            <div className="text-amber-300 py-6">Master DSA With CodeDeck</div>
          </h1>

          <p className="text-xl text-gray-300">
            Interactive flashcards and spaced repetition to help you ace
            technical interviews
          </p>

          <button
            className={`px-8 py-4 text-xl font-semibold rounded-lg bg-gradient-to-r from-amber-400 animate-pulse to-amber-600 
                    text-white transform transition-all duration-300 hover:scale-105
                    ${isHovered ? "shadow-lg shadow-amber-500/50" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </button>
        </div>

        {/* Company Logos Section */}
        <div className="mt-24  mx-auto">
          <h2 className="text-2xl font-semibold text-center text-white mb-12">
            Solve questions asked in
          </h2>

          <div className="h-16">
            <div className={`flex items-center space-x-10`}>
              <Marquee>
                {companyLogos.concat(companyLogos).map((company, index) => (
                  <img
                    key={index}
                    src={company.src}
                    alt={company.alt}
                    className={`${
                      company.alt == "Microsoft" ? "h-32" : "h-16"
                    } ${
                      company.alt == "LinkedIn" ? "h-44" : "h-20"
                    } object-contain px-6`}
                  />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    );

}

export default MainPage;
