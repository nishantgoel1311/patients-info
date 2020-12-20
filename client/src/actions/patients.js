import * as api from '../api';

export const getPatients = () => async (dispatch) => {
    try {
         const {data} = await api.fetchPatients();
         dispatch({type: 'CLEAR'})
         dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}