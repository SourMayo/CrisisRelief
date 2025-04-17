import { Link } from "react-router-dom";
import {
  foodbankIcon,
  medicalIcon,
  overnightIcon,
  weatherIcon,
} from "../assets";

const Resources = () => {
  return (
    <div className="@container">
      {/* Background gradient */}
      <div className="relative min-h-screen bg-gradient-to-b from-[#DCE7FC] via-[#ADC4EF] to-[#7F9EE3]">
        {/* Prompt */}
        <p className="absolute top-[20%] w-full text-center italic text-[#1F2A40] text-xl">
          What kind of support are you looking for?
        </p>

        {/* Resource Options */}
        <div className="absolute top-[35%] w-full flex justify-center flex-wrap gap-12 px-4">
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
            <Link to={to} key={label}>
              <div className="w-50 flex flex-col items-center text-center cursor-pointer transition-transform transform hover:scale-105 duration-300">
                <div className="w-40 h-40 flex items-center justify-center">
                  <img
                    src={icon}
                    alt={`${label} Icon`}
                    className="w-40 h-40 object-contain "
                  />
                </div>
                <p className="mt-4 text-gray-800 text-lg italic">
                  {label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;