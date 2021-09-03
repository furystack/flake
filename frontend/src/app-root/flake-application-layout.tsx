import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { FlakeHeader } from './header'
import { Routes } from './routes'

export const FlakeApplicationLayout = () => (
  <Router>
    <Layout
      style={{
        height: '100%',
      }}>
      <FlakeHeader />
      <Layout style={{ marginTop: 64, flexDirection: 'row' }}>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
              overflow: 'auto',
            }}>
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Router>
)
