/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Section from "../shared/Section";
import Input from "../shared/Input";
import Button from "../shared/Button";

const MeetingForm = ({ patients, onAddMeeting }) => {
  const [meetingData, setMeetingData] = useState({
    date: "",
    time: "",
    patientId: "",
    description: "",
  });

  // Зміна даних форми
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Додавання нової зустрічі
  const handleAddMeeting = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ви не авторизовані!");
      return;
    }

    const newMeeting = {
      ...meetingData,
      dateTime: `${meetingData.date}T${meetingData.time}`,
    };

    axios
      .post("http://localhost:8080/api/meetings", newMeeting, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //alert("Зустріч успішно додана!");
        onAddMeeting(response.data);
        setMeetingData({
          date: "",
          time: "",
          patientId: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Помилка під час додавання зустрічі:", error);
        alert("Не вдалося додати зустріч.");
      });
  };

  return (
    <Section>
      <div className="flex flex-col justify-center items-center mx-auto w-1/2 text-center">
        <h1 className="font-playfair text-2xl font-semibold pb-5 pt-5">Додати зустріч</h1>
        
        <Input
          name="date"
          type="date"
          value={meetingData.date}
          onChange={handleChange}
          placeholder="Дата(xx.xx.202x)"
        />
        
        <Input
          name="time"
          type="time"
          value={meetingData.time}
          onChange={handleChange}
          placeholder="Час"
        />
        
        <div className="w-full">
          <select
            name="patientId"
            value={meetingData.patientId}
            onChange={handleChange}
            className="border pt-2 pb-2 mt-1 block w-1/2 mx-auto rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Виберіть пацієнта</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          name="description"
          placeholder="Опис"
          value={meetingData.description}
          onChange={handleChange}
        />
        
        <Button onClick={handleAddMeeting}>Додати зустріч</Button>
        
        <img src="/src/assets/accessories/curve_3.png" alt="" width={500} className="pt-10" />
      </div>
    </Section>
  );
};

export default MeetingForm;