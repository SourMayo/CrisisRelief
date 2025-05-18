import { Link } from "react-router-dom";
import {Card, CardHeader, CardBody, Image} from "@heroui/react";
import { useState } from "react";

import {
  foodbankIcon,
  medicalIcon,
  overnightIcon,
  weatherIcon,
  generalSearchIcon,
} from "../assets";

// Define language type
type Lang = "en" | "vi";

// Translation strings for English and Vietnamese
const translations: Record<Lang, { [key: string]: string }> = {
  en: {
    prompt: "What kind of support are you looking for?",
    medicalAssistance: "Medical Assistance",
    medicalDescription: "Find care according to your needs",
    overnightShelters: "Overnight Shelters",
    overnightDescription: "Find a roof to stay under",
    foodBanks: "Food Banks",
    foodDescription: "Get the food you need",
    weatherWarnings: "Weather Warnings",
    weatherDescription: "Be prepared for outside",
    generalSearch: "General Search",
    generalDescription: "Don't have anything specific?",
    language: "Language",
  },
  vi: {
    prompt: "Bạn đang tìm kiếm hỗ trợ gì?",
    medicalAssistance: "Hỗ Trợ Y Tế",
    medicalDescription: "Tìm dịch vụ chăm sóc theo nhu cầu của bạn",
    overnightShelters: "Nơi Trú Ẩn Qua Đêm",
    overnightDescription: "Tìm nơi trú ẩn",
    foodBanks: "Ngân Hàng Thực Phẩm",
    foodDescription: "Nhận thực phẩm bạn cần",
    weatherWarnings: "Cảnh Báo Thời Tiết",
    weatherDescription: "Chuẩn bị cho thời tiết bên ngoài",
    generalSearch: "Tìm Kiếm Chung",
    generalDescription: "Không có nhu cầu cụ thể?",
    language: "Ngôn ngữ",
  },
};

const Resources = () => {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  const resourceOptions = [
    {
      to: "/medicalResources",
      icon: medicalIcon,
      label: t.medicalAssistance,
      description: t.medicalDescription,
    },
    {
      to: "/overnightShelters",
      icon: overnightIcon,
      label: t.overnightShelters,
      description: t.overnightDescription,
    },
    {
      to: "/foodBanks",
      icon: foodbankIcon,
      label: t.foodBanks,
      description: t.foodDescription,
    },
    {
      to: "/weatherWarnings",
      icon: weatherIcon,
      label: t.weatherWarnings,
      description: t.weatherDescription,
    },
    {
      to: "/search",
      icon: generalSearchIcon,
      label: t.generalSearch,
      description: t.generalDescription,
    }
  ];

  return (
    <div className="@container min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB]">
      {/* Prompt */}
      <div className="py-16"/>
      <p className="pb-8 px-4 text-center font-bold text-gray-800 text-4xl">
        {t.prompt}
      </p>

      {/* Resource Options */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 p-4">
        {resourceOptions.map(({ to, icon, label, description }) => (
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
      </div>

      {/* Language Switcher */}
      <div className="flex justify-center mt-8 pb-8">
        <div className="flex items-center gap-x-2">
          <label htmlFor="language-select" className="text-gray-800 font-semibold">
            {t.language}:
          </label>
          <select
            id="language-select"
            onChange={(e) => setLang(e.target.value as Lang)}
            value={lang}
            className="p-2 rounded border border-gray-300 bg-white text-gray-800"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Resources;
