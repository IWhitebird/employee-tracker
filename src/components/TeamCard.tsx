import { ITeams, IUser } from '../vite-env';

const TeamCard = ({ team } : {team : ITeams}) => {
  return (
    <div className="bg-white p-4 border border-black rounded-lg transition-transform duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-2">{team.team_name}</h2>
      <p className="text-gray-700 mb-4">{team.team_description}</p>

      <div className="flex flex-col gap-5 space-x-2">
        <strong>Members:</strong>
        {team.team_members.map((member : IUser, index : number) => (
          <div key={index} className="flex items-center space-x-2">
            <img
              className="h-10 w-10 object-cover rounded-full border-2 border-gray-300 hover:border-blue-500 transition-transform duration-300 transform hover:scale-105"
              src={member.avatar}
              alt="Avatar"
            />
            <span className="bg-gray-200 p-1 rounded-md">
              {member.first_name} {member.last_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
