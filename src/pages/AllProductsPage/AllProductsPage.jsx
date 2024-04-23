import React, { useEffect } from "react";
import SideMenu from "../../components/SideMenuComponent/SideMenu";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import * as ProductService from "../../services/ProductService";

const AllProductsPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
  });

  const fetchProducts = async (page, limit) => {
    setLoading(true);
    const res = await ProductService.getAllProduct(page, limit);
    if (res?.status === "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPagination({ ...pagination, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  const onChangePage = (page, pageSize) => {
    setPagination({ ...pagination, page });
  };

  return (
    <Loading isLoading={loading}>
      <div
        style={{
          width: "100%",
          background: "none",
          height: "calc(100vh - 64px)",
        }}
      >
        <div style={{ width: "1270px", margin: "0 auto", height: "100%" }}>
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100% - 20px)",
            }}
          >
            <WrapperNavbar span={6} style={{ marginTop: "125px" }}>
              <h2
                style={{
                  fontFamily: "poppins, sans-serif",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "cccc" }}>Tất cả sản phẩm</span>
                <hr />
              </h2>
              <SideMenu />
            </WrapperNavbar>

            <Col
              span={18}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: "135px",
              }}
            >
              <WrapperProducts>
                {products
                  ?.filter((product) =>
                    product?.name.toLowerCase().includes(searchDebounce.toLowerCase())
                  )
                  ?.map((product) => (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      brand={product.brand}
                      sold={product.sold}
                      id={product._id}
                    />
                  ))}
              </WrapperProducts>
              <Pagination
                defaultCurrent={pagination.page}
                total={pagination.total}
                onChange={onChangePage}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default AllProductsPage;
