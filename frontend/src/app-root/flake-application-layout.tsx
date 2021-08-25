import { Layout, Breadcrumb } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFound'
import { FlakeHeader } from './header'
import { FlakeSider } from './sider'

export const FlakeApplicationLayout = () => (
  <Layout
    style={{
      height: '100%',
    }}>
    <FlakeHeader />
    <Layout style={{ marginTop: 64, flexDirection: 'row' }}>
      <FlakeSider />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            overflow: 'auto',
          }}>
          <div>
            <Router>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return (
                      <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, dolorem veritatis? Laboriosam in
                        facere aut magni commodi voluptate aliquid porro cupiditate quae debitis nostrum, totam quaerat
                        voluptates, reprehenderit mollitia impedit. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Possimus rerum corrupti at deleniti labore temporibus fugit beatae dolore eaque Lorem,
                        ipsum dolor sit amet consectetur adipisicing elit. Saepe recusandae cumque, blanditiis aperiam
                        dolor laborum dignissimos alias deleniti tenetur consequuntur et perspiciatis officia, fuga
                        molestiae aliquam eveniet, natus ducimus quos? consectetur ex facere delectus minima, enim
                        accusamus illo, dolores blanditiis totam? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti
                        labore temporibus fugit beatae dolore eaque consectetur ex facere delectus minima, enim
                        accusamus illo, dolores blanditiis totam? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti
                        labore temporibus fugit beatae dolore eaque consectetur ex facere delectus minima, enim
                        accusamus illo, dolores blanditiis totam? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti
                        labore temporibus fugit beatae dolore eaque consectetur ex facere delectus minima, enim
                        accusamus illo, dolores blanditiis totam? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti
                        labore temporibus fugit beatae dolore eaque consectetur ex facere delectus minima, enim
                        accusamus illo, dolores blanditiis totam? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti
                        labore temporibus fugit beatae dolore eaque consectetur ex facere delectus minima, enim
                        accusamus illo, dolores blanditiis totam? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti
                        labore temporibus fugit beatae dolore eaque consectetur ex facere delectus minima, enim
                        accusamus illo, dolores blanditiis totam? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti
                        labore temporibus fugit beatae dolore eaque consectetur ex facere delectus minima, enim
                        accusamus illo, dolores blanditiis totam? <br />
                      </div>
                    )
                  }}
                />
                <Route render={() => <NotFoundPage />} />
              </Switch>
            </Router>
          </div>
        </Content>
      </Layout>
    </Layout>
  </Layout>
)
