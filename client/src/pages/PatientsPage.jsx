import { useState } from "react";
import AddPatient from "../components/patients/AddPatient";
import PatientsList from "../components/patients/PatientsList";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  const handlePatientAdded = (newPatient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
  };

  return (
    <div>
      <AddPatient onPatientAdded={handlePatientAdded} />
      <PatientsList patients={patients} setPatients={setPatients} />
    </div>
  );
};

export default PatientsPage;