import { useEffect, useState } from 'react'
import axios from 'axios'
import TeamCard from '../components/TeamCard'
import Navbar from '../components/Navbar'
import TeamModal from '../components/TeamModal'
import Loading from '../components/Loading'

const Teams = () => {

  const [clickedTeam , setClickedTeam] = useState<any>(null)
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
          <Loading />
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
            <div key={index} className='cursor-pointer' onClick={() => setClickedTeam(team)}>
              <TeamCard  team={team} />
            </div>
          ))}
        </div>
        )
      }
    </div>
    {
      clickedTeam !== null && 
      <TeamModal teamId={clickedTeam._id} setClickedTeam={setClickedTeam} />
    }
    </>
  )
}

export default Teams



