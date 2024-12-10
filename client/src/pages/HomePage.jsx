import NameSection from "../components/home/NameSection";
import MainInfo from "../components/home/MainInfo";

const HomePage = () => (
    <div className="flex justify-between flex-col pr-10 pl-10  items-center text-zinc-800 font-ptSerif">
        <NameSection />
        <MainInfo />
    </div>
);

export default HomePage;