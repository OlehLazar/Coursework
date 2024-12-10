import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../shared/Section";
import Input from "../shared/Input";
import Button from "../shared/Button";
import axios from "axios";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    nickname: "",
    password: "",
  });

  const navigate = useNavigate(); // Хук для перенаправлення

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Надсилання даних на сервер для авторизації
    axios
      .post("http://localhost:8080/api/login", loginData)
      .then((response) => {
        console.log("Login successful:", response.data);
        //alert("Успішний вхід!");
        localStorage.setItem("token", response.data.token);
        navigate("/patients");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Помилка під час входу. Перевірте дані.");
      });
  };

  return (
    <Section>
      <form onSubmit={handleSubmit} className="flex-col text-center p-5">
        <h1 className="font-playfair text-2xl font-semibold pb-5 pt-5">
          Введіть ваші дані
        </h1>
        <Input
          name="nickname"
          placeholder="Нікнейм"
          value={loginData.nickname}
          onChange={handleChange}
        />
        <Input
          name="password"
          placeholder="Пароль"
          type="password"
          value={loginData.password}
          onChange={handleChange}
        />

        <Button type="submit" onClick={handleSubmit}>Ввійти</Button>
        <p className="p-5 font-serif text-l">
          Не зареєстровані?{" "}
          <a href="/signup" className="text-[#8675c7] hover:text-black">
            Реєтруйтеся прямо зараз!
          </a>
        </p>
      </form>
    </Section>
  );
};

export default LoginForm;
