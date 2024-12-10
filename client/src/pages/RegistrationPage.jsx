import SignUpForm from "../components/registration/SignUpForm";

const RegistrationPage = () =>(
    <div className="flex  items-center justify-center">
        <img src="/src/assets/images/bearDoctor_2_2nd_half.jpg" alt="" className="h-full w-full object-cover" />
        <SignUpForm />
        <img src="/src/assets/images/bearDoctor_2_1st_half.jpg" alt="" className="h-full w-full object-cover" />
    </div>
)

export default RegistrationPage;