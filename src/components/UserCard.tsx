import { IUser } from '../vite-env';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

const UserCard = ({ user }: { user: IUser }) => {
  const { team_members, createTeamMode } = useSelector((state: RootState) => state.team);

  return (
    <div className={`lg:w-[80%] mx-auto bg-white rounded-lg overflow-hidden border-2 border-black
    ${createTeamMode && (team_members.includes(user) ? 'border-green-500' : user.available === true ? 'border-black' : 'border-gray-400')}`}>
      <div className="flex w-full ">
        
        <div className="flex min-w-[15%] items-center p-2">
          <img className="mx-auto border-2 h-[50px] w-[50px] object-cover rounded-full" src={user.avatar} alt="Avatar" />
        </div>


        <h2 className="self-center min-w-[20%] text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
        <h2 className="self-center  min-w-[25%] max-w-[25%] text-gray-600">{user.email}</h2>


        <p className="self-center  min-w-[10%] max-w-[10%] mr-4 font-bold">{user.domain}</p>
        <p className="self-center  min-w-[10%] mr-4 font-bold">{user.gender}</p>

          <div className="self-center min-w-[10%] flex flex-row text-gray-600 font-bold">
            {user.available ? (
              <p className="text-green-500">Available</p>
            ) : (
              <p className="text-red-500">Not Available</p>
            )}
          </div>

      </div>
    </div>
  );
};

export default UserCard;
