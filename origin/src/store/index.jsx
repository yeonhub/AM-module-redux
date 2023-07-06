import { configureStore } from "@reduxjs/toolkit";
import staff from './modules/staffSLice'

export const store = configureStore({
    reducer: {
        staff,
    }
})
