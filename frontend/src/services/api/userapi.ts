import api from "./baseapi";

const getToken = async ()=>{
    try{
        const response = await api.get('auth/token');
        return response.data;
    }catch(error){
        throw error;
    }

};

const getUser = async ()=>{
    try{
        const response = await api.get('/user/profile');
        return response.data;
    }catch(error){
        throw error;
    }

};
export {getToken, getUser};
