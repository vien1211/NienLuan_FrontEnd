import { Button, Form, Select, Space, Input } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useRef } from "react";
import {
  WrapperHeader,
  WrapperUploadFile,
  StyleAdmin,
  DescriptionInput,
} from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { useEffect } from "react";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);
  const { TextArea } = Input;
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    brand: "",
    countInStock: "",
    newType: "",
    //discount: '',
  });
  const [stateProduct, setStateProduct] = useState(inittial());
  const [stateProductDetails, setStateProductDetails] = useState(inittial());

  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Thêm trạng thái chỉnh sửa
  const [selectedProduct, setSelectedProduct] = useState(null); // Thêm sản phẩm được chọn để chỉnh sửa
  const [editForm] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      description,
      rating,
      image,
      type,
      brand,
      countInStock,
      //discount
    } = data;
    const res = ProductService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      brand,
      countInStock,
      //discount
    });
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        brand: res?.data?.brand,
        countInStock: res?.data?.countInStock,
        //discount: res?.data?.discount
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleEditProduct = (productId) => {
    const product = dataTable.find((item) => item.key === productId);
    setSelectedProduct(product);
    setIsEditMode(true);
  };

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const handleDelteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  const fetchAllBrandProduct = async () => {
    const res = await ProductService.getAllBrand();
    return res;
  };

  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;
  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDelectedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });
  const brandProduct = useQuery({
    queryKey: ["brand-product"],
    queryFn: fetchAllBrandProduct,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const renderAction = () => {
    return (
      <div style={{ display: "flex" }}>
        <ButtonComponent
          icon={<DeleteOutlined style={{ fontSize: "20px" }} />}
          onClick={() => setIsModalOpenDelete(true)}
          textbutton="Delete"
          styleButton={{
            background: "none",
            border: "1px solid #007f5f",
            alignItems: "center",
            display: "flex",
            padding: "4px 8px",
          }}
        />
        <ButtonComponent
          icon={
            <FormOutlined
              style={{ color: "white", fontSize: "16px", marginLeft: "8px" }}
            />
          }
          onClick={handleDetailsProduct}
          textbutton="Edit"
          styleButton={{
            background: "#007f5f",
            border: "1px solid #007f5f",
            width: "80px",
            display: "flex",
            padding: "4px 8px",
          }}
          styleTextButton={{ color: "white" }}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return Number(record.rating) >= 3;
        }
        return Number(record.rating) <= 3;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a.rating - b.rating,
      ...getColumnSearchProps("type"),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.rating - b.rating,
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Thêm sản phẩm thành công");
      handleCancel();
    } else if (isError) {
      message.error("Thêm sản phẩm thất bại");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === "OK") {
      message.success("");
    } else if (isErrorDeletedMany) {
      message.error("");
    }
  }, [isSuccessDelectedMany]);

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success("");
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error("");
    }
  }, [isSuccessDelected]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      brand: "",
      countInStock: "",
    });
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật sản phẩm thành công");
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      brand: "",
      countInStock: "",
      //discount: '',
    });
    form.resetFields();
  };

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      brand:
        stateProduct.brand === "add_brand"
          ? stateProduct.newBrand
          : stateProduct.brand,
      countInStock: stateProduct.countInStock,
      //discount: stateProduct.discount
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeBrand = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateProductDetails },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleChangeSelect = (value) => {
    if (value === "add_type") {
      // Nếu chọn "New Type", cập nhật trường type trong stateProduct
      setStateProduct({
        ...stateProduct,
        type: value,
      });
    } else {
      // Nếu chọn một loại khác, cập nhật trường type trong stateProduct
      setStateProduct({
        ...stateProduct,
        type: value,
      });
    }
  };

  const handleChangeSelectBrand = (value) => {
    if (value === "add_brand") {
      // Nếu chọn "New Brand", cập nhật trường brand trong stateProduct
      setStateProduct({
        ...stateProduct,
        brand: value,
      });
    } else {
      // Nếu chọn một brand khác, cập nhật trường brand trong stateProduct
      setStateProduct({
        ...stateProduct,
        brand: value,
      });
    }
  };

  return (
    <StyleAdmin>
      <WrapperHeader onClick={() => setIsModalOpen(true)}>
        Quản lý sản phẩm
      </WrapperHeader>
      <ButtonComponent
        icon={<PlusOutlined style={{ fontSize: "20px" }} />}
        onClick={() => setIsModalOpen(true)}
        textbutton="Thêm Sản Phẩm"
        styleButton={{
          background: "none",
          border: "1px solid #007f5f",
          alignItems: "center",
          display: "flex",
          padding: "4px 8px",
          height: "50px",
          marginTop: "15px",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDelteMany={handleDelteManyProducts}
          columns={columns}
          isLoading={isLoadingProducts}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Thêm sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{fontFamily: "poppins, sans-serif"}}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProduct["name"]}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại sản phẩm"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Select
                name="type"
                value={stateProduct.type}
                onChange={handleChangeSelect}
                options={[
                  ...renderOptions(typeProduct?.data?.data),
                  { label: "New Type", value: "add_type" },
                ]}
              />
            </Form.Item>
            {stateProduct.type === "add_type" && (
              <Form.Item
                label="Loại sản phẩm mới"
                name="newType"
                rules={[{ required: true, message: "Please input your type!" }]}
              >
                <InputComponent
                  value={stateProduct.newType}
                  onChange={handleOnchange}
                  name="newType"
                />
              </Form.Item>
            )}

            <Form.Item
              label="Thương hiệu"
              name="brand"
              rules={[{ required: true, message: "Please input your brand!" }]}
            >
              <Select
                name="brand"
                value={stateProduct.brand || ""}
                onChange={(value) => handleChangeSelectBrand(value)}
                options={[
                  ...renderOptions(brandProduct?.data?.data),
                  { label: "New Brand", value: "add_brand" },
                ]}
              />
            </Form.Item>
            {stateProduct.brand === "add_brand" && (
              <Form.Item
                label="Thương hiệu mới"
                name="newBrand"
                rules={[
                  { required: true, message: "Please input your brand!" },
                ]}
              >
                <InputComponent
                  value={stateProduct.newBrand}
                  onChange={handleOnchange}
                  name="newBrand"
                />
              </Form.Item>
            )}
            <Form.Item
              label="Tồn kho"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count inStock!" },
              ]}
            >
              <InputComponent
                value={stateProduct.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                { required: true, message: "Please input your count price!" },
              ]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                { required: true, message: "Please input your count rating!" },
              ]}
            >
              <InputComponent
                value={stateProduct.rating}
                onChange={handleOnchange}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your count description!",
                },
              ]}
            >
              <TextArea
                value={stateProduct.description}
                onChange={handleOnchange}
                name="description"
                style={{
                  width: "100%",
                  minHeight: "140px",
                  overflowY: "auto",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                { required: true, message: "Please input your count image!" },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Select File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: "275px",
                      width: "340px",
                      borderRadius: "8%",
                      objectFit: "cover",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <ModalComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onCancel={handleCloseDrawer}
        width="50%"
        footer={null}
        style={{fontFamily: "poppins, sans-serif"}}
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProductDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại sản phẩm"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <InputComponent
                value={stateProductDetails["type"]}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Thương hiệu"
              name="brand"
              rules={[{ required: true, message: "Please input your brand!" }]}
            >
              <InputComponent
                value={stateProductDetails["brand"]}
                onChange={handleOnchangeDetails}
                name="brand"
              />
            </Form.Item>
            <Form.Item
              label="Tồn kho"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count inStock!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.countInStock}
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                { required: true, message: "Please input your count price!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                { required: true, message: "Please input your count rating!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.rating}
                onChange={handleOnchangeDetails}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your count description!",
                },
              ]}
            >
              <TextArea
                value={stateProductDetails.description}
                onChange={handleOnchangeDetails}
                name="description"
                style={{
                  width: "100%",
                  minHeight: "140px",
                  overflowY: "auto",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                { required: true, message: "Please input your count image!" },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <div style={{ marginBottom: "25px" }}>
                  {stateProductDetails?.image && (
                    <img
                      src={stateProductDetails?.image}
                      style={{
                        height: "275px",
                        width: "340px",
                        borderRadius: "8%",
                        objectFit: "cover",
                      
                      }}
                      alt="avatar"
                    />
                  )}
                </div>
                <Button>Select File</Button>
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </StyleAdmin>
  );
};

export default AdminProduct;
