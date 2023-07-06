import React from 'react';
import { useDispatch } from 'react-redux';
import { delStaff, likeStaff } from '../store/modules/staffSLice';

const StaffItem = ({ item }) => {
    const { id, img, name, job, tel, like } = item
    const dispatch = useDispatch()

    return (
        <li>
            <img src={img} alt={name} />
            <div>
                <strong>{name}</strong>
                <span>{job}</span>
                <p>{tel}</p>
            </div>
            <div>
                {
                    like ? <i className='xi-heart' onClick={() => dispatch(likeStaff(id))} ></i> : <i className='xi-heart-o' onClick={() => dispatch(likeStaff(id))} ></i>
                }
                <button onClick={() => dispatch(delStaff(id))}>퇴사</button>
            </div>
        </li>
    );
};

export default StaffItem;