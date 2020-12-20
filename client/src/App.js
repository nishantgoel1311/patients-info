import React, {useEffect} from 'react';
import UploadInfo from './components/UploadInfo/UploadInfo';
import PatientTable from './components/PatientTable/PatientTable';
import {useDispatch} from 'react-redux';

import {getPatients} from './actions/patients';
import './App.css';

const App = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPatients())
    }, [dispatch])

    return (
        <div className='container'>
            <div className='row'>
                <div className='App-Bar'>
                    <label className='App-Name'>
                        Patient Details
                    </label>
                </div>
            </div>
            <div className='row'>
                <UploadInfo />
                <a href='/files/sample_patient_details.csv' style={{marginLeft: '30px', marginTop: '20px', color: 'black'}}>Download Sample File</a>
            </div>
            <div className="row">
                <PatientTable />
            </div>
        </div>
    )
}

export default App;