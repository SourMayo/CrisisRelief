import { Link } from "react-router-dom";
import { teamMembers } from "../config";

export default function About() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Meet Our Team
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative">
                <Link to={`/about/${member.id}`}>
                  <img
                    alt={member.name}
                    src={member.image}
                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                  />
                  <h3 className="mt-6 text-sm text-gray-500 text-center">
                    <span className="absolute inset-0" />
                    {member.name}
                  </h3>
                </Link>
                <ul className="flex flex-wrap justify-center mt-3 space-x-2">
                  {member.skills.map((skill) => (
                    <li
                      key={skill}
                      className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full shadow-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
