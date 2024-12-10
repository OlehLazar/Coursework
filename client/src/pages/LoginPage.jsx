import LoginForm from "../components/login/LoginForm";

const LoginPage = () => (
    <div className="flex  items-center justify-center">
        <LoginForm />
        <img src="/src/assets/images/bearDoctor.jpg" alt="" className="h-full w-full object-cover" />
    </div>
);

export default LoginPage;