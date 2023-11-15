import img from "../../../assets/home/chef-service.jpg";
const Garnish = () => {
  return (
    <div className="lg:flex hidden">
      <div className="relative">
        <img src={img} alt="" />
        <div className="bg-white absolute top-0 left-0 lg:top-[90px] lg:left-[155px] lg:w-[70%] p-6 space-y-3 text-center">
          <h2 className="lg:text-4xl text-lg">BISTRO BOSS</h2>
          <p className="lg:text-base text-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            labore sequi in blanditiis eos quaerat exercitationem amet velit
            iste, soluta ratione porro eligendi distinctio maiores ducimus
            facilis ullam mollitia debitis iusto quos illum accusamus odit
            error.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Garnish;
