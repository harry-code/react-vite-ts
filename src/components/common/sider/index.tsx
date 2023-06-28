import React, { useState } from 'react';
import { Menu } from 'antd';
import { RoutesData } from '~/routes';
import { useNavigate } from 'react-router-dom';
import './index.less'

function Sider() {
  const history = useNavigate();
  const [current, setCurrent] = useState('/')
  const handleClick = (e: any) => {
    setCurrent(e.key)
    history(e.key)
  }
  return (
    <>
      <Menu mode="inline"
        className="sider"
        onClick={handleClick}
        selectedKeys={[current]}
        items={RoutesData}
        style={{ width: 256 }}>
      </Menu>
    </>
  )
}

export default Sider;