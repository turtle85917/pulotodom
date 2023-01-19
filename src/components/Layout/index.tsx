import Header from "@Layout/Header";
import Profile from "@components/Profile";
import MenuContext from "@components/MenuContext";

const Layout: React.FC = () => {
  return <>
    <Header />
    <Profile />
    <MenuContext />
  </>;
}

export default Layout;
