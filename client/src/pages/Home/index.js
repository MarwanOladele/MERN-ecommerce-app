import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../../apicalls/product";
import { message } from "antd";
import { SetLoader } from "../../redux/loadersSlice";
import Divider from "../../components/DIvider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    status: "approved",
    category: [],
    age: [],
  });
  const [showFilters, setShowFilters] = useState(true);

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
  }, [filter]);

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filter}
          setFilters={setFilter}
        />
      )}
      <div className="w-full">
        <div className="flex gap-5 items-center mb-3">
          {!showFilters && (
            <i
              class="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            placeholder="Search product here.."
            className="border border-gray-300 rounded border-solid w-full p-2 h-14"
          />
        </div>
        <div
          className={`grid  gap-5 w-full ${
            showFilters ? "grid-cols-4" : "grid-cols-5"
          }`}
        >
          {products?.map((product) => {
            return (
              <div
                className="border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer"
                onClick={() => {
                  navigate(`products/${product._id}`);
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
    </div>
  );
};

export default Home;
