import Home from "../views/Home";
import ErrorPage from "../views/ErroPage";
import Layout from "../layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProductForm from "../views/seller/AddProductForm";
import ViewProducts from "../views/seller/viewProduct";
import SellerDashLayout from "../layouts/SellerDashLayout";
import ViewSingleProduct from "../views/seller/viewSingleProduct";
import SellerDashboard from "../components/SellerStats";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route>
          <Route path="/buyer" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
        <Route path="/*" element={<ErrorPage />} />
        <Route
          path="/product-detail/:productId"
          Component={ViewSingleProduct}
        />
        <Route>
          <Route path="/materials" element={<SellerDashLayout />}>
            <Route index element={<SellerDashboard />} />
            <Route path="/materials/products" element={<ViewProducts />} />
            <Route path="/materials/addProduct" element={<AddProductForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
