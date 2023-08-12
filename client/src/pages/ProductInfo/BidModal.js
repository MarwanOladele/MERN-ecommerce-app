import { Form, Input, Modal, message } from "antd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { PlaceBid } from "../../apicalls/bid";
import { SetLoader } from "../../redux/loadersSlice";

const BidModal = ({
  showBidModel,
  setShowBidModel,
  product,
  getData,
  user,
}) => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      message.success(response.message);
      if (response.sucess) {
        dispatch(SetLoader(false));
        getData();
        setShowBidModel(false);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      onCancel={() => setShowBidModel(false)}
      open={showBidModel}
      centered
      width={500}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          Place new bid
        </h1>

        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default BidModal;
