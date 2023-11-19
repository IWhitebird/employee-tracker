import { useEffect, useState } from "react"
import Card from "../components/Card"
import Pagination from "../components/Pagination"
import Filter from "../components/Filter"
import { IUser } from "../vite-env"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/reducer"
import { setData } from "../store/slices/userSlice"
import Navbar from "../components/Navbar"

const Home = () => {

  const [totalPages , setTotalPages] = useState<number>(0)
  
  const { 
    search , 
    page , 
    gender , 
    domain , 
    availability , 
    data } = useSelector((state : RootState) => state.user)
  
  const dispatch = useDispatch();
  
  const [seto, setSeto] = useState(new Set());

  const getAll = async () => {
    try {
      const q = import.meta.env.VITE_SERVER_LINK + 'user/getAll';
      console.log(q);
      
      const response = await axios.get(q);
      const users = response.data;
      console.log(users);
  
      users.forEach((user : any) => {
        setSeto(seto.add(user.domain));
      }); 
  
      console.log("seto" , seto);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const getUsers = async () => {

    let query = import.meta.env.VITE_SERVER_LINK + 'user?' 
    + 'page=' + page.toString() + '&'
    + 'search=' + search.toString() + '&'
    + 'gender=' + gender.toString() + '&'
    + 'domain=' + domain.toString() + '&'
    + 'availability=' + availability.toString()

    const response = await axios.get(query)
    dispatch(setData(response.data.users))
    setTotalPages(response.data.totalPages)
  }

  useEffect(() => {
    getUsers()
    getAll();
  } , [search , page , gender , domain , availability])


  return (
    <>
    <div>

        <Navbar />
        <Filter />

        <div className="w-[90%] gap-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {
            data.map((user : IUser) => (
              <Card user={user} />
            ))
          }
        </div>

        <div className="flex justify-center mt-5 mb-10 max-w-full mx-auto">
          <Pagination totalPages={totalPages}/>
        </div>
    </div>
    </>
  )
}

export default Home
