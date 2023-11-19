import { useEffect, useState } from 'react'
import axios from 'axios'
import TeamCard from '../components/TeamCard'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

const Teams = () => {

  const [loading , setLoading] = useState(true)
  const [teams , setTeams] = useState([])

  const fetchTeams = async () => {
    try{
      setLoading(true)
      const response = await axios.get(import.meta.env.VITE_SERVER_LINK + 'team')
      setTeams(response.data.team)
    }
    catch(err : any){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeams()
  } , [])

  return (
    <>
    <Navbar />
    <div className="container mx-auto my-8 w-[80%] mt-24">
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
        !loading && teams.length === 0 ? 
        (
          <div>
            <h1 className="text-4xl font-bold text-center">No teams created yet</h1>
          </div>
        ) 
        :
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teams?.map((team, index) => (
            <TeamCard key={index} team={team} />
          ))}
        </div>
        )
      }
    </div>
    </>
  )
}

export default Teams



