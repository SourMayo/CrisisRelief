import { Link } from "react-router-dom";
import {
  foodbankIcon,
  medicalIcon,
  overnightIcon,
  weatherIcon,
} from "../assets";

const Resources = () => {
  return (
    <div className="@container min-h-screen bg-gradient-to-b from-[#DCE7FC] via-[#ADC4EF] to-[#7F9EE3]">
      {/* Prompt */}
      <p className="pt-24 pb-8 px-4 text-center italic text-[#1F2A40] text-lg md:text-xl">
        What kind of support are you looking for?
      </p>

      {/* Resource Options */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 p-4">
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
            className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] p-2"
          >
            <div className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
              <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                <img
                  src={icon}
                  alt={`${label} Icon`}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-4 text-gray-800 text-sm md:text-lg italic">
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Resources;
