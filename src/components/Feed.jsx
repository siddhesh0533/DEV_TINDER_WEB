import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice'
import Card from './UserCard'

const Feed = () => {

  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();

  const getfeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true })
      dispatch(addfeed(res.data))
    } catch (error) {

    }
  }

  useEffect(() => {
    getfeed();
  }, [])


  return (feed && (
    <div className='flex justify-center my-10'>
      <Card user={feed[0]} />
    </div>
  ))
}

export default Feed
