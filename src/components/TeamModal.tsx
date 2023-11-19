import { useState, useEffect } from "react";
import { ITeams, IUser } from "../vite-env";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "./Loading";

const TeamModal = ({
  teamId,
  setClickedTeam,
}: {
  teamId: any;
  setClickedTeam: Function;
}) => {
  const [team, setTeam] = useState<ITeams>({} as ITeams);
  const [loading, setLoading] = useState<boolean>(false);
  function closeModal() {
    setClickedTeam(null);
  }

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_SERVER_LINK + "team/" + teamId
      );
      console.log(response)
      setTeam(response.data.team);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-opacity-50 bg-gray-700">
      {loading && <Loading />}
      {
        !loading && 
        (
          <div className="bg-white w-[80%] lg:w-full p-6 border border-black rounded-lg max-w-md w-full">
          <button
            className="absolute text-4xl top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            <AiOutlineClose />
          </button>
          <h2 className="text-2xl font-bold mb-2">{team?.team_name}</h2>
          <p className="text-gray-700 mb-4">{team?.team_description}</p>
  
          <div className="flex flex-col gap-5 space-x-2">
            <strong>Members:</strong>
            {team?.team_members?.map((member: IUser, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 border rounded-md hover:border-blue-500 transition-transform duration-300 transform hover:scale-105"
              >
                <img
                  className="h-10 w-10 object-cover rounded-full border-2 border-gray-300 hover:border-blue-500"
                  src={member.avatar}
                  alt="Avatar"
                />
                <div>
                  <p className="font-semibold">
                    {member.first_name} {member.last_name}
                  </p>
                  <p className="text-gray-600">{member.domain}</p>
                  <p className="text-gray-600">{member.gender}</p>
                </div>
              </div>
            ))}
          </div>
  
  
        </div>
        )
      }

    </div>
  );
};

export default TeamModal;
