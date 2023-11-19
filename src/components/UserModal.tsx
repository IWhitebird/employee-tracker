import { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../vite-env";
import Loading from "./Loading";
import { AiOutlineClose } from "react-icons/ai";

const UserModal = ({
  userId,
  setUserModalId,
}: {
  userId: any;
  setUserModalId: Function;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({} as IUser);

  function closeModal() {
    setUserModalId(null);
  }

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_SERVER_LINK + "user/" + userId
      );
      console.log(response);
      setUser(response.data.user);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-opacity-50 bg-gray-700">
      {loading && <Loading />}
      {!loading && (
        <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
          <div className="text-center user-profile-container">
            <img
              className="h-20 w-20 object-cover rounded-full border-2 border-gray-300 mx-auto mb-4 animated-avatar"
              src={user.avatar}
              alt="Avatar"
            />
            <h2 className="text-xl font-semibold animated-name">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-600 mb-2 animated-info">{user.email}</p>
            <p className="text-black-600 font-bold mb-2 animated-info">{user.domain}</p>
            <p className="text-gray-600 mb-4 animated-info">{user.gender}</p>
            <p
              className={`text-gray-600 ${
                user.available ? "text-green-500" : "text-red-500"
              } animated-status`}   
            >
              {user.available ? "Available" : "Not Available"}
            </p>
          </div>
          <button
            className="absolute text-4xl top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserModal;
