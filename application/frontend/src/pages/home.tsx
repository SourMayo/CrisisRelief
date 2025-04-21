import {
  foodbankIcon,
  medicalIcon,
  overnightIcon,
  weatherIcon,
  logo,
  facebookIcon,
  indeedIcon,
  youtubeIcon,
  instagramIcon,
} from "../assets";
import { Link } from "react-router-dom";
import { useNavigate as UseNavigate } from "react-router-dom";

const home = () => {
  // Redirect user
  const navigate = UseNavigate();

  return (
    <div className="@container overflow-x-hidden">
      {/* Background gradient */}
      <div className="relative min-h-screen bg-gradient-to-b from-[#DCE7FC] via-[#ADC4EF] to-[#7F9EE3]">

        {/* Introduction */}
        <div className="pt-32 px-10 justify-center items-center flex flex-col md:flex-row">
          <div className="">
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
          
          {/* Icons and "One Stop Aid" */}
          <div className="mt-[100px] md:mt-[0px] flex flex-wrap md:flex-col justify-center items-center">
            {[
              {
                to: "/medicalResources",
                icon: medicalIcon,
                label: "Medical Assistance",
              },
              {
                to: "/overnightShelters",
                icon: overnightIcon,
                label: "Overnight Shelters",
              },
              {
                to: "/foodBanks",
                icon: foodbankIcon,
                label: "Food Banks",
              },
              {
                to: "/weatherWarnings",
                icon: weatherIcon,
                label: "Weather Warnings",
              },
            ].map(({ to, icon, label }) => (
              <Link
                to={to}
                key={label}
                className="w-[50%] md:w-[30%] lg:w-[22%] p-2"
              >
                <div className="px-16 pt-5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 md:w-20 md:h-20 flex items-center justify-center">
                    <img
                      src={icon}
                      alt={`${label} Icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Text Piece */}
          <div className="md:px-16">
            <h2 className="text-[48px] font-bold text-gray-800 mb-8 text-center md:text-left mt-[20px]">
              One Stop Aid
            </h2>
            <p className="text-2xl font-light text-gray-800 mb-8 max-w-[587px] text-center md:text-left mx-auto mt-[20px]">
              Find all your resources quickly and accurately! 
              <br/>
              <b>
                Need medical help? 
              <br/>
                Need a place to stay?
              <br/>
                Need food? 
              <br/>
                Want to be on top of weather emergencies?
              <br/>
                Need some other form of help?
              </b>
              <br/>
              Click, and you'll have all you need!
            </p>

          </div>
        </div>


        {/* Informational Pieces */}
        <div className="mt-[150px] text-center px-8 md:px-16">

          {/* Bring Help to You */}
          <div className="mt-[20px] flex items-center gap-x-50 mx-auto w-fit">
            <div>
              <h2 className="text-[48px] font-bold text-gray-800 mb-8 text-center mt-[20]">
                Bring Help to You
              </h2>

              <p className="text-2xl font-light text-gray-800 mb-8 max-w-[587px] text-center mx-auto mt-[20px]">
                Login or Sign Up to let us send you the services you need, when
                you need it!
              </p>
            </div>

            <div className="hidden @[1170px]:block">
              <img src={logo} alt="CrisisRelief logo"></img>
            </div>
          </div>
        </div>

        {/* Footer for home page */}
        <footer className="mt-32 bg-gray-800 w-full h-[150px]">
          <div className="px-10 pt-10 flex items-center gap-x-50 mx-auto w-fit">
            <img src={logo} alt="CrisisRelief Logo" className="max-h-20"></img>

            <div className="flex items-center gap-x-5 mx-auto w-fit">
              <img
                src={facebookIcon}
                alt="Facebook Logo"
                className="max-h-20"
              ></img>
              <img
                src={indeedIcon}
                alt="Indeed Logo"
                className="max-h-20"
              ></img>
              <img
                src={youtubeIcon}
                alt="YouTube Logo"
                className="max-h-20"
              ></img>
              <img
                src={instagramIcon}
                alt="Instagram Logo"
                className="max-h-20"
              ></img>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default home;
