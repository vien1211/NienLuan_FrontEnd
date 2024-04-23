import { searchProduct } from "../../redux/slides/productSlide";
import { Nav, Navbar } from "react-bootstrap";
import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import Loading from "../LoadingComponent/Loading";
import * as ProductService from "../../services/ProductService";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import BrandProduct from "../../components/BrandProduct/BrandProduct";
import {
  StyledNavbar,
  WrapperContentPopup,
  SearchStyle,
  WrapperHeader,
  ItemHeader,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  PopoverContent,
  StyledWrapperContentPopup,
  Column,
} from "./style";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";

const NavComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const [isOpenUserPopup, setIsOpenUserPopup] = useState(false);
  const [isOpenTypePopup, setIsOpenTypePopup] = useState(false);
  const [isOpenBrandPopup, setIsOpenBrandPopup] = useState(false);


  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
    console.log("type", type);
  };

  const handleNavigateBrand = (brand) => {
    navigate(
      `/product/${brand
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: brand }
    );
    console.log("brand", brand);
  };
  
  

  const handleClickUserPopup = () => {
    setIsOpenUserPopup(!isOpenUserPopup);
    setIsOpenTypePopup(false);
  };

  const handleClickTypePopup = () => {
    setIsOpenTypePopup(!isOpenTypePopup);
    setIsOpenUserPopup(false);
  };

  const handleClickBrandPopup = () => {
    setIsOpenBrandPopup(!isOpenBrandPopup);
    setIsOpenBrandPopup(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate("/sign-in");
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const data = await ProductService.getAllTypeProduct();
        if (data) {
          setTypes(data.data);
        } else {
          console.error("Error fetching product types: No data returned");
        }
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };

    const fetchProductBrands = async () => {
      try {
        const data = await ProductService.getAllBrand(); // Đảm bảo bạn có một hàm trong ProductService để lấy tất cả các thương hiệu
        if (data) {
          setBrands(data.data);
        } else {
          console.error("Error fetching product brands: No data returned");
        }
      } catch (error) {
        console.error("Error fetching product brands:", error);
      }
    };

    fetchProductTypes();
    fetchProductBrands();
  }, []);

  const fetchAllBrandProduct = async () => {
    const res = await ProductService.getAllBrand();
    if (res?.status === "OK") {
      setBrands(res?.data);
    }
  };

  

  const content = (
    <div style={{fontFamily: "poppins, sans-serif"}}>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const handleBrandItemClick = (brand) => {
    navigate(`/brand-product/${brand.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: brand });
  };

  return (
    <StyledNavbar
      style={{
        //height: "100%",
        width: "100%",
        display: "flex",
        background: "#F5F5F5",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenSearch ? "space-between" : "unset",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Col span={5}>
          <WrapperTextHeader style={{ color: "black" }} href="/">
            VIEEN'S ACCESSORIES
          </WrapperTextHeader>
        </Col>

        {!isHiddenSearch && (
          <Col span={10} style={{ fontSize: "30px", marginLeft: "10px" }}>
            <SearchStyle>
              <ButtonInputSearch
                size="large"
                textbutton="Tìm kiếm"
                placeholder="Nhập ..."
                onChange={onSearch}
              />
            </SearchStyle>
          </Col>
        )}

        <Col
          span={9}
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <Popover
            content={
              <PopoverContent>
                {/* Chia thành 3 cột */}
                <Column>
                  {/* Hiển thị sản phẩm trong cột đầu tiên */}
                  {types.slice(0, 4).map((type, index) => (
                    <StyledWrapperContentPopup
                      key={index}
                      onClick={() => handleNavigateType(type)}
                    >
                      {type}
                      
                    </StyledWrapperContentPopup>
                  ))}
                </Column>
                <Column>
                  {/* Hiển thị sản phẩm trong cột thứ hai */}
                  {types.slice(5, 9).map((type, index) => (
                    <StyledWrapperContentPopup
                      key={index}
                      onClick={() => handleNavigateType(type)}
                    >
                      {type}
                    </StyledWrapperContentPopup>
                  ))}
                </Column>
                <Column>
                  {/* Hiển thị sản phẩm trong cột thứ ba */}
                  {types.slice(10, 14).map((type, index) => (
                    <StyledWrapperContentPopup
                      key={index}
                      onClick={() => handleNavigateType(type)}
                    >
                      {type}
                    </StyledWrapperContentPopup>
                  ))}
                </Column>
                <Column>
                  {/* Hiển thị sản phẩm trong cột thứ ba */}
                  {types.slice(14, 18).map((type, index) => (
                    <StyledWrapperContentPopup
                      key={index}
                      onClick={() => handleNavigateType(type)}
                    >
                      {type}
                    </StyledWrapperContentPopup>
                  ))}
                </Column>
              </PopoverContent>
            }
            title="Loại Sản Phẩm"
            trigger="click"
            visible={isOpenTypePopup}
            onVisibleChange={(visible) => setIsOpenTypePopup(visible)}
          >
            <ItemHeader onClick={handleClickTypePopup}>
              
              Phân Loại
              <CaretDownOutlined />
            </ItemHeader>
          </Popover>


          <Popover
            content={
              <PopoverContent>
                {/* Chia thành 3 cột */}
                <Column>
                  {/* Hiển thị sản phẩm trong cột thứ hai */}
                  {brands.slice(0, 4).map((brand, index) => (
                    <StyledWrapperContentPopup
                      key={index}
                      onClick={() => handleNavigateBrand(brand)}
                    >
                      {brand}
                    </StyledWrapperContentPopup>
                  ))}
                </Column>
                <Column>
                  {/* Hiển thị sản phẩm trong cột thứ hai */}
                  {brands.slice(5, 9).map((brand, index) => (
                    <StyledWrapperContentPopup
                      key={index}
                      onClick={() => handleNavigateBrand(brand)}
                    >
                      {brand}
                    </StyledWrapperContentPopup>
                  ))}
                </Column>
                <Column>
                  {/* Hiển thị sản phẩm trong cột thứ ba */}
                  {brands.slice(10, 14).map((brand, index) => (
                    <StyledWrapperContentPopup
                      key={index}
                      onClick={() => handleNavigateBrand(brand)}
                    >
                      {brand}
                      
                    </StyledWrapperContentPopup>
                  ))}
                </Column>
                <Column>
                  {/* Hiển thị sản phẩm trong cột thứ ba */}
                  {brands.slice(14, 18).map((brand, index) => (
                    <StyledWrapperContentPopup
                      key={index}
                      onClick={() => handleNavigateBrand(brand)}
                    >
                      {brand}
                    </StyledWrapperContentPopup>
                  ))}
                </Column>
              </PopoverContent>
            }
            title="Các Thương Hiệu"
            trigger="click"
            visible={isOpenBrandPopup}
            onVisibleChange={(visible) => setIsOpenBrandPopup(visible)}
          >
            <ItemHeader onClick={handleClickBrandPopup}>
              
              Thương Hiệu
              <CaretDownOutlined />
            </ItemHeader>
          </Popover>

          {/*  */}

          {!isHiddenCart && (
            <ItemHeader
              onClick={() => navigate("/order")}
              style={{ cursor: "pointer" }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "26px" }}
                >
              shopping_bag
                </span>
              </Badge>
              Giỏ hàng
            </ItemHeader>
          )}

          <Loading isLoading={loading}>
            <ItemHeader>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span class="material-symbols-outlined" style={{ fontSize: "26px"}}>
                  person_2
                </span>
                //<UserOutlined style={{ fontSize: "30px", color: "black" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover
                    content={content}
                    trigger="click"
                    open={isOpenUserPopup}
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        maxWidth: 135,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      onClick={() => setIsOpenUserPopup((prev) => !prev)}
                    >
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer", color: "black" }}
                >
                  <div>
                    <ItemHeader>Cá Nhân</ItemHeader>
                    
                  </div>
                </div>
              )}
            </ItemHeader>
          </Loading>
          {/* {!isHiddenCart && (
            <div
              onClick={() => navigate("/order")}
              style={{ cursor: "pointer" }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "26px" }}
                >
              shopping_bag
                </span>
              </Badge>
            </div>
          )} */}
        </Col>
      </WrapperHeader>
    </StyledNavbar>
  );
};

export default NavComponent;
