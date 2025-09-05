import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

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

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials : true })
      dispatch(removeRequest(_id))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchrequest();
  }, [])

  if (!requests) return <h1 className='text-center font-bold m-5 text-2xl'>Requests Not Found</h1>

  if (requests.length === 0) return <h1 className='text-center font-bold m-5 text-2xl'>Requests Not Found</h1>

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
              <button className="btn btn-primary m-1" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
              <button className="btn btn-secondary m-1" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests
