import { useDispatch } from "react-redux";
import { formatter } from "../config/formater";
import { addProduct } from "../store/reducer/product-reducer";

export const ProductCard = (product) => {
  const price = +product?.price?.split(" ").join("");
  const dispatch = useDispatch();

  const addStore = () => {
    dispatch(addProduct({...product,price}))
  }

  return (
    <div>
      <div className="h-[266px] mb-[25px]">
        <img
          className="w-full h-full object-cover"
          src={product.img}
          alt="img"
        />
      </div>
      <h3>{product.title}</h3>
      <p>{formatter(price)} UZS</p>
      <button  onClick={addStore} className="bg-neutral-500 p-2 cursor-pointer">add</button>
    </div>
  );
};
