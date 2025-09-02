


// lib/Api.ts
import axios, { AxiosError } from "axios";

// 🔗 Laravel API Base Instance
const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔹 Centralized Error Handling
Api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      console.error("❌ Server Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("❌ Network Error: No response from server");
    } else {
      console.error("❌ Unexpected Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// 🔹 Helper to safely call APIs
const safeCall = async <T>(promise: Promise<{ data: T }>): Promise<T> => {
  try {
    const { data } = await promise;
    return data;
  } catch (err) {
    throw err; // caller এ যাবে, যাতে toast/alert দেখানো যায়
  }
};

/* =====================
   📦 Item APIs
   ===================== */

// ✅ GET (সব ডাটা আনা)
export const getItems = () => safeCall(Api.get("/items"));

// ✅ GET (একটা ডাটা আনা by ID)
export const getItemById = (id: number | string) => safeCall(Api.get(`/items/${id}`));

// ✅ POST (নতুন আইটেম তৈরি করা)
export const createItem = (data: any) => safeCall(Api.post("/items", data));

// ✅ PUT (ডাটা আপডেট করা by ID)
export const updateItem = (id: number | string, data: any) =>
  safeCall(Api.put(`/items/${id}`, data));

// ✅ DELETE (ডাটা ডিলিট করা by ID)
export const deleteItem = (id: number | string) => safeCall(Api.delete(`/items/${id}`));

/* =====================
   🪙 Wallet & Coin APIs
   ===================== */

// ✅ Add Coin
export const addCoin = (data: any) => safeCall(Api.post("/add_coin", data));

// ✅ Get Coin
export const getCoin = (data: any) => safeCall(Api.post("/coin_get", data));

// ✅ Wallet Get
export const getWallet = (data: any) => safeCall(Api.post("/wallate_get", data));

export default Api;







// // lib/Api.ts
// import axios from "axios";

// // 🔗 Laravel API Base Instance
// const Api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api", 
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// /* =====================
//    📦 Item APIs
//    ===================== */

// // ✅ GET (সব ডাটা আনা)
// export const getItems = async () => {
//   const { data } = await Api.get("/items");
//   return data;
// };

// // ✅ GET (একটা ডাটা আনা by ID)
// export const getItemById = async (id: number | string) => {
//   const { data } = await Api.get(`/items/${id}`);
//   return data;
// };

// // ✅ POST (নতুন আইটেম তৈরি করা)
// export const createItem = async (data: any) => {
//   const { data: res } = await Api.post("/items", data);
//   return res;
// };

// // ✅ PUT (ডাটা আপডেট করা by ID)
// export const updateItem = async (id: number | string, data: any) => {
//   const { data: res } = await Api.put(`/items/${id}`, data);
//   return res;
// };

// // ✅ DELETE (ডাটা ডিলিট করা by ID)
// export const deleteItem = async (id: number | string) => {
//   const { data: res } = await Api.delete(`/items/${id}`);
//   return res;
// };

// /* =====================
//    🪙 Wallet & Coin APIs
//    ===================== */

// // ✅ Add Coin
// export const addCoin = async (data: any) => {
//   const { data: res } = await Api.post("/add_coin", data);
//   return res;
// };

// // ✅ Get Coin
// export const getCoin = async (data: any) => {
//   const { data: res } = await Api.post("/coin_get", data);
//   return res;
// };

// // ✅ Wallet Get
// export const getWallet = async (data: any) => {
//   const { data: res } = await Api.post("/wallate_get", data);
//   return res;
// };

// export default Api;
