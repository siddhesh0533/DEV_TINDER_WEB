import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connection = () => {

    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();

    const fetchconnection = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/requests/connections', { withCredentials: true })
            dispatch(addConnection(res?.data?.data))
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchconnection();
    }, [])

    if (!connections) return;

    if (connections.length === 0) return <h1>Connection Not Found</h1>

    return (
        <div className='text-center '>
            <h1 className='font-bold text-4xl text-center m-5'>Connections</h1>
            {connections.map((connection) => {
                const { _id, firstName, lastName, age, gender, photoUrl } = connection;

                return (
                    <div key={_id} className='flex items-center p-4 rounded-lg bg-base-300 w-96 m-auto'>
                        <div>
                            <img className='w-20 h-20 rounded-full' src={photoUrl} alt="photo" />
                        </div>
                        <div className='text-left mx-10'>
                            <h2 className='font-bold text-xl'>
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connection
