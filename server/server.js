const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Тимчасове зберігання користувачів
const users = [
    { nickname: "johndoe", password: "123456", token: "abcdef123456" },
    { nickname: "janedoe", password: "password", token: "ghijkl789101" },
];

// Ендпоінт для отримання даних
app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana", "2"] });
});

// Ендпоінт для реєстрації
app.post("/api/signup", (req, res) => {
    const { nickname, password } = req.body;

    // Перевіряємо, чи користувач вже існує
    const existingUser = users.find((user) => user.nickname === nickname);

    if (existingUser) {
        return res.status(409).json({ message: "User with this nickname already exists" });
    }

    // Генеруємо простий токен (у реальних додатках використовуйте JWT)
    const token = Math.random().toString(36).substring(2);

    // Додаємо нового користувача до масиву
    const newUser = { nickname, password, token };
    users.push(newUser);

    console.log("New user added:", newUser);
    res.status(201).json({ message: "User registered successfully", token });
});

// Ендпоінт для логіну
app.post("/api/login", (req, res) => {
    const { nickname, password } = req.body;

    // Перевіряємо облікові дані
    const user = users.find(
        (u) => u.nickname === nickname && u.password === password
    );

    if (user) {
        res.status(200).json({ message: "Login successful", token: user.token });
    } else {
        res.status(401).json({ message: "Invalid nickname or password" });
    }
});

// Запуск сервера
app.listen(8080, () => {
    console.log("Server started on port 8080");
});

// Тимчасове зберігання пацієнтів
const patients = [];
// Ендпоінт для додавання пацієнтів
app.post("/api/patients", (req, res) => {
    const { authorization } = req.headers;

    // Перевірка токена
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    const user = users.find((u) => u.token === token);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Додавання пацієнта
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: "Name and age are required" });
    }

    const newPatient = { 
        id: patients.length + 1,  // Додаємо унікальний id
        name, 
        age: parseInt(age, 10) 
    };
    patients.push(newPatient);

    console.log("Пацієнт доданий:", newPatient);
    res.status(201).json(newPatient);
});

// Ендпоінт для отримання списку пацієнтів
app.get("/api/patients", (req, res) => {
    const { authorization } = req.headers;

    // Перевірка токена
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    const user = users.find((u) => u.token === token);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Повертаємо список пацієнтів
    res.status(200).json(patients);
});

// Тимчасове зберігання зустрічей
const meetings = [];

// Ендпоінт для додавання зустрічей
app.post("/api/meetings", (req, res) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    const user = users.find((u) => u.token === token);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { dateTime, patientId, description } = req.body;

    if (!dateTime || !patientId || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newMeeting = { id: meetings.length + 1, dateTime, patientId, description };
    meetings.push(newMeeting);

    console.log("Зустріч додана:", newMeeting);
    res.status(201).json(newMeeting);
});

// Ендпоінт для отримання списку зустрічей
app.get("/api/meetings", (req, res) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    const user = users.find((u) => u.token === token);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Повертаємо список зустрічей
    res.status(200).json(meetings);
});

// Ендпоінт для видалення зустрічі
app.delete("/api/meetings/:id", (req, res) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    const user = users.find((u) => u.token === token);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const meetingId = parseInt(req.params.id, 10);
    const meetingIndex = meetings.findIndex((m) => m.id === meetingId);

    if (meetingIndex === -1) {
        return res.status(404).json({ message: "Meeting not found" });
    }

    meetings.splice(meetingIndex, 1);
    console.log(`Зустріч із id ${meetingId} видалена`);
    res.status(200).json({ message: "Meeting deleted successfully" });
});

// Ендпоінт для видалення пацієнта
app.delete("/api/patients/:id", (req, res) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    const user = users.find((u) => u.token === token);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const patientId = parseInt(req.params.id, 10);
    const patientIndex = patients.findIndex((p) => p.id === patientId);

    if (patientIndex === -1) {
        return res.status(404).json({ message: "Patient not found" });
    }

    patients.splice(patientIndex, 1);
    console.log(`Пацієнт із id ${patientId} видалений`);
    res.status(200).json({ message: "Patient deleted successfully" });
});