import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useDispatch } from "react-redux";
import { GetProduct } from "../../../apicalls/product";
import { SetLoader } from "../../../redux/loadersSlice";

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProduct();
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
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
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i className="ri-delete-bin-line"></i>
            <i className="ri-pencil-line"></i>
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
        />
      )}
    </div>
  );
};

export default Products;
