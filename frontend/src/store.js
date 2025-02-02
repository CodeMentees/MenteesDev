import {configureStore} from '@reduxjs/toolkit';
import authReducer  from './Slices/authSlice';   
import categoryReducer from './Slices/categorySlice' 

export default configureStore({
    reducer: {
        auth: authReducer,
        category : categoryReducer
    },
    });


