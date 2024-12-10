import Section from "../shared/Section"

const NameSection = () => {
  return (
    <Section
        id="nameSection"
    >
        <div className="flex items-center pl-10 pr-10">
            <h1 
                className="text-8xl font-bold font-sans text-[#5ebec4] stop-on-hover" 
            >
                MEDICAL ASSISTANT
            </h1>
            <img src="/src/assets/images/homeImage.jpg" alt="" className="" width={500} />
        </div>
    </Section>
  )
}

export default NameSection