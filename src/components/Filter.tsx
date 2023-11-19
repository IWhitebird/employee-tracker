import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/reducer";
import {
  setSearch,
  setGender,
  setDomain,
  setAvailability,
} from "../store/slices/userSlice";

const Filter = () => {
  const { search, gender, domain, availability } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  return (
    <div className="mt-10 mb-10 flex flex-row w-[60%] mx-auto rounded-xl p-2 content-center items-center justify-between bg-gray-100">
      <div>
        {/* Search bar */}
        <input
          type="text"
          placeholder={'Search...'}
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="border p-2 w-full rounded-2xl"
        />
      </div>

      <div>
        {/* Gender drop down */}
        <select
          value={gender}
          onChange={(e) => dispatch(setGender(e.target.value))}
          className="border p-2 w-full"
        >
          <option value="all">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        {/* Domain drop down */}
        <select
          value={domain}
          onChange={(e) => dispatch(setDomain(e.target.value))}
          className="border p-2 w-full"
        >
          <option value="">Select Domain</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      <div>
        {/* Availability switch */}
        <select
          value={availability}
          onChange={(e) => dispatch(setAvailability(e.target.value))}
          className="border p-2 w-full"
        >
          <option value="all">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
