import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removefromfeed } from '../utils/feedSlice';
import TestButton from './Test';

const Card = ({user}) => {

    const {_id, firstName, lastName, age, gender, skills, photoUrl} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async(status, _id) =>{
        try {
            const res= await axios.post(BASE_URL + '/request/send/' + status + '/' + _id, {}, {withCredentials:true})
            dispatch(removefromfeed(_id))
        } catch (error) {
            
        }
    }
    
    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure className='h-6/12'>
                    <img 
                        src={photoUrl}
                        alt="user" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                    {age&&gender&&<p>{"age: " + age + " "+ "gender: " + gender}</p>}
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
                    {_id && <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored", _id)}>Ignored</button>
                        <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
                    </div>}
                    <TestButton/>
                </div>
            </div>
        </div>
    )
}

export default Card
