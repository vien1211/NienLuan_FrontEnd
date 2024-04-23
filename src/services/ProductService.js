import axios from "axios"
import { axiosJWT } from "./UserService"



export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`)
    }
    return res.data
}


export const getProductType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const getProductBrand = async (brand, page, limit) => {
    if (brand) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=brand&filter=${brand}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data
}

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)
    return res.data
}

export const getAllBrand = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-brand`)
    return res.data
}



export const getSoldCountById = async (productId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/sold/${productId}`);
        return response.data.soldCount;
    } catch (error) {
        console.error("Error fetching sold count:", error);
        return 0; // Trong trường hợp lỗi, trả về 0 hoặc giá trị mặc định khác
    }
};

export const getProductsByFilter = async (filter, page, limit) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`, {
            params: {
                filter: filter,
                page: page,
                limit: limit
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            status: 'ERR',
            message: 'Failed to fetch products'
        };
    }
};