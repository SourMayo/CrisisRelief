import {anshajImg, kyleImg, geoartImg, karlaImg} from "../assets";
import { francisImg } from "../assets";
import { ayeshaImg } from "../assets";

const teamMembers = [
  {
    id: "anshajVats",
    name: "Anshaj Vats",
    image: anshajImg,
    bio: `My name is Anshaj Vats. I have previously interned at Amazon. 
          Currently, I am prepping for my internship at Meta. 
          I am a final-year student at San Francisco State university.
          I am really looking forward to working with you all.`,
    portfolio: "https://anshajvats.github.io/Portfolio/",
    role: "Team Lead",
    skills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "Machine Learning",
      "Docker",
      "TypeScript",
    ],
  },
  // Other teammates will add their details here
  {
    id: "francisAviles",
    name: "Francis Aviles",
    image: francisImg,
    bio: "What's up! My name is Francis. I play both video games and board games.",
    role: "Backend Lead",
    skills: ["C++", "C#"],
  },
  {
    id: "AyeshaIrum",
    name: "Ayesha Irum",
    image: ayeshaImg,
    bio: "Hello! I am Ayesha Irum. I am a final year student at San Francisco State University.",
    portfolio: "https://aayeshaa.netlify.app/",
    skills: ["React", "Python", "Workbench MySQL"],
  },
  {
    id: "kyleNguyen",
    name: "Kyle Nguyen",
    image: kyleImg,
    bio: "Hello. I am Kyle Nguyen. I am on my final year at SFSU and am looking forward to working with all of you" +
        "I enjoy going out with my friends during my free time",
    role: "Technical Writer",
    skills: ["Node.js", "Python", "C++", "React"],
  },
  {
    id: "geoartCorral",
    name: "Geoart Corral",
    image: geoartImg,
    bio: `Hi! My name is Geoart Corral and I am a Junior at SFSU. 
          I am a fan of the game series Monster Hunter and I 
          recently got into collecting Pokemon cards with my girlfriend.`,
    role: "GitHub Master",
    skills: ["Java", "HTML", "CSS", "C++", "C"],
  },
  {
    id: "KarlaCardenas",
    name: "Karla Cardenas",
    image: karlaImg,
    bio: `Hi! My name is Karla Cardenas, and I am a Senior at SFSU.
          I'm looking forward to working with all of you this semester!
          In my free time, I enjoy watching movies and hanging out with friends.`,
    role: "Database Administrator ",
    skills: ["Node.js", "C++","C", "HTML"],
  },

];
export default teamMembers;
