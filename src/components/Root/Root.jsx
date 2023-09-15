import { Outlet } from "react-router-dom";
import Header from "../Header";
import HeaderMUI from "../HeaderMUI/HeaderMUI";
// import Footer from "../Footer/Footer";

const Root = () => {
  return (
    <div className="root-container">
      {/* <Header /> */}
      <HeaderMUI />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Root;
