import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../shared/Section";
import Input from "../shared/Input";
import Button from "../shared/Button";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    specialization: "",
    education: "",
    nickname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Хук для перенаправлення

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Надсилання даних на сервер
    axios
      .post("http://localhost:8080/api/signup", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        //alert("Реєстрація успішна!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("Сталася помилка під час реєстрації.");
      });
  };

  return (
    <Section>
      <form onSubmit={handleSubmit} className="flex-col text-center p-20 w-full">
        <h1 className="font-playfair text-2xl font-semibold pb-5 pt-5">
          Заповніть поля
        </h1>
        <Input
          name="firstName"
          placeholder="Ім'я"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          name="lastName"
          placeholder="Прізвище"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          name="birthDate"
          placeholder="Дата народження"
          value={formData.birthDate}
          onChange={handleChange}
        />
        <Input
          name="specialization"
          placeholder="Спеціалізація"
          value={formData.specialization}
          onChange={handleChange}
        />
        <Input
          name="education"
          placeholder="Освіта"
          value={formData.education}
          onChange={handleChange}
        />
        <Input
          name="nickname"
          placeholder="Нікнейм"
          value={formData.nickname}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Пошта"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          placeholder="Пароль"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} type="type">Зареєструватися</Button>
      </form>
    </Section>
  );
};

export default SignUpForm;