import { foodbankIcon, medicalIcon, overnightIcon, weatherIcon, logo,
         facebookIcon, indeedIcon, youtubeIcon, instagramIcon } from "../assets";
import { paintedLadies } from "../assets";
import { useNavigate } from "react-router-dom";

const home = () => {
  // Redirect user
  const navigate = useNavigate();
  
  return (
    <div className="@container">
      {/* Background gradient */}
      <div className="relative min-h-screen bg-gradient-to-b from-[#DCE7FC] via-[#ADC4EF] to-[#7F9EE3] -z-1">
        
        {/* Painted laides image */}
        <img 
          className="absolute right-0 top-0 -z-1 max-w-617 max-h-200 translate-x-1 hidden @[1450px]:block"
          alt="Image of the Painted Ladies in SF"
          src={paintedLadies}
        />

        {/* Introduction */}
        <div className="pt-32 px-10 flex flex-col md:flex-row">
          <div className="max-w-[617px]">
            <h1 className="text-[48px] font-bold text-gray-800 mb-8">
              We are here to help bring you a better tomorrow
            </h1>
            <p className="font-light text-gray-800 text-2xl mb-8">
              Crisis Helper is a student-led project that aims to help
              low-income communities in San Francisco. This website is built
              with the intention of reducing the number of families struggling
              to receive the basic needs they require for their day-to-day
              lives.
            </p>
          
            {/* Redirect to resources */}
            {/* TODO: Fix redirect */}
            <div>
              <button
                onClick={() => navigate("/resources")}
                className="block w-full rounded-md bg-gray-800 px-3.5 py-2.5 
                text-center text-sm font-semibold text-white hover:bg-gray-700"
                >
                {"Find Local Support Services"}
              </button>
            </div>
          </div>
          
        </div>      

        {/* Informational Pieces */}
        <div className="mt-[350px] text-center px-8 md:px-16">
            
          {/* What We Provide */}
          <h2 className="text-[48px] font-bold text-gray-800 mb-8 text-center mt-[20]">
              One Stop Aid
          </h2>

          <div className="grid grid-cols-2 gap-x-50 gap-y-5 mx-auto w-fit">
            <div>
              <img src={weatherIcon} alt="Weather Warnings Icon"></img>
              <p className="mt-[10px] font-bold text-gray-800 text-2xl mb-8">
                Weather Warnings
              </p>
            </div>
            <div>
              <img src={medicalIcon} alt="Medical Assistance Icon"></img>
              <p className="mt-[10px] font-bold text-gray-800 text-2xl mb-8">
                Medical Assistance
              </p>
            </div>            
            <div>
              <img src={overnightIcon} alt="Overnight Shelters Icon"></img>
              <p className="mt-[10px] font-bold text-gray-800 text-2xl mb-8">
                Overnight Shelters
              </p>
            </div>            
            <div>
              <img src={foodbankIcon} alt="Food Bank Icon"></img>
              <p className="mt-[10px] font-bold text-gray-800 text-2xl mb-8">
                Food Banks
              </p>
            </div>
          </div>
          <p className="text-2xl font-light text-gray-800 mb-8 max-w-[587px] text-center mx-auto mt-[20px]">
            Find all your resources quickly and accurately! Need a place to stay?
            Need medical help? Want to be on top of weather emergencies?
            We have all you need!
          </p>
        
          {/* Bring Help to You */}
          <div className="mt-[150px] flex items-center gap-x-50 mx-auto w-fit">
            <div>
              <h2 className="text-[48px] font-bold text-gray-800 mb-8 text-center mt-[20]">
                  Bring Help to You
              </h2>
            
              <p className="text-2xl font-light text-gray-800 mb-8 max-w-[587px] text-center mx-auto mt-[20px]">
                Find all your resources quickly and accurately! Need a place to stay?
                Need medical help? Want to be on top of weather emergencies?
                We have all you need!
              </p>
            </div>

            <img src={logo} alt="CrisisRelief logo"></img>
          </div>

        </div>
      
      {/* Footer for home page */}
      <footer className="mt-32 bg-gray-800 w-full h-[150px]">
        <div className="px-10 pt-10 flex items-center gap-x-50 mx-auto w-fit">
          <img src={logo} alt="CrisisRelief Logo" className="max-h-20"></img>
            
          <div className="flex items-center gap-x-5 mx-auto w-fit">
            <img src={facebookIcon} alt="Facebook Logo" className="max-h-20"></img>
            <img src={indeedIcon} alt="Indeed Logo" className="max-h-20"></img>
            <img src={youtubeIcon} alt="YouTube Logo" className="max-h-20"></img>
            <img src={instagramIcon} alt="Instagram Logo" className="max-h-20"></img>
          </div>
        </div>
      </footer>

      </div>
    </div>
  );
};

export default home;
