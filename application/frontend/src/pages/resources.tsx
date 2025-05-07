import { Link } from "react-router-dom";
import {Card, CardHeader, CardBody, Image} from "@heroui/react";

import {
  foodbankIcon,
  medicalIcon,
  overnightIcon,
  weatherIcon,
  generalSearchIcon,
} from "../assets";

const Resources = () => {
  return (
    <div className="@container min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB]">
      {/* Prompt */}
      <div className="py-16"/>
      <p className="pb-8 px-4 text-center font-bold text-gray-800 text-4xl">
        What kind of support are you looking for?
      </p>

      {/* Resource Options */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 p-4">
        {[
          // Contents
          {
            to: "/medicalResources",
            icon: medicalIcon,
            label: "Medical Assistance",
            description: "Find care according to your needs",
          },
          {
            to: "/overnightShelters",
            icon: overnightIcon,
            label: "Overnight Shelters",
            description: "Find a roof to stay under",
          },
          {
            to: "/foodBanks",
            icon: foodbankIcon,
            label: "Food Banks",
            description: "Get the food you need",
          },
          {
            to: "/weatherWarnings",
            icon: weatherIcon,
            label: "Weather Warnings",
            description: "Be prepared for outside",
          },
          {
            to: "/search",
            icon: generalSearchIcon,
            label: "General Search",
            description: "Don't have anything specific?",
          }

        ].map(({ to, icon, label, description }) => (
          // Display
          <Link
            to={to}
            key={label}
            className=""
          >
            <Card className="w-60 h-75 py-4 px-4 flex flex-col hover:scale-105 transition-transform duration-300 drop-shadow-lg">
              <CardBody className="overflow-visible items-center justify-center py-2">
                <Image
                  alt={label}
                  className="object-cover rounded-xl"
                  src={icon}
                  width={100}
                />
              </CardBody>
              <CardHeader className="pt-2 flex-col items-center justify-center text-center">
                <p className="mt-4 text-gray-800 font-bold text-lg">{label}</p>
                <small className="text-gray-800 text-lg font-light">{description}</small>
              </CardHeader>
            </Card>
          </Link>
        ))}

        {/* Original navigation icon code before use of cards */}
          {/* 
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
              <p className="mt-4 text-gray-800 font-bold text-sm md:text-lg">
                {label}
              </p>
            </div>
          </Link> 
          */}

      </div>
    </div>
  );
};

export default Resources;
