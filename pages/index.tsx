import type { GetStaticProps } from "next";
import { ELEMENTS_MAP } from "../helpers/damage-map";
type Props = {
  fire: { weakness: string; strength: string };
};
const Home = ({ fire }: Props) => {
  return (
    <div>
      <h1>{fire.weakness}</h1>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fire = ELEMENTS_MAP.fire;
  return {
    props: { element: fire },
  };
};

export default Home;
