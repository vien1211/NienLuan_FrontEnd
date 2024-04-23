import React, { Fragment } from "react";
import SideMenu from "../../components/SideMenuComponent/SideMenu";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const BrandProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const { state } = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  const fetchProductBrand = async (brand, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductBrand(brand, page, limit);
    if (res?.status == "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductBrand(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

  const brandName = state;

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
            <WrapperNavbar span={6} style={{marginTop: "125px"}}>
            <h2 style={{ fontFamily: "poppins, sans-serif", textAlign: "center"}}>
              <span style={{ color: "cccc" }}>Thương hiệu: </span>
              <span style={{ color: "#f59e0b" }}>{brandName}</span>
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
                  ?.filter((pro) => {
                    if (searchDebounce === "") {
                      return pro;
                    } else if (
                      pro?.name
                        ?.toLowerCase()
                        ?.includes(searchDebounce?.toLowerCase())
                    ) {
                      return pro;
                    }
                  })
                  ?.map((product) => {
                    return (
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
                    );
                  })}
                
              </WrapperProducts>
              <Pagination
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default BrandProductPage;
