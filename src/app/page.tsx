"use client"

import { useEffect, useState } from "react"
import Card from "@emplyee-tracker/components/Card"
import { IUser } from "../../next-env"
import axios from "axios"
import Pagination from "@emplyee-tracker/components/Pagination"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@emplyee-tracker/store/reducer"
import { setData } from "@emplyee-tracker/store/slices/userSlice"

export default function Home() {

  const [totalPages , setTotalPages] = useState<number>(0)
  const { search , page , gender , domain , availability , data } = useSelector((state : RootState) => state.user)
  
  const dispatch = useDispatch();

  

  const getUsers = async () => {
    const query = process.env.NODE_SERVER_LINK
    const response = await axios.get("http://localhost:5000/api/v1/user")
    console.log(response)
    dispatch(setData(response.data.users))
    setTotalPages(response.data.totalPages)
  }

  useEffect(() => {
    getUsers()
  } , [])

  console.log(data)

  return (
    <>
      <main>

        <div className="w-full flex justify-between mt-8">
          <h1 className="text-4xl font-extrabold ml-2">EmployeeTracker</h1>

          <div className="flex flex-row gap-10 mr-[15rem] text-lg font-bold">
            <h1 className="p-3 px-10 border border-black rounded-lg ">
              Users</h1>

            <h1 className="p-3 px-10 border border-black rounded-lg ">
              Teams</h1>
          </div>

          <div>
          </div>

        </div>

        <div className="w-full h-[100px] text-center mt-10"> 
          FILTER
        </div>

        <div className="w-[90%] gap-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {
            data.map((user : IUser) => (
              <Card user={user} />
            ))
          }
        </div>

        <div className="flex justify-center mt-5 mb-10 max-w-full mx-auto">
          <Pagination totalPages={totalPages} onPageChange={} />
      </div>

      </main>
    </>
  )
}
