import { useDispatch, useSelector } from "react-redux";
import { addBtnStaff, changeInput, resetForm } from "../store/modules/staffSLice";

const StaffForm = () => {
    const dispatch = useDispatch()
    const { name, job, tel, img } = useSelector(state => state.staff)

    const onSubmit = e => {
        e.preventDefault()
        if (!name || !job || !img || !tel) return
        dispatch(addBtnStaff({ name, job, img, tel }))
        dispatch(resetForm())
    }

    const onChange = e => {
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