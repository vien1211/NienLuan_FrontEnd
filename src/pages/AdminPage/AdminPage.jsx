import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons'
import NavComponent from '../../components/NavCompoent/NavComponent';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAmin';
import * as OrderService from '../../services/OrderService'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import { useNavigate } from "react-router-dom";
import AdminAnalyze from './components/AdminAnalyze';
import { useSelector, useDispatch } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { resetUser } from "../../redux/slides/userSlide";

const AdminPage = () => {
  const user = useSelector((state) => state?.user)


  const items = [
    getItem('Người dùng', 'users', <UserOutlined />),
    getItem('Sản phẩm', 'products', <AppstoreOutlined />),
    getItem('Đơn hàng', 'orders', <ShoppingOutlined />),
    
  ];

  const [keySelected, setKeySelected] = useState('');
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return {data: res?.data, key: 'orders'}
  }

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res1', res)
    return {data: res?.data, key: 'products'}
  }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('res', res)
    return {data: res?.data, key: 'users'}
  }

  const queries = useQueries({
    queries: [
      {queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60},
      {queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60},
      {queryKey: ['orders'], queryFn: getAllOrder, staleTime: 1000 * 60},
    ]
  })
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if(queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })
      }
    return result
    } catch (error) {
      return result
    }
  },[queries])
  const COLORS = {
   users: ['#e66465', '#0891b2'],
   products: ['#f59e0b', '#65a30d'],
   orders: ['#fda4af', '#10b981'],
  };

  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return (
          <AdminUser />
        )
      case 'products':
        return (
          <AdminProduct />
        )
      case 'orders':
        return (
          <OrderAdmin />
        )
      default:
        return <></>
    }
  }

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  console.log('memoCount', memoCount)

  return (
    <>
    <HeaderComponent />
      <NavComponent isHiddenSearch isHiddenCart/>
      <div style={{display: 'flex', overflowX: 'hidden', fontFamily: "poppins, sans-serif", marginTop: "100px", padding: "30px" }}>
      
          
       
        <Menu
          mode="inline"
          style={{
            width: 250,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh',
            fontSize: '20px', 
            marginTop: '10px'
          }}
          items={items}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          <h2 style={{textAlign: 'center', marginBottom: '18px', marginTop: '2px'}}>Quản Lý Hệ Thống</h2>
          <hr />
          <Loading isLoading={memoCount && Object.keys(memoCount) &&  Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <AdminAnalyze data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}
          </Loading>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage