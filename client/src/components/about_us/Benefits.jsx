import Section from "../shared/Section";
import Heading from "./Heading";
import { benefits } from "../../constants";

const Benefits = () => {
  return (
    <Section id="features" className="flex flex-col items-center text-center font-playfair">
      <div className="container relative flex flex-col items-center">
        <Heading className="text-2xl font-bold" title="Medical Assistant - все, чого ви хотіли, і навіть більше!" />
        <img src="/src/assets/accessories/curve_2.png" alt="" width={900} />

        <div className="flex flex-wrap gap-10 justify-center">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 text-center"
            >
              <img
                src={`/src/assets/benefits/${benefit.imageUrl}.jpg`}
                alt={benefit.title}
                className="mb-4"
                width={300}
              />
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-lg font-serif">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;