import './App.css';
import { Layout} from 'antd';
import 'antd/dist/antd.min.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Page from "./pages/Page";
import PageNotFound from "./pages/404";
import {FC} from "react";
const { Header, Footer } = Layout;

const App:FC = ()=> {
  return (
      <Layout className="layout">
        <Header style={{color:"#fff"}}>
          Announcements
        </Header>
        HOME
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="page" element={<Page />}>
            <Route path=":postID" element={<Page />} />
          </Route>
          <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
        <Footer style={{ textAlign: 'center' }}>for NerdySoft</Footer>
      </Layout>
  );
}

export default App;
