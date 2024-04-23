import React, { useState, useEffect } from "react";
import { Menu, Select, Rate  } from "antd";
import { PieChartOutlined, AppstoreOutlined, CommentOutlined } from '@ant-design/icons';
import { getAllTypeProduct, getAllBrand } from "../../services/ProductService";
import { StyledMenu } from './style';
import * as ProductService from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const SideMenu = ({ onFilterChange }) => {
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
 
    const fetchData = async () => {
      const typesData = await getAllTypeProduct(); // Thay vì gọi getAllTypes
      const brandsData = await getAllBrand(); // Thay vì gọi getAllBrands
      setTypes(typesData);
      setBrands(brandsData);
    };

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
  
    const ParentComponent = () => {
      const handleFilterChange = (filters) => {
        console.log("Filters changed:", filters);
        // Xử lý logic của bạn khi bộ lọc thay đổi
      };
    
      return (
        <div>
          {/* Truyền hàm handleFilterChange xuống SideMenu */}
          <SideMenu onFilterChange={handleFilterChange} />
          {/* Các thành phần khác trong component cha */}
        </div>
      );
    };
    

    const handleTypeChange = (selectedTypes) => {
      onFilterChange({ types: selectedTypes });
    };
    
    const handleBrandChange = (selectedBrands) => {
      onFilterChange({ brands: selectedBrands });
    };
    
  const handleMenuClick = (event) => {
    const key = event.key;
    console.log("Clicked menu item key: ", key);
  };

  return (
    <StyledMenu
      onClick={handleMenuClick}
      style={{ width: 280 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <Menu.ItemGroup key="group1" title={<span><PieChartOutlined /> Loại Sản Phẩm</span>}>
        <Select
          mode="multiple"
          style={{ width: "90%", marginBottom: "10px" }}
          placeholder="Chọn loại sản phẩm"
          onChange={handleTypeChange}
        >
          {types.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Menu.ItemGroup>
      <hr />
      <Menu.ItemGroup key="group2" title={<span><PieChartOutlined /> Thương Hiệu</span>}>
        <Select
          mode="multiple"
          style={{ width: "90%", marginBottom: "10px" }}
          placeholder="Chọn thương hiệu"
          onChange={handleBrandChange}
        >
          {brands.map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>
      </Menu.ItemGroup>
<hr />
      <Menu.ItemGroup key="group3" title={<span><CommentOutlined /> Đánh Giá</span>}>
      <Rate allowHalf defaultValue={4.5} />
      </Menu.ItemGroup>

      <hr />
    </StyledMenu>
  );
};

export default SideMenu;
