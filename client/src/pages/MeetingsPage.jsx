import { useState, useEffect } from "react";
import MeetingForm from "../components/meetings/AddMeeting";
import MeetingsList from "../components/meetings/MeetingsList";
import axios from "axios";

const MeetingsPage = () => {
  const [patients, setPatients] = useState([]);
  const [meetings, setMeetings] = useState([]);

  // Завантаження пацієнтів і зустрічей
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ви не авторизовані!");
      return;
    }

    // Завантаження пацієнтів
    axios
      .get("http://localhost:8080/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPatients(response.data))
      .catch((error) => {
        console.error("Помилка під час завантаження пацієнтів:", error);
        alert("Не вдалося завантажити список пацієнтів.");
      });

    // Завантаження зустрічей
    axios
      .get("http://localhost:8080/api/meetings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMeetings(response.data))
      .catch((error) => {
        console.error("Помилка під час завантаження зустрічей:", error);
        alert("Не вдалося завантажити список зустрічей.");
      });
  }, []);

  const handleAddMeeting = (newMeeting) => {
    setMeetings((prevMeetings) => [...prevMeetings, newMeeting]);
  };

  const handleDeleteMeeting = (id) => {
    setMeetings((prevMeetings) => prevMeetings.filter((m) => m.id !== id));
  };

  return (
    <div className="">
      <MeetingForm 
        patients={patients} 
        onAddMeeting={handleAddMeeting} 
      />
      <MeetingsList 
        meetings={meetings} 
        onDeleteMeeting={handleDeleteMeeting} 
      />
    </div>
  );
};

export default MeetingsPage;