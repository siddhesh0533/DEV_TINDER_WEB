import { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user)

  const fetchUser = async () => {
    if (userData) return;
    
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // console.log(res);
      
      dispatch(addUser(res.data));
    }
    catch (error) {
      if (error.status === 401) {
        navigate("/login")
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )

}

export default Body
