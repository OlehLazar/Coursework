/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Section from "../shared/Section";

const PatientsList = ({patients, setPatients}) => {
  const [error, setError] = useState(null);

  // Функція для завантаження списку пацієнтів
  const fetchPatients = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Ви не авторизовані!");
      return;
    }

    console.log("Токен для запиту:", token); // Додаємо логування токена

    axios
      .get("http://localhost:8080/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Отримані пацієнти:", response.data); // Логування отриманих даних
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Повна помилка при отриманні списку пацієнтів:", error);
        
        // Більш детальна інформація про помилку
        if (error.response) {
          console.error("Дані відповіді:", error.response.data);
          console.error("Статус:", error.response.status);
          setError(`Помилка: ${error.response.data.message || 'Невідома помилка'}`);
        } else if (error.request) {
          console.error("Запит надіслано, але немає відповіді");
          setError("Немає відповіді від сервера");
        } else {
          console.error("Помилка при налаштуванні запиту");
          setError("Помилка при підготовці запиту");
        }
      });
  };

  // Завантаження списку пацієнтів при монтуванні компонента
  useEffect(() => {
    fetchPatients();
  },);

  // Функція для видалення пацієнта
  const handleDeletePatient = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ви не авторизовані!");
      return;
    }

    axios
      .delete(`http://localhost:8080/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        //alert("Пацієнта успішно видалено!");
        // Оновлюємо список пацієнтів після видалення
        fetchPatients();
      })
      .catch((error) => {
        console.error("Помилка при видаленні пацієнта:", error);
        alert("Не вдалося видалити пацієнта.");
      });
  };

  // Показуємо помилку, якщо вона є
  if (error) {
    return <div className="text-red-500">Помилка: {error}</div>;
  }

  return (
    <Section>
      <div className="flex flex-col justify-center items-center mx-auto w-2/3 text-center">
        <h1 className="font-playfair text-2xl font-semibold pb-5 pt-5">Список пацієнтів</h1>
        {patients.length === 0 ? (
          <p className='font-serif text-2xl'>Список пацієнтів порожній(</p>
        ) : (
          <table className="table-auto w-full text-left rounded-lg">
            <thead>
              <tr className="bg-[#919ec2]">
                <th className="border-r border-gray-300 px-4 py-2">Ім&apos;я</th>
                <th className="border-r border-gray-300 px-4 py-2">Вік</th>
                <th className="border-l border-gray-300 px-4 py-2">Дії</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="">
                  <td className="border-r border-gray-500 px-4 py-2">{patient.name}</td>
                  <td className="border-r border-gray-500 px-4 py-2">{patient.age} років</td>
                  <td className="border-l border-gray-500 px-4 py-2">
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
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

export default PatientsList;