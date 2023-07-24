import { Button } from "antd";
import { useState } from "react";
import ProductForm from "./ProductForm";

const Products = () => {
  const [showProductForm, setShowproductForm] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <Button type="default" onClick={() => setShowproductForm(true)}>
          Add Product
        </Button>
      </div>
      {showProductForm && (
        <ProductForm
          showProductForm={showProductForm}
          setShowproductForm={setShowproductForm}
        />
      )}
    </div>
  );
};

export default Products;
