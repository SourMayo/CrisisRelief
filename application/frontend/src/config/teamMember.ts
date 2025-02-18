import { anshajImg } from "../assets";
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
];
export default teamMembers;
