import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { useDispatch } from "react-redux";
import { setTeamName , setTeamDescription , setTeamMode } from "../store/slices/teamSlice";
import axios from "axios";
import toast from "react-hot-toast";

const TeamModal = ({ setTeamModal }: { setTeamModal: Function }) => {

  document.body.style.overflow = "hidden";
  const handleClose = () => {
    document.body.style.overflow = "auto";
    setTeamModal(false);
  };
  const dispatch = useDispatch();

  const { team_members , team_description , team_name } = useSelector((state: RootState) => state.team);

  const handleCreateTeam = async () => {
    if(team_name === ''){
      toast.error('Team name cannot be empty')
      return
    }
    if(team_description === ''){
      toast.error('Team description cannot be empty')
      return
    }

    try{
        const loading = toast.loading('Creating team...')

        const response = await axios.post(import.meta.env.VITE_SERVER_LINK + 'team' , {
            team_name : team_name,
            team_description : team_description,
            team_members : team_members
        })

        if(response.status === 201){
            toast.success('Team created successfully')
        }
    }
    catch(err : any){
        toast.error('Error creating team')
    }
    finally{
        dispatch(setTeamMode(false))
        setTeamModal(false)
    }

  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-lg"></div>
      <div className="w-[30rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Team Name
          </label>
          <input
            className="w-full border rounded-md py-2 px-3"
            type="text"
            placeholder="Enter team name"
            value={team_name}
            onChange={ (e) => dispatch(setTeamName(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Team Description
          </label>
          <textarea
            className="w-full border rounded-md py-2 px-3"
            placeholder="Enter team description"
            value={team_description}
            onChange={ (e) => dispatch(setTeamDescription(e.target.value))}
          />
        </div>
        <div>
          <h1 className="block text-gray-700 text-sm font-bold mb-2">
            Team Members
          </h1>
          {team_members.map((member: any, i) => (
            <div key={i}>
              <div className="flex flex-row justify-between items-center gap-5 mb-5">
                <div className="flex flex-row items-center gap-5">
                  <img
                    className="mx-auto border-2 h-[40px] w-[40px] object-cover rounded-full"
                    src={member.avatar}
                    alt="Avatar"
                  />
                  <p>{member.first_name} {member.last_name}</p>
                </div>
                <p className="mr-5">
                    {member.domain}
                </p>
              </div>
              {i < team_members.length - 1 && <hr className="w-full mt-2 mb-2" />}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-5">
          <button
            className=" cursor-pointer 
              w-[80px] h-[40px] bg-black text-white rounded-md hover:scale-105 transition-all duration-200
             ease-in-out"
            onClick={handleCreateTeam}
          >
            Save
          </button>
          <button
            className=" cursor-pointer
              w-[80px] h-[40px] bg-black text-white rounded-md hover:scale-105 transition-all duration-200
             ease-in-out"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default TeamModal;
