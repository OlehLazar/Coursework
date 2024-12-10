/* eslint-disable react/prop-types */
import { useState} from "react";
import axios from "axios";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Section from "../shared/Section"

const AddPatient = ({ onPatientAdded }) => {
  const [patientData, setPatients] = useState({ name: "", age: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatients((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPatient = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ви не авторизовані!");
      return;
    }
  
    axios
      .post(
        "http://localhost:8080/api/patients",
        patientData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        //alert("Пацієнта додано успішно!");
        onPatientAdded(response.data); // Викликаємо callback з новим пацієнтом
        setPatients({ name: "", age: "" });
      })
      .catch((error) => {
        console.error("Помилка під час додавання пацієнта:", error);
        alert("Не вдалося додати пацієнта.");
      });
  };

  return (
    <Section>
      <div className="flex flex-col justify-center items-center mx-auto w-1/2 text-center">
        <h1 className="font-playfair text-2xl font-semibold pb-5 pt-5">Додати пацієнта</h1>
        <Input
          name="name"
          placeholder="Ім'я"
          value={patientData.name}
          onChange={handleChange}
        />
        <Input
          name="age"
          placeholder="Вік"
          type="number"
          value={patientData.age}
          onChange={handleChange}
        />
        <Button onClick={handleAddPatient}>Додати</Button>
        <img src="/src/assets/accessories/curve_2.png" alt="" width={500} />
      </div>
    </Section>

  );
};

export default AddPatient;