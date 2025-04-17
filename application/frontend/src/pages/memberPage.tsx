import { useParams } from "react-router-dom";
import { teamMembers } from "../config";

const MemberPage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const member = teamMembers.find((m) => m.id === memberId);

  if (!member) {
    return (
      <h2 className="text-center text-red-600 font-semibold text-2xl">
        Member Not Found
      </h2>
    );
  }

  return (
    <section className="relative isolate overflow-hidden min-h-screen bg-gradient-to-b from-[#DCE7FC] via-[#ADC4EF] to-[#7F9EE3] px-6 py-24 sm:py-32 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 w-full h-full bg-[radial-gradient(80rem_80rem_at_top,var(--color-indigo-100),white)] opacity-30" />
      {/* Old skew effect */}
      {/* <div className="absolute inset-0 -z-10 w-[150%] h-screen skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 xl:origin-top-left right-0" /> */}

      {/* Main Content */}
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <figure className="mt-10">
          {/* Member Image */}
          <img
            src={member.image}
            alt={member.name}
            className="mx-auto size-32 rounded-full border-4 border-indigo-500 shadow-lg"
          />

          {/* Member Quote/Bio */}
          <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9 mt-6">
            <p>{`"${member.bio}"`}</p>
          </blockquote>

          {/* Member Details */}
          <figcaption className="mt-10">
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900 text-lg">
                {member.name}
              </div>
              <svg
                width={3}
                height={3}
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-600">
                {member.role || "Team Member"}
              </div>
            </div>
          </figcaption>

          {/* Skills Section */}
          <h3 className="text-center text-gray-700 text-lg font-medium mt-6">
            Skills
          </h3>
          <ul className="mt-4 flex justify-center space-x-4">
            {member.skills.map((skill) => (
              <li
                key={skill}
                className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full shadow-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
};

export default MemberPage;
