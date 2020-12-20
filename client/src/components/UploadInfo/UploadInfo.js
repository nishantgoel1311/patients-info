import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPatients } from '../../actions/patients';

import { uploadPatients } from '../../api';

const UploadInfo = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch();

    const onChangeHandler = event => {
        setSelectedFile(event.target.files[0]);
      }

    const  onClickHandler = () => {
        const data = new FormData()
        console.log(selectedFile.type);
        data.append('file', selectedFile)
        uploadPatients(data)
        .then(() => {
            setTimeout(() => dispatch(getPatients()), 1000);
        });
     }

    
    return (
        <div className='offset-md-3 col-md-6' style={{backgroundColor: "white", marginBottom: '20px', marginTop: '20px'}}>
                    <div className='form-group files'>
                        <label>Upload Your File</label>
                        <input type='file' name='file' className='form-control' onChange={onChangeHandler} />
                    </div>    

                    <button type="button" className="btn btn-success btn-block" onClick={onClickHandler} style={{marginBottom: '10px'}}>Upload</button>

        </div>  
    )

}

export default UploadInfo;