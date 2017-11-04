import React,{Component} from 'react'

import {Layout,Menu} from 'antd'
const {Content, Sider } = Layout

//导入路由相关的组件
import {
    Route,
    Link
} from 'react-router-dom'

//导入子组件
import MovieListComponent from './MovieListComponent.js'
import MovieDetailComponent from './MovieDetailComponent.js'

export default class MovieComponent extends Component{
    render(){
        return <Layout style={{height:'100%'}}>
            {/* 1.0 左边的侧边栏 */}
            <Sider width={200} style={{ background: '#fff',height:'100%'}}>
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', border: '1px solid #eee' }}
                >
                    <Menu.Item key="1"><Link to="/movie/in_theaters">正在热映</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/movie/coming_soon">即将上映</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/movie/top250">Top250</Link></Menu.Item>
                </Menu>
            </Sider>

            {/* 2.0 右边的路由 */}
            <Layout>
                <Content style={{background: '#fff',padding:24, margin: 0}}>
                    {/* 电影列表组件 */}
                    <Route exact path="/movie/:movieType" component={MovieListComponent} />
                    {/* 电影详情组件 */}
                    <Route path="/movie/detail/:movieId" component={MovieDetailComponent} />
                </Content>
            </Layout>
        </Layout>
    }
}