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
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useNavigate as UseNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const home = () => {
  const navigate = UseNavigate();
  const { isColorBlindMode, toggleColorBlindMode } = useTheme();

  const textColor = isColorBlindMode ? "text-[#002366]" : "text-gray-800";
  const bgColor = isColorBlindMode
    ? "bg-[#FFFDD0]"
    : "bg-gradient-to-br from-[#66B2EF] to-[#AC94FB]";
  const buttonColor = isColorBlindMode
    ? "bg-[#F8E474] text-[#002366] font-bold hover:bg-yellow-300 border border-[#002366]"
    : "bg-gray-800 text-white hover:bg-gray-700";

  return (
    <div className="@container overflow-x-hidden">
      <div className={`min-h-screen ${bgColor}`}>
        <div className="pt-32 px-10 justify-center items-center flex flex-col md:flex-row max-w-[1500px] mx-auto">
          <div className="">
            <div className="max-w-[617px] md:min-w-[500px]">
              <h1 className={`text-5xl font-bold mb-8 ${textColor}`}>
                We are here to help bring you a better tomorrow
              </h1>
              <p className={`font-light text-2xl mb-8 ${textColor}`}>
                Crisis Helper is a student-led project that aims to help
                low-income communities in San Francisco. This website is built
                with the intention of reducing the number of families struggling
                to receive the basic needs they require for their day-to-day
                lives.
              </p>

              <label
                className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded border shadow ${
                  isColorBlindMode
                    ? "bg-[#F8E474] text-[#002366] border-[#002366]"
                    : "bg-[#F8E474] text-[#002366] border-[#002366]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isColorBlindMode}
                  onChange={toggleColorBlindMode}
                  className="accent-blue-700"
                />
                Enable Color Blind Mode
              </label>

              <div className="mt-4">
                <button
                  onClick={() => navigate("/resources")}
                  className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold transition ${buttonColor}`}
                >
                  Find Local Support Services
                </button>
              </div>
            </div>
          </div>

          <div className="mt-[150px] md:mt-[0px] flex flex-wrap justify-center items-center">
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
              <Link to={to} key={label} className="w-[50%]">
                <Card className="pt-5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                  <CardBody className="overflow-visible items-center justify-center py-2">
                    <Image
                      alt={label}
                      className="object-cover rounded-xl"
                      src={icon}
                      width={100}
                    />
                  </CardBody>
                  <CardHeader className="pt-2 flex-col items-center justify-center text-center">
                    <p className={`mt-4 font-bold text-lg ${textColor}`}>
                      {label}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-[150px] text-center px-8 md:px-16">
          <div className="md:px-16">
            <h2
              className={`text-[48px] font-bold mb-8 text-center mt-[20px] ${textColor}`}
            >
              One Stop Aid
            </h2>
            <p
              className={`text-2xl font-light mb-8 max-w-[587px] text-center mx-auto mt-[20px] ${textColor}`}
            >
              Find all your resources quickly and accurately! <br />
              <b>
                Need medical help? <br />
                Need a place to stay? <br />
                Need food? <br />
                Want to be on top of weather emergencies? <br />
                Need some other form of help?
              </b>
              <br />
              Click, and you'll have all you need!
            </p>
          </div>

          <div className="mt-[150px] flex items-center gap-x-50 mx-auto w-fit">
            <div>
              <h2
                className={`text-[48px] font-bold mb-8 text-center mt-[20px] ${textColor}`}
              >
                Bring Help to You
              </h2>
              <p
                className={`text-2xl font-light mb-8 max-w-[587px] text-center mx-auto mt-[20px] ${textColor}`}
              >
                Login or Sign Up to let us send you the services you need, when
                you need it!
              </p>
            </div>
            <div className="hidden @[1170px]:block">
              <img
                src={logo}
                alt="CrisisRelief logo"
                className="drop-shadow-lg rounded-xl"
              />
            </div>
          </div>
        </div>

        <footer className="mt-32 bg-gray-800 w-full h-[150px]">
          <div className="px-10 pt-10 flex items-center gap-x-50 mx-auto w-fit">
            <img src={logo} alt="CrisisRelief Logo" className="max-h-20" />
            <div className="flex items-center gap-x-5 mx-auto w-fit">
              <img
                src={facebookIcon}
                alt="Facebook Logo"
                className="max-h-20"
              />
              <img src={indeedIcon} alt="Indeed Logo" className="max-h-20" />
              <img src={youtubeIcon} alt="YouTube Logo" className="max-h-20" />
              <img
                src={instagramIcon}
                alt="Instagram Logo"
                className="max-h-20"
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default home;
