import React from 'react';
import StaffItem from './StaffItem';
import { useSelector } from 'react-redux';

const StaffList = () => {
    const { staffData } = useSelector(state => state.staff)
    return (
        <ul>
            {
                staffData.map(item=> <StaffItem key={item.id} item={item}/>)
            }
        </ul>
    );
};

export default StaffList;