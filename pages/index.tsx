import type { GetStaticProps } from "next";
import { ELEMENTS_MAP, TYPE } from "../helpers/damage-map";
type Props = {
  elements: TYPE;
};
const Home = ({ elements }: Props) => {
  Object.entries(elements).map(([key, value]) => {
    console.log(key, value);
  });
  return (
    <div>
      {Object.keys(elements).map((key: keyof TYPE) => (
        <div key={key}>
          <div className="text-center text-2xl font-bold uppercase">{key}</div>
          <div className="text-center">Weakness: {elements[key].weakness}</div>
          <div className="text-center">Strength: {elements[key].strength}</div>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const elements = ELEMENTS_MAP;

  return {
    props: { elements: elements },
  };
};

export default Home;
