import { IUser } from '../vite-env';

const Card = ({ user } : {user : IUser}) => {
  return (
    <div className="min-w-[400px] mx-auto bg-white rounded-lg overflow-hidden border-2 border-black">
      <div className="flex">
        <div className="w-1/4 flex items-center p-2">
          <img className="mx-auto border-2 h-[80px] w-[80px] object-cover rounded-full" src={user.avatar} alt="Avatar" />
        </div>
        <div className="w-3/4 p-4 ml-2 flex flex-col gap-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="flex flex-row text-gray-600 gap-10">
            <p className="mr-4 font-bold min-w-[80px]">{user.domain}</p>
            <p>{user.gender}</p>
          </div>

          <div className="flex flex-row text-gray-600 font=bold">
            {
                user.available ? 
                 (<p className='text-green-500'>Available</p>) :
                 (<p className='text-red-500'>Not Available</p>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
