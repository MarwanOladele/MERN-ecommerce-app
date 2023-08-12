import { Form, Input, Modal } from "antd";
import { useRef } from "react";

const BidModal = ({ showBidModel, setShowBidModel, product, getData }) => {
  const formRef = useRef(null);
  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];

  const onFinish = async (values) => {
    console.log(values);
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
