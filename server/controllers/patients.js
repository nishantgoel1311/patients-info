import PatientInfo from '../models/patientInfo.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import neatCsv from 'neat-csv';


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

export const getPatients = async (req, res) => {
    try {
        const patientInfo = await PatientInfo.find();
        
        res.status(200).json(patientInfo);
    } catch (error) {
        
        res.status(404).json({ message: error.message });
    }
};

export const createPatients = (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   
        const filePath = path.join( './files', req.file.filename);
        await fs.readFile(filePath, async (error, data) => {
          if (error) {
            return console.log('error reading file');
          }
          let patientData = await neatCsv(data);
          if(Array.isArray(patientData) && patientData.length){
            patientData.forEach(async (patient, index) => {
                const newPatient = new PatientInfo(patient);
                const existingPatient = await PatientInfo.find({"Contact": patient.Contact});

                if(existingPatient && existingPatient.length){
                    console.log('existed');
                } else {
                    console.log('not existed');
                    await newPatient.save();
                }

            })
          }
          res.write(JSON.stringify(patientData, null, 2)); 
          res.end();
        }); 
        
        await fs.unlink(filePath, (err) => {
            console.log('File Not deleted ...', err);
        })
        

 })
};