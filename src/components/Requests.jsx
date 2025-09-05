import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'

const Requests = () => {

  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch();

  const fetchrequest = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', { withCredentials: true })
      dispatch(addRequest(res?.data?.Data))
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchrequest();
  }, [])

  if (!requests) return;

  if (requests.length === 0) return <h1>Requests Not Found</h1>

  return (
    <div className='text-center '>
      <h1 className='font-bold text-4xl text-center m-5'>Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl } = request.fromUserId;

        return (
          <div key={_id} className='flex justify-center items-center p-4 rounded-lg bg-base-300 w-96 m-auto'>
            <div>
              <img className='w-20 h-20 rounded-full' src={photoUrl} alt="photo" />
            </div>
            <div className='text-center mx-10'>
              <h2 className='font-bold text-xl'>
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
            <div className='flex flex-col'>
              <button className="btn btn-primary m-1">Primary</button>
              <button className="btn btn-secondary m-1">Secondary</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests
