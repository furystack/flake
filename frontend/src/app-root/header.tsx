import { Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { useCallback, useEffect, useState } from 'react'
import { LogoutButton } from '../components/logout-button'

export const FlakeHeader = () => {
  const [transform, setTransform] = useState('')
  const onScroll = useCallback(() => {
    if (window.scrollY > 60) {
      setTransform('translateY(-70px)')
    } else {
      setTransform('translateY(0px)')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <Header
      className="header"
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backdropFilter: 'blur(15px)',
        backgroundColor: 'rgba(64,64,64,0.3)',
        display: 'flex',
        transition: 'transform 500ms cubic-bezier(0.695, 0.840, 0.220, 0.990)',
        transform,
      }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ background: 'transparent' }}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      <div style={{ flex: 1 }} />
      <div>
        <LogoutButton />
      </div>
    </Header>
  )
}
