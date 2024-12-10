import { navItems } from "../../constants/index"

const Header = () => {
  return (
    <div className=" backdrop-blur-sm border-b-2 border-[#11111150]">
        <nav className="flex justify-between items-center max-w-container bg-[#fdf5df] text-[#000000] text-xl font-bold font-playfair">
            <a href="/" className="flex items-center border-r-2 border-[#11111150] pr-5">
                <img src="/src/assets/icons/pill_icon.svg" width={70} alt="Pill" className="pl-5" />
                <h1 className="pl-3">Головна</h1>
            </a>
            <ul className="flex-1 flex justify-between p-6 ">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.url} className="flex items-center">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
  )
}

export default Header