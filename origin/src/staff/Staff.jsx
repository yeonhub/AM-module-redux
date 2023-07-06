import React, { useRef, useState } from 'react';
import '../assets/css/reset.css'
import './Staff.scss'
import StaffList from './StaffList';
import StaffForm from './StaffForm';
import { useDispatch, useSelector } from 'react-redux';
import { allDelStaff, onAdd, resetStaff } from '../store/modules/staffSLice';

const Staff = () => {
    const { isAdd } = useSelector(state => state.staff)
    const dispatch = useDispatch()

    return (

        <div className='wrap'>
            <div className="list">
                <h2>직원 명단</h2>
                <p>
                    <button onClick={() => dispatch(allDelStaff())}>전체 삭제</button>
                    <button onClick={() => dispatch(resetStaff())}>초기화</button>
                </p>
                <button className='add' onClick={() => dispatch(onAdd())}>명단 추가</button>
                {
                    isAdd && <StaffForm />
                }
                <StaffList />
            </div>
        </div>
    );
};

export default Staff;