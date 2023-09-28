import { Outlet } from "react-router-dom";
import HeaderMUI from "../HeaderMUI/HeaderMUI";
// import Footer from "../Footer/Footer";

const Root = () => {
  return (
    <div className="root-container">
      <HeaderMUI />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Root;
