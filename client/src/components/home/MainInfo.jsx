import Section from "../shared/Section"
import Button from "../shared/Button"

const MainInfo = () => {
  return (
    <Section
      className="pt-5 -mt-5"
      id="mainInfo"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem]">
          <h1 className="text-2xl">
            Наша система допомагає лікарям та медичним працівникам ефективно управляти медичними записами пацієнтів. 
            Відстежуйте діагнози, призначення, історії хвороби та результати лікування у зручному інтерфейсі.
            Завдяки можливостям пошуку та фільтрації даних, ви швидко знайдете необхідну інформацію.
            Використовуйте розумні функції, щоб отримувати рекомендації на основі історії пацієнтів.
          </h1>
          <img src="/src/assets/accessories/curve.png"></img>
          <a href="/login"><Button>Почати вже зараз!</Button></a>
        </div>
      </div>
    </Section>
  )
}

export default MainInfo