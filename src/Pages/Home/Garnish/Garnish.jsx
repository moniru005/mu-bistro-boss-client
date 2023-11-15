import img from "../../../assets/home/chef-service.jpg";
const Garnish = () => {
  return (
    <div>
      <div className="relative">
        <img src={img} alt="" />
        <div className="bg-white absolute top-[60px] left-[155px] w-[70%] p-6 space-y-3 text-center">
          <h2 className="text-4xl">BISTRO BOSS</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            labore sequi in blanditiis eos quaerat exercitationem amet velit
            iste, soluta ratione porro eligendi distinctio maiores ducimus
            facilis ullam mollitia debitis iusto quos illum accusamus odit
            error. Quas delectus voluptatibus earum non optio ipsa sequi aut
            perferendis doloribus, ab placeat facere asperiores cum architecto
            ullam at et reiciendis minima vero.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Garnish;
