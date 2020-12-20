import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Age: Number,
    Gender: String,
    Contact: Number,
})

const PatientInfo = mongoose.model('PatientInfo', patientSchema);

export default PatientInfo;