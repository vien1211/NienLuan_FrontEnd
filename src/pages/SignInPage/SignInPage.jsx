import React, { useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { ContainerLeft, ContainerRight, WrapperText } from "./style";
import logovien from "../../assets/images/logovien.png";
import { Image } from "antd";
import {
  EyeFilled,
  EyeInvisibleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleSignIn = () => {
    console.log("logingloin");
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
          position: "relative",
        }}
      >
        <CloseCircleFilled
          style={{
            position: "absolute",
            top: "-12px",
            right: "-11px",
            fontSize: "40px",
            cursor: "pointer",
            color: "#007f5f",
          }}
          onClick={handleNavigateHome}
        />
        <ContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập vào tạo tài khoản</p>
          <InputForm
            style={{
              marginBottom: "10px",
              height: "50px",
              border: "1px solid #007f5f",
              borderRadius: "8px",
            }}
            placeholder="Nhập E-Mail"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "12px",
                right: "12px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Nhập Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
              style={{
                marginBottom: "10px",
                height: "50px",
                border: "1px solid #007f5f",
                borderRadius: "8px",
              }}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={60}
              styleButton={{
                background: "#007f5f",
                color: "#ffff",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textbutton={"Đăng nhập"}
            ></ButtonComponent>
          </Loading>
          <p>
            <WrapperText>Quên mật khẩu?</WrapperText>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <WrapperText onClick={handleNavigateSignUp}>
              {" "}
              Tạo tài khoản
            </WrapperText>
          </p>
        </ContainerLeft>
        <ContainerRight>
          <Image
            src={logovien}
            preview={false}
            alt="iamge-logo"
            height="203px"
            width="203px"
            
          />
          <span>
          <p style={{fontFamily: "poppins, sans-serif", fontSize: "15px"}}>Chào mừng bạn đến với</p>
          <p style={{fontFamily: "poppins, sans-serif", fontSize: "15px", textAlign: "center"}}>Vieen's Store</p>
          </span>
          
        </ContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
