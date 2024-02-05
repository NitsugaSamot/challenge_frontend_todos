import Header from "./header/header";
import  {Cover}  from "./cover/cover";
import Footer from "./footer/footer";
import Main from "./main/main";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Main/>
      <Cover/>
      <Footer />
    </>
  );
};

export default LandingPage;
