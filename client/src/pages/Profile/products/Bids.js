import { Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { GetAllBids } from "../../../apicalls/bid";
import moment from "moment";

const Bids = ({ showBidsModal, setShowBidsModal, selectedProduct }) => {
  const [bids, setBids] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({ product: selectedProduct._id });
      dispatch(SetLoader(false));
      if (response.sucess) {
        setBids(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  const columns = [
    {
      title : 'Bid Placed On',
      dataIndex : 'createdAt',
      render : (text, record) => {
         return moment(text).format('DD-MM-YYYY hh:mm a');
      }
    },
    {
      title: "Name",
      dataIndex: "product",
      render: (text, record) => {
        return record.product.name;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "mobile",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title="Bids"
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1200}
      footer={null}
    >
      <h1 className="text-xl text-gray-500 mb-3 mt-2">
        Product Name: {selectedProduct.name}
      </h1>
      <Table columns={columns} dataSource={bids} />
    </Modal>
  );
};

export default Bids;
