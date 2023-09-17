import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import ProfessionalSlice from './ProfessionalSlice';


const persistConfig = {
    key: 'root',      
    storage,     
};

const persistedReducer = persistReducer(persistConfig, ProfessionalSlice);

const Store = configureStore({
    reducer: {
        professional: persistedReducer,
    },
});

const persistor = persistStore(Store);

export { Store, persistor };
