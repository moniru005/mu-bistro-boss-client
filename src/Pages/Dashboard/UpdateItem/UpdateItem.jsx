import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItem = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {name, category, price, recipe, _id} = useLoaderData();
  

  const { register, handleSubmit } = useForm();
  const onSubmit = async(data) => {
    console.log(data);
    //image upload to imgbb and then get an url
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    });
    if(res.data.success){
      //now send the menu item data to the server with the image
      const menuItem = {
          name: data.name,
          recipe: data.recipe,
          image: res.data.data.display_url,
          category: data.category,
          price: parseFloat(data.price)
      }
      // now
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
      console.log(menuRes.data);
      if(menuRes.data.modifiedCount > 0){
          Swal.fire({
              position: "center",
              icon: "success",
              title: `${data.name} is updated Successfully`,
              showConfirmButton: false,
              timer: 1500
            });
      }
    }
    console.log(res.data);
};

  

  return (
    <div>
      <SectionTitle
        subHeading={"Refresh Info"}
        heading={"Update an Item"}
      ></SectionTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              defaultValue={name}
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe Name "
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6 my-6">
            {/* category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                defaultValue={price}
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* Recipe Details */}
          <div className=" w-full my-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Details</span>
              </label>
              <textarea
                defaultValue={recipe}
                {...register("recipe")}
                className="textarea textarea-bordered h-24"
                placeholder="Recipe Details"
              ></textarea>
            </div>
          </div>

          {/* Recipe image */}
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full my-6 file-input-bordered"
          />

          <button
            
            className="btn bg-orange-400"
          >
            Update <FaUtensils className="ml-2 text-lg text-white"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
