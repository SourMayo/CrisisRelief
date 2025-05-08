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
import { useState } from "react";

// Define language type
type Lang = "en" | "vi";

// Translation strings for English and Vietnamese
const translations: Record<Lang, { [key: string]: string }> = {
  en: {
    introTitle: "We are here to help bring you a better tomorrow",
    introBody:
      "Crisis Helper is a student-led project that aims to help low-income communities in San Francisco. This website is built with the intention of reducing the number of families struggling to receive the basic needs they require for their day-to-day lives.",
    findSupport: "Find Local Support Services",
    oneStopAid: "One Stop Aid",
    oneStopDetails:
      "Find all your resources quickly and accurately!\nNeed medical help?\nNeed a place to stay?\nNeed food?\nWant to be on top of weather emergencies?\nNeed some other form of help?\nClick, and you'll have all you need!",
    bringHelp: "Bring Help to You",
    loginPrompt:
      "Login or Sign Up to let us send you the services you need, when you need it!",
    medical: "Medical Assistance",
    overnight: "Overnight Shelters",
    food: "Food Banks",
    weather: "Weather Warnings",
    language: "Language",
  },
  vi: {
    introTitle: "Chúng tôi ở đây để giúp bạn có một ngày mai tốt đẹp hơn",
    introBody:
      "Crisis Helper là dự án do sinh viên lãnh đạo nhằm hỗ trợ cộng đồng thu nhập thấp ở San Francisco. Trang web này giúp giảm số gia đình gặp khó khăn trong việc nhận được những nhu cầu thiết yếu hàng ngày.",
    findSupport: "Tìm Dịch Vụ Hỗ Trợ Địa Phương",
    oneStopAid: "Trợ Giúp Một Nơi",
    oneStopDetails:
      "Tìm tất cả nguồn lực nhanh chóng!\nCần trợ giúp y tế?\nCần nơi qua đêm?\nCần thực phẩm?\nMuốn biết cảnh báo thời tiết?\nCần sự giúp đỡ khác?\nNhấn vào, và bạn sẽ có tất cả!",
    bringHelp: "Mang Trợ Giúp Đến Cho Bạn",
    loginPrompt:
      "Đăng nhập hoặc đăng ký để chúng tôi gửi dịch vụ bạn cần, khi bạn cần!",
    medical: "Trợ Giúp Y Tế",
    overnight: "Nơi Qua Đêm",
    food: "Ngân Hàng Thực Phẩm",
    weather: "Cảnh Báo Thời Tiết",
    language: "Ngôn ngữ",
  },
};

const Home = () => {
  // Redirect user
  const navigate = UseNavigate();
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  return (
    <div className="@container overflow-x-hidden">
      {/* Background gradient */}
      <div className="min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB]">

        {/* Introduction */}
        <div className="pt-32 px-10 justify-center items-center flex flex-col md:flex-row max-w-[1500px] mx-auto">
          <div className="">
            <div className="max-w-[617px] md:min-w-[500px]">
              <h1 className="text-5xl font-bold text-gray-800 mb-8">
                {t.introTitle}
              </h1>
              <p className="font-light text-gray-800 text-2xl mb-8 whitespace-pre-line">
                {t.introBody}
              </p>

              {/* Redirect to resources */}
              <div>
                <button
                  onClick={() => navigate("/resources")}
                  className="block w-full rounded-md bg-gray-800 px-3.5 py-2.5 
                  text-center text-sm font-semibold text-white hover:bg-gray-700"
                >
                  {t.findSupport}
                </button>
              </div>
            </div>
          </div>

          {/* Icons and "One Stop Aid" */}
          <div className="mt-[150px] md:mt-[0px] flex flex-wrap justify-center items-center">
            {[
              {
                to: "/medicalResources",
                icon: medicalIcon,
                label: t.medical,
              },
              {
                to: "/overnightShelters",
                icon: overnightIcon,
                label: t.overnight,
              },
              {
                to: "/foodBanks",
                icon: foodbankIcon,
                label: t.food,
              },
              {
                to: "/weatherWarnings",
                icon: weatherIcon,
                label: t.weather,
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
                    <p className="mt-4 text-gray-800 font-bold text-lg">
                      {label}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Informational Pieces */}
        <div className="mt-[150px] text-center px-8 md:px-16">
          {/* Steps */}
          <div className="md:px-16">
            <h2 className="text-[48px] font-bold text-gray-800 mb-8 text-center mt-[20px]">
              {t.oneStopAid}
            </h2>
            <p className="text-2xl font-light text-gray-800 mb-8 max-w-[587px] text-center mx-auto mt-[20px] whitespace-pre-line">
              {t.oneStopDetails}
            </p>
          </div>

          {/* Bring Help to You */}
          <div className="mt-[150px] flex items-center gap-x-50 mx-auto w-fit">
            <div>
              <h2 className="text-[48px] font-bold text-gray-800 mb-8 text-center mt-[20]">
                {t.bringHelp}
              </h2>

              <p className="text-2xl font-light text-gray-800 mb-8 max-w-[587px] text-center mx-auto mt-[20px]">
                {t.loginPrompt}
              </p>
            </div>

            <div className="hidden @[1170px]:block">
              <img
                src={logo}
                alt="CrisisRelief logo"
                className="drop-shadow-lg rounded-xl"
              ></img>
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
              {/* Language Switcher */}
              <div className="flex items-center gap-x-5 mx-auto w-fit">
                <label
                  htmlFor="language-select"
                  className="mr-2 text-white font-semibold"
                >
                  {t.language}:
                </label>
                <select
                  id="language-select"
                  onChange={(e) => setLang(e.target.value as Lang)}
                  value={lang}
                  className="p-2 rounded border border white bg-gray-800 text-white"
                >
                  <option value="en">English</option>
                  <option value="vi">Tiếng Việt</option>
                </select>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
