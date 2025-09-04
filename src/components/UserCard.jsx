import React from 'react'

const Card = ({user}) => {

    const {firstName, lastName, age, gender, skills, photoUrl} = user;
    
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
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Ignored</button>
                        <button className="btn btn-secondary">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
