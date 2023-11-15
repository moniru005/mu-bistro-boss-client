import FoodCard from "../../../Components/FoodCard/FoodCard";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";

const Chef = () => {
    const [menu] = useMenu();
    console.log('Chef Menu:', menu);
    const salad = menu.filter((item) => item.category === "salad");

  return (
    <div>
      <div className="mt-12">
        <SectionTitle
          subHeading={"Should Try"}
          heading={"Chef Recommends"}
        ></SectionTitle>
      </div>
      <div className="grid grid-cols-3 gap-y-6 mt-12">
        {
            salad?.slice(0, 3).map(items=> <FoodCard key={items._id} item={items}></FoodCard>)
        }
      </div>
    </div>
  );
};

export default Chef;
