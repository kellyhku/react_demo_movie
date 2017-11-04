import React from 'react'

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

//导入样式
import './statics/css/App.css'

//导入路由相关组件
import {
  BrowserRouter as Router,//取别名
  Route,
  Link
} from 'react-router-dom'

//导入子组件
import HomeComponent from './components/home/HomeComponent.js'
import MovieComponent from './components/movie/MovieComponent.js'
import AboutComponent from './components/about/AboutComponent.js'

export default class App extends React.Component{
    render(){
        //这个是返回的JSX的内容
        return <Router>
          <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">首 页</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/movie/in_theaters">电 影</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/about">关 于</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ minHeight: 280,background: '#fff',height:'100%' }}>
              <Route exact path="/" component={HomeComponent}/>
              <Route path="/movie" component={MovieComponent}/>
              <Route path="/about" component={AboutComponent}/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          </Footer>
        </Layout>
      </Router>
    }
}