import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../../apicalls/product";
import { message } from "antd";
import { SetLoader } from "../../redux/loadersSlice";
import Divider from "../../components/DIvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("approved");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProduct(filter);
      if (response.sucess) {
        dispatch(SetLoader(false));
        setProducts(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        {products?.map((product) => {
          return (
            <div
              className="border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer"
              onClick={() => {
                navigate(`products/${product._id}`)
              }}
              key={product._id}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="px-2 flex flex-col gap-1">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm text-gray-500">{product.description}</p>
                <Divider />
                <span className="text-xl font-semibold text-green-700">
                  ${product.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
