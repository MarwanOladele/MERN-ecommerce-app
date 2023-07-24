import { Modal } from "antd";
import React from "react";

const ProductForm = ({ showProductForm, setShowproductForm }) => {
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowproductForm(false)}
      centered
    >
      <h1>Products Form</h1>
    </Modal>
  );
};

export default ProductForm;
