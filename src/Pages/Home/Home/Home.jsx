import Featured from "../Featured/Featured";
import Testimonials from "../../Testimonials/Testimonials";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Garnish from "../Garnish/Garnish";
import CallUs from "../CallUs/CallUs";
import Chef from "../Chef/Chef";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Garnish></Garnish>
            <PopularMenu></PopularMenu>
            <CallUs></CallUs>
            <Chef></Chef>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;