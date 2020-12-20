import axios from 'axios';

const url = 'https://patient-details-project.herokuapp.com/patients';

export const fetchPatients = () => axios.get(url);

export const uploadPatients = (data) => axios.post(url+'/upload', data);