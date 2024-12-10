/* eslint-disable react/prop-types */
import axios from "axios";
import Section from "../shared/Section";

const MeetingsList = ({ meetings, onDeleteMeeting }) => {
  const handleDeleteMeeting = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ви не авторизовані!");
      return;
    }

    axios
      .delete(`http://localhost:8080/api/meetings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        //alert("Зустріч успішно видалена!");
        onDeleteMeeting(id);
      })
      .catch((error) => {
        console.error("Помилка при видаленні зустрічі:", error);
        alert("Не вдалося видалити зустріч.");
      });
  };

  return (
    <Section>
      <div className="flex flex-col justify-center items-center mx-auto w-2/3 text-center">
        <h1 className="font-playfair text-2xl font-semibold pb-5 pt-5">Список зустрічей</h1>
        {meetings.length === 0 ? (
          <p className='font-serif text-2xl'>Список зустрічей порожній(</p>
        ) : (
          <table className="table-auto w-full text-left rounded-lg">
            <thead>
              <tr className="bg-[#919ec2]">
                <th className="border-r border-gray-300 px-4 py-2">Дата та час</th>
                <th className="border-r border-gray-300 px-4 py-2">Опис</th>
                <th className="border-r border-gray-300 px-4 py-2">Пацієнт</th>
                <th className="border-l border-gray-300 px-4 py-2">Дії</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting.id} className="">
                  <td className="border-r border-gray-500 px-4 py-2">{meeting.dateTime}</td>
                  <td className="border-r border-gray-500 px-4 py-2">{meeting.description}</td>
                  <td className="border-r border-gray-500 px-4 py-2">{meeting.patientId}</td>
                  <td className="border-l border-gray-500 px-4 py-2">
                    <button
                      onClick={() => handleDeleteMeeting(meeting.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Section>
  );
};

export default MeetingsList;