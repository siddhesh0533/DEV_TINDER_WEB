import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [errmsg, setErrMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
            },
                { withCredentials: true, });
            dispatch(addUser(res?.data?.data))
        } catch (error) {
            console.error("PATCH error:", error);
            setErrMsg(error?.response?.data || error.message || "something went wrong");
        }
    }

    return (
        <div className='flex justify-center '>
            <div className='flex justify-center items-center '>
                <div className="card card-dash bg-base-300 w-96 ">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl">Edit Profile</h2>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">FirstName</legend>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">LastName</legend>
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <input value={gender} onChange={(e) => setGender(e.target.value)} type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input value={age} onChange={(e) => setAge(e.target.value)} type="number" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">PhotoUrl</legend>
                            <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <div className="card-actions justify-center">
                            <button onClick={(e) => { e.preventDefault(); handleSave() }} className="btn btn-primary">Save Profile</button>
                        </div>
                        <p className="justify-center label text-red-600">{errmsg}</p>
                    </div>
                </div>
            </div>
            <div className='m-10'>
                <Card user={{ firstName, lastName, age, gender, photoUrl }} />
            </div>
        </div>
    )
}

export default EditProfile
