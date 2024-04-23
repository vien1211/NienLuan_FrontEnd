import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {
  ContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editing, setEditing] = useState(false);

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
      setEditing(false);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  return (
    <div style={{ width: "1270px", margin: "140px auto", height: "500px" }}>
      <Loading isLoading={isLoading}>
        <ContentProfile>
          <WrapperHeader>Thông Tin Người Dùng</WrapperHeader>
          <hr style={{ width: '100%', margin: '2px 0', borderTop: '1px solid #4D5D53' }} />
          <div style={{margin: "0 auto"}}>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "200px",
                  width: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
          </div>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="name"
              value={name}
              onChange={setName}
              disabled={!editing}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              value={email}
              onChange={setEmail}
              disabled={!editing}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              value={phone}
              onChange={setPhone}
              disabled={!editing}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile>
              <Upload
                beforeUpload={() => false}
                onChange={handleOnchangeAvatar}
                maxCount={1}
                showUploadList={false}
                disabled={!editing}
              >
                <Button icon={<UploadOutlined />} disabled={!editing}>
                  Select File
                </Button>
              </Upload>
            </WrapperUploadFile>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="address"
              value={address}
              onChange={setAddress}
              disabled={!editing}
            />
          </WrapperInput>

          <WrapperInput style={{justifyContent: "center",
    alignItems: "center"}}>
          {!editing ? (
            <ButtonComponent
              onClick={() => setEditing(true)}
              size={40}
              styleButton={{
                height: "40px",
                width: "fit-content",
                border: "1px solid #007f5f",
                borderRadius: "8px",
                padding: "2px 8px 6px",
                
              }}
              textbutton={"Chỉnh sửa"}
              styleTextButton={{
                color: "#007f5f",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          ) : (
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "40px",
                width: "fit-content",
                border: "1px solid #007f5f",
                borderRadius: "8px",
                padding: "2px 8px 6px",
                
              }}
              textbutton={"Cập nhật"}
              styleTextButton={{
                color: "#007f5f",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
            
          )}
          </WrapperInput>
        </ContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
