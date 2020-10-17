import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    //body
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);
  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품 가져오는데 실패");
      }
    });
  };

  const loadMoreHanlder = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true, // 더보기를 눌렀을때 작동하는것 이란것을 알려줌
    };

    getProducts(body);
  };
  const renderCards = Products.map((product, index) => {
    console.log("product", product);

    return (
      <Col lg={6} md={8} xs={25} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>let travel anywhere</h2>
      </div>
      {/* Filter */}
      {/* Search */}
      {/* Cards */}
      <Row gutter={[16, 16]}>
        {/* gutter - 여백 */}
        {renderCards}
      </Row>
      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={loadMoreHanlder} type="primary" shape="round">
            더보기
          </Button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
