import { Link } from "react-router-dom";
import { teamMembers } from "../data";

const About = () => {
  return (
    <div className="about-container">
      <h1>Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <Link
            to={`/about/${member.id}`}
            key={member.id}
            className="team-member"
          >
            <img src={member.image} alt={member.name} />
            <p>{member.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default About;
