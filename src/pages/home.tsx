import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { IUser } from "../vite-env"

import UserCard from "../components/UserCard"
import Pagination from "../components/Pagination"
import Filter from "../components/Filter"
import Navbar from "../components/Navbar"
import TeamModal from "../components/TeamModal"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/reducer"
import { setData } from "../store/slices/userSlice"
import { setTeamMode , setTeamMembers } from "../store/slices/teamSlice"

const Home = () => {

  const [totalPages , setTotalPages] = useState<number>(0)
  const [teamModal , setTeamModal] = useState<boolean>(false)
  const [loading , setLoading] = useState<boolean>(false)

  const {createTeamMode, 
      team_members} 
   = useSelector((state : RootState) => state.team)

  const { 
    search , 
    page , 
    gender , 
    domain , 
    availability , 
    data } = useSelector((state : RootState) => state.user)
  
  const dispatch = useDispatch(); 

  const getUsers = async () => {
    try{
      setLoading(true)
      let query = import.meta.env.VITE_SERVER_LINK + 'user?' 
      + 'page=' + page.toString() + '&'
      + 'search=' + search.toString() + '&'
      + 'gender=' + gender.toString() + '&'
      + 'domain=' + domain.toString() + '&'
      + 'available=' + availability.toString()
  
      const response = await axios.get(query)
      dispatch(setData(response.data.users))
      setTotalPages(response.data.totalPages)
    }
    catch(err : any){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  } , [search , page , gender , domain , availability])


  const addUserHandle = (user : any) => {
    console.log(user)
    if(user.available === false) return
    if(team_members.includes(user)) {
      const newTeam = team_members.filter((member : any) => member !== user)
      dispatch(setTeamMembers(newTeam))
    }
    else {
      dispatch(setTeamMembers([...team_members , user]))
    }
  }

  const createTeamHandle = () => {
    if(team_members.length === 0){
      toast.error('Please select atleast one member')
    }
    else {
      setTeamModal(true)
      dispatch(setTeamMode(false))
    }
  }

  return (
    <>
    <div>

        <Navbar />

        <div className="flex flex-row justify-evenly items-center w-[80%] mx-auto mt-5 mb-5">
          <Filter />

          {
            !createTeamMode &&
            (<button onClick={() => dispatch(setTeamMode(true))}
            className="w-[100px] h-[45px] bg-black text-white rounded-md hover:scale-105 transition-all duration-200
             ease-in-out">
                  Make Team
              </button>)
          
          }
          <div className="gap-5 flex">
            {
              createTeamMode &&
              (<button onClick={createTeamHandle}
              className="w-[100px] h-[45px] bg-black text-white rounded-md hover:scale-105 transition-all duration-200
              ease-in-out">
                    Create
                </button>)
            }
            {
              createTeamMode && 
                (<button onClick={() => dispatch(setTeamMode(false))}
                className="w-[100px] h-[45px] bg-black text-white rounded-md hover:scale-105 transition-all duration-200
              ease-in-out">
                    Cancle
                </button>)
            }

          </div>
          
        </div>  

        <div className="w-[90%] gap-5 mx-auto flex flex-col mb-5">
          {
            loading && 
            (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-solid"></div>
                <h1 className="text-4xl font-bold text-center ml-4">Loading...</h1>
              </div>
            )
          }
          {
            data.map((user : IUser , i : number) => (
              <div onClick={() => addUserHandle(user)} key={i} 
                className={"cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"}>
                  <UserCard user={user} />
              </div>
            ))
          }
        </div>

        <div className="flex justify-center mt-5 mb-10 max-w-full mx-auto">
          <Pagination totalPages={totalPages}/>
        </div>

          {
            teamModal && <TeamModal setTeamModal={setTeamModal} />
          }
    </div>
    </>
  )
}

export default Home
