import { IUser } from '../vite-env';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

const UserCard = ({ user }: { user: IUser }) => {
  const { team_members, createTeamMode } = useSelector((state: RootState) => state.team);

  return (
    <div className={`w-full text-xs lg:text-lg lg:w-[80%] mx-auto  rounded-lg overflow-hidden border-2 border-black
      ${
        createTeamMode &&
        (team_members.includes(user)
          ? 'border-green-500'
          : user.available === true &&
            team_members.filter((mem) => mem.domain === user.domain).length === 0
          ? 'border-black bg-white'
          : 'bg-red-300')
      }`}
    >

      <div className="w-full flex lg:hidden">
        
        <div className="flex min-w-[15%] items-center p-2">
          <img className="mx-auto border-2 h-[50px] w-[50px] object-cover rounded-full" src={user.avatar} alt="Avatar" />
        </div>


        <div className='flex w-full flex-col justify-center gap-2 lg:flex-row'>
          
          <div className='flex flex-row gap-5 w-full'>
            <h2 className="self-center min-w-[50%] lg:text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
            
            
            <h2 className="self-center min-w-[50%] text-gray-600">{user.email}</h2>

          </div>

          <div className='flex flex-row gap-2 w-full'>
              <p className="self-center max-w-[40%] min-w-[40%]  mr-4 font-bold">{user.domain}</p>
              <p className="self-center max-w-[20%] min-w-[20%] mr-4 font-bold">{user.gender}</p>

              <div className="self-center max-w-[40%] min-w-[40%] flex flex-row text-gray-600 font-bold">
                {user.available ? (
                  <p className="text-green-500">Available</p>
                ) : (
                  <p className="text-red-500">Not Available</p>
                )}
              </div>

          </div>

        </div>


      </div>
      <div className="w-full hidden lg:flex">
        
        <div className="flex min-w-[15%] items-center p-2">
          <img className="mx-auto border-2 h-[50px] w-[50px] object-cover rounded-full" src={user.avatar} alt="Avatar" />
        </div>


          
            <h2 className="self-center min-w-[20%] lg:text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
            
            
            <h2 className="self-center  min-w-[27%] max-w-[25%] text-gray-600">{user.email}</h2>


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
