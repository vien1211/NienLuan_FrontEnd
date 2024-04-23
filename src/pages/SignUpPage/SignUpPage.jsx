import React, {useEffect, useState} from "react";
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
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as Message from "../../components/Message/Message";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const mutation = useMutationHooks((data) => UserService.signupUser(data));

  const { data, isLoading, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      Message.success("Đăng ký thành công");
      handleLogIn();
    } else if (isError) {
      Message.error("Đăng ký thất bại");
    }
  }, [isSuccess, isError]);

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleLogIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    const isValid = validateForm();
    if (isValid) {
      mutation.mutate({
        email,
        password,
        confirmPassword,
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
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
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "24px",
            }}
          >
            Đăng ký
          </h2>

          

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
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{
                marginBottom: "10px",
                height: "50px",
                border: "1px solid #007f5f",
                borderRadius: "8px",
              }}
              placeholder="Nhập Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{
                marginBottom: "10px",
                height: "50px",
                border: "1px solid #007f5f",
                borderRadius: "8px",
              }}
              placeholder="Xác Nhận Password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
              size="large"
              styleButton={{
                background: "#007f5f",
                height: "45px",
                width: "100%",
                border: "none",
                borderRadius: "8px",
                color: "white",
                margin: "26px 0 10px",
              }}
              textbutton={"Đăng ký"}
            ></ButtonComponent>
          </Loading>
          <p>
            Bạn đã có tài khoản?{" "}
            <WrapperText onClick={handleLogIn}> Đăng nhập</WrapperText>
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

export default SignUpPage;
