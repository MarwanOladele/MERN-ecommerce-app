import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetProduct } from "../../../apicalls/product";
import { SetLoader } from "../../../redux/loadersSlice";
import moment from "moment";
import Bids from "./Bids";

const Products = () => {
  const [showBidsModal, setShowBidsModal] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProduct({ seller: user._id });
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

  const deleteProduct = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);
      if (response.sucess) {
        dispatch(SetLoader(false));
        getData();
        message.success(response.message);
      } else {
        dispatch(SetLoader(false));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt=""
            className="w-14 h-14 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <i
              className="ri-delete-bin-line"
              onClick={() => deleteProduct(record._id)}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
            <span
              className="underline cursor-pointer"
              onClick={() => {
                setSelectedProduct(record);
                setShowBidsModal(true);
              }}
            >
              Show bids
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          getData={getData}
        />
      )}
      {showBidsModal && (
        <Bids
          showBidsModal={showBidsModal}
          setShowBidsModal={setShowBidsModal}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
