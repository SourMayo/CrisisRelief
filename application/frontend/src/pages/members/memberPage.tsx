import { useParams } from "react-router-dom";
import { teamMembers } from "../../data";

const MemberPage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const member = teamMembers.find((m) => m.id === memberId);

  if (!member) {
    return <h2>Member Not Found</h2>;
  }

  return (
    <div className="member-container">
      <h1>{member.name}</h1>
      <img src={member.image} alt={member.name} />
      <p>{member.bio}</p>
      <h3>Skills:</h3>
      <ul>
        {member.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberPage;
