import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import useMenu from "../../Hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu([]);
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Menu</title>
      </Helmet>
      {/* Main Cover */}
      <Cover img={menuImg} title={"our menu"}></Cover>

      <div className="my-16">
        {/* Offered Menu Items */}
        <SectionTitle
          subHeading={"Don't Miss"}
          heading={"Today's Offer"}
        ></SectionTitle>
        <MenuCategory items={offered}></MenuCategory>
        {/* dessert menu items */}
        <MenuCategory items={dessert} title={"dessert"} img={dessertImg}>
        </MenuCategory>
        {/* pizza menu items */}
        <MenuCategory
          items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>
        {/* salad menu items */}
        <MenuCategory
          items={salad} title={"salad"} img={saladImg}></MenuCategory>
        {/* Soup menu items */}
        <MenuCategory
          items={soup} title={"soup"} img={soupImg}></MenuCategory>
      </div>
    </div>
  );
};

export default Menu;
