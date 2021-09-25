import { Layout ,Menu} from 'antd'
import { Header } from 'antd/lib/layout/layout'
import SubMenu from 'antd/lib/menu/SubMenu'
import React from  'react'

class Home extends React.Component {
    render(){
        return(
            <Layout>
                <Header  style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <SubMenu title="子菜单">
    <Menu.Item>子菜单项</Menu.Item>
  </SubMenu>
                    </Menu>
                </Header>
            </Layout>
        )
    }
}
export default Home