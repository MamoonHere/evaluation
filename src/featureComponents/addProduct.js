import React, { useState } from "react";
import {
  Col,
  Form,
  Input,
  Row,
  InputNumber,
  Modal,
  Button,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import ProductModel from "../redux/productModel";

const keys = {
  title: "Title",
  description: "Description",
  brand: "Brand",
  category: "Category",
  rating: "Rating",
  price: "Price",
  stock: "Stock",
  discountPercentage: "Discount",
};

const AddProduct = ({
  isVisible,
  setIsVisible,
  selectedRecord,
  setSelectedRecord,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      selectedRecord
        ? await dispatch(ProductModel.editProduct(values, selectedRecord.id))
        : await dispatch(ProductModel.addProducts(values));
    } catch (error) {
      message.error("Could not add / edit");
    } finally {
      setSelectedRecord(null);
      setIsVisible(false);
      setIsLoading(false);
    }
  };
  return (
    <Modal
      destroyOnClose
      title={"Add Product to Inventory"}
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={false}
    >
      <Form
        name="product-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={
          selectedRecord
            ? selectedRecord
            : {
                title: null,
                description: null,
                brand: null,
                category: null,
                rating: null,
                price: null,
                stock: null,
                discountPercentage: null,
              }
        }
      >
        <Row gutter={32}>
          {Object.keys(keys).map((key) => (
            <Col xs={24} sm={12}>
              <Form.Item
                label={keys[key]}
                name={key}
                rules={[
                  {
                    required: true,
                    message: `${keys[key]} Required`,
                  },
                ]}
              >
                {["rating", "price", "stock", "discountPercentage"].includes(
                  key
                ) ? (
                  <InputNumber
                    placeholder={`Enter ${keys[key]}`}
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  <Input placeholder={`Enter ${keys[key]}`} />
                )}
              </Form.Item>
            </Col>
          ))}
          <Col xs={24} sm={12}>
            <Form.Item>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddProduct;
