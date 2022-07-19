import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Basket from "./components/basket/Basket";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminCategories from "./components/admin/category/AdminCategory";
import AddCategory from "./components/admin/category/AddCategory";
import EditCategory from "./components/admin/category/EditCategory";
import CategoryState from "./state/CategoryState";
import AdminProducts from "./components/admin/product/AdminProducts";
import AddProduct from "./components/admin/product/AddProduct";
import ProductState from "./state/ProductState";
import EditProduct from "./components/admin/product/EditProduct";
import Footer from "./components/Footer";
import UserState from "./state/UserState";
import BasketState from "./state/BasketState";
import ProductDetail from "./components/pages/ProductDetail";
import Toast from "./components/others/Toast";
import AdminRoutes from "./routers/AdminRoutes";
import LoggedRoutes from "./routers/LoggedRoutes";
import NotLoggedRoutes from "./routers/NotLoggedRoutes";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <BasketState>
      <UserState>
        <ProductState>
          <CategoryState>
            <BrowserRouter>
              <Header />
              <div className="container">
                <Routes>
                  <Route path="/" element={ <Home /> } />
                  <Route path="/hakkimizda" element={ <About /> } />
                  <Route path="/iletisim" element={ <Contact /> } />
                  <Route path="/urun-detay/:productId" element={ <ProductDetail /> } />
                  <Route element={ <LoggedRoutes /> }>
                    <Route path="/sepet" element={ <Basket /> } />
                  </Route>
                  <Route element={ <NotLoggedRoutes /> }>
                    <Route path="/giris-yap" element={ <Login /> } />
                    <Route path="/kayit-ol" element={ <Register /> } />
                  </Route>
                  <Route element={ <AdminRoutes /> }>
                    <Route path="/admin/urunler" element={ <AdminProducts /> } />
                    <Route path="/admin/urun-ekle" element={ <AddProduct /> } />
                    <Route path="/admin/urun-duzenle/:productId" element={ <EditProduct /> } />
                    <Route path="/admin/kategoriler" element={ <AdminCategories /> } />
                    <Route path="/admin/kategori-ekle" element={ <AddCategory /> } />
                    <Route path="/admin/kategori-duzenle/:categoryId" element={ <EditCategory /> } />
                  </Route>
                  <Route path="*" element={ <NotFoundPage /> } />
                </Routes>
                <Toast />
              </div>
              <Footer />
            </BrowserRouter>
          </CategoryState>
        </ProductState>
      </UserState>
    </BasketState>
  );
}

export default App;
