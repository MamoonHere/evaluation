import React, { useState, useEffect, Fragment } from "react";
import { Card, Button, List, message, Typography, Space, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ProductModel from "../redux/productModel";
import AddProduct from "./addProduct";
import C from "../utility/constants";

const { Text } = Typography;
const keys = {
  brand: "Brand",
  category: "Category",
  rating: "Rating",
  price: "Price",
  stock: "Stock",
  discountPercentage: "Discount",
};

const ProductsListing = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state[C.Redux.Products]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const getAllProducts = async () => {
    try {
      await dispatch(ProductModel.getAllProducts());
    } catch (error) {
      message.error("Could not fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!productsList.length) {
      setIsLoading(true);
      getAllProducts();
    }
  }, [productsList]);

  return (
    <Fragment>
      <Card title="All Available Products">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button type="primary" onClick={() => setIsVisible(true)}>
            Add Product
          </Button>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={productsList.length ? productsList : []}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
                avatar={
                  <Avatar src={item.thumbnail} size={80} shape="square" />
                }
              />
              <Space split={"|"}>
                {Object.keys(keys).map((objKey) => (
                  <div>
                    <Text strong>{`${keys[objKey]}: `}</Text>
                    <Text>{item[objKey]}</Text>
                  </div>
                ))}
                <Button
                  type="link"
                  onClick={() => {
                    setSelectedRecord(item);
                    setIsVisible(true);
                  }}
                >
                  Edit
                </Button>
              </Space>
            </List.Item>
          )}
        />
      </Card>
      <AddProduct
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        selectedRecord={selectedRecord}
        setSelectedRecord={setSelectedRecord}
      />
    </Fragment>
  );
};

export default ProductsListing;
