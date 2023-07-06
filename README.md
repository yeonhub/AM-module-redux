# AM-module-redux

[React 페이지](https://yeonhub.github.io/AM-module-react/)

<br/>

React로 구현했던 직원명단 관리 페이지를 redux를 사용해 전역으로 변수, 상태, 함수를 관리할 수 있도록 했다.

<br/>

```javascript
src	┌	staff   ┌   Staff.jsx
        │        	├   Staff.scss
        │        	├   StaffList.jsx
        │       	├   StaffForm.jsx
        │      		└   StaffItem.jsx
	└	store	┌	modules	   ━	staffSlice.jsx
			└	index.jsx

```
<br/>

### 데이터 관리

기존 javascript나 react에선 직원 명단의 data를 js 파일로 따로 저장해 관리했지만 redux를 사용할 땐 관리자가 있는 staffSlice.jsx에서 관리했다.

```java
const initialState = {

	// 명단 추가 컴포넌트를 보이기 / 숨기기에 사용하는 상태변수 isADD
	// input으로 입력받는 값들의 키인 name, img, job, tel의 초기값 설정

    isAdd: false,
    name: '',
    img: '',
    job: '',
    tel: '',

	// 기존 명단 data

    staffData: [
        { id: 1, name: '펭귄', img: './images/img0.png', job: '어부', tel: '010-4521-1313', like: false },
        { id: 2, name: '악어', img: './images/img1.png', job: '목수', tel: '010-2342-1313', like: false },
        { id: 3, name: '삑삑이', img: './images/img2.png', job: '경찰', tel: '010-2136-1313', like: false },
        { id: 4, name: '루피', img: './images/img3.png', job: '대장장이', tel: '010-1122-1313', like: false },
        { id: 5, name: '누렁이', img: './images/img4.png', job: '전사', tel: '010-8955-1313', like: false },
        { id: 6, name: '북극곰', img: './images/img5.png', job: '가수', tel: '010-6112-1313', like: false }
    ]
}
```
<br/>

### 함수 전역 관리

```javascript
export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {

	// reducers 안에 staff 페이지에서 사용할 함수들을 모두 관리한다.
	// staff, staffItm, staffForm 컴포넌트에서 사용할 함수들을 구별해 놓았다.

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


	// 명단을 추가하는 버튼을 클릭하면 입력 받은 action.payload를
	// 비구조 할당으로 나누어서 기존의 data인 staffData에 push해 준다.

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

	// input에 text가 입력되거나 삭제됐을 때 호출되는 함수 changeInput
	// 마찬가지로 비구조 할당으로 사용하기 편하게 나누었고,
	// 나머지 data들은 놔둔채 입력받은 name, job, img, tel들을
	// key : value 형식으로 저장되도록 했다.

        changeInput(state, action) {
            const { name, value } = action.payload
            return {
                ...state,
                [name]: value,
            };
        },

	// onSubmit 함수 실행중 마지막에 호춛되는 함수이며
	// input의 value들을 모두 공백으로 만들어준다.

        resetForm(state, action) {
            state.name = '';
            state.job = '';
            state.img = '';
            state.tel = '';
        },
    }
})

	// 작성한 함수 내보내기

export const { onAdd, delStaff, addBtnStaff, resetStaff, allDelStaff, likeStaff, changeInput, resetForm } = staffSlice.actions
export default staffSlice.reducer

```

<br/>

### 컴포넌트에서 함수 호출 및 사용

```javascript

	// 사용할 함수를 호출하고, 함수 호출을 위한 useDispatch도 import 해 준다.
	// isAdd 상태변수를 사용하기 위해 useSelector도 import해 준다.


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

	// javascript에서 이벤트 발생시 함수를 호출하려면 onClick={함수}
	// 바로 작성이 가능했지만 이번 경우 전역 함수를 가져와 사용해야 하기 때문에
	// dispatch를 앞에 붙여주었다.

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
```

<br/>

### form 컴포넌트

```javascript
import { useDispatch, useSelector } from "react-redux";
import { addBtnStaff, changeInput, resetForm } from "../store/modules/staffSLice";

const StaffForm = () => {
    const dispatch = useDispatch()

	// staffSlice에 있는 변수인 name, job, tel, img를 가져오기 위해
	// useSelector를 사용했다.

    const { name, job, tel, img } = useSelector(state => state.staff)

    const onSubmit = e => {

	// 추가 버튼을 누를 시 실행되는 함수인데 새로고침을 막기 위해
	// prevnetDefault를 넣었고, 이름, 직업, 사진, 연락처중 하나라도
	// 입력이 되지 않았을 경우 이후 코드들이 실행되지 않게 return을 해줬다.
	// 마지막으로 input의 value들이 모두 공백처리가 되도록 resetForm 함수 호출

        e.preventDefault()
        if (!name || !job || !img || !tel) return
        dispatch(addBtnStaff({ name, job, img, tel }))
        dispatch(resetForm())
    }

    const onChange = e => {

	// 입력받는 input값이 하나가 아니므로 name, value를 따로 비구조 할당
	// 하여 changeInput 함수로 넘겨주었다.

        const { name, value } = e.target
        dispatch(changeInput({ name, value }))
    }

    return (
        <form onSubmit={onSubmit}>
            <p>
                <label>이름</label>
                <input type="text" name="name" value={name} onChange={onChange} placeholder='이름' />
            </p>
            <p>
                <label>직업</label>
                <input type="text" name="job" value={job} onChange={onChange} placeholder='직업' />
            </p>
            <p>
                <label>연락처</label>
                <input type="text" name="tel" value={tel} onChange={onChange} placeholder='010-0000-0000' />
            </p>
            <p>
                <label>사진</label>
                <input type="text" name="img" value={img} onChange={onChange} placeholder='사진 링크' />
            </p>
            <p>
                <button type="submit" >추가</button>
            </p>
        </form>
    );
};

export default StaffForm;
```
