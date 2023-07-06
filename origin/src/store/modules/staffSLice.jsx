import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAdd: false,
    name: '',
    img: '',
    job: '',
    tel: '',
    staffData: [
        { id: 1, name: '펭귄', img: './images/img0.png', job: '어부', tel: '010-4521-1313', like: false },
        { id: 2, name: '악어', img: './images/img1.png', job: '목수', tel: '010-2342-1313', like: false },
        { id: 3, name: '삑삑이', img: './images/img2.png', job: '경찰', tel: '010-2136-1313', like: false },
        { id: 4, name: '루피', img: './images/img3.png', job: '대장장이', tel: '010-1122-1313', like: false },
        { id: 5, name: '누렁이', img: './images/img4.png', job: '전사', tel: '010-8955-1313', like: false },
        { id: 6, name: '북극곰', img: './images/img5.png', job: '가수', tel: '010-6112-1313', like: false }
    ]
}

let no = 7

const initStaffData = [
    { id: 1, name: '펭귄', img: './images/img0.png', job: '어부', tel: '010-4521-1313', like: false },
    { id: 2, name: '악어', img: './images/img1.png', job: '목수', tel: '010-2342-1313', like: false },
    { id: 3, name: '삑삑이', img: './images/img2.png', job: '경찰', tel: '010-2136-1313', like: false },
    { id: 4, name: '루피', img: './images/img3.png', job: '대장장이', tel: '010-1122-1313', like: false },
    { id: 5, name: '누렁이', img: './images/img4.png', job: '전사', tel: '010-8955-1313', like: false },
    { id: 6, name: '북극곰', img: './images/img5.png', job: '가수', tel: '010-6112-1313', like: false }
]

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        // staff
        onAdd(state, action) {
            state.isAdd = !state.isAdd
        },
        resetStaff(state, action) {
            state.staffData = initStaffData
        },

        // staffItem
        delStaff(state, action) {
            state.staffData = state.staffData.filter(item => item.id !== action.payload)
        },
        allDelStaff(state, action) {
            state.staffData = []
        },
        likeStaff(state, action) {
            const staffItem = state.staffData.find(item => item.id === action.payload)
            staffItem.like = !staffItem.like
        },

        //  staffForm
        addBtnStaff(state, action) {
            const { name, job, img, tel } = action.payload
            state.staffData.push(
                {
                    id: no++,
                    name,
                    job,
                    img,
                    tel
                }
            )
        },

        changeInput(state, action) {
            const { name, value } = action.payload
            return {
                ...state,
                [name]: value,
            };
        },
        resetForm(state, action) {
            state.name = '';
            state.job = '';
            state.img = '';
            state.tel = '';
        },
    }
})

// 함수 내보내기

export const { onAdd, delStaff, addBtnStaff, resetStaff, allDelStaff, likeStaff, changeInput, resetForm } = staffSlice.actions
export default staffSlice.reducer
