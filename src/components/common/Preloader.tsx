import React from 'react';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from "antd";

let Preloader = () => {
  return (
    <div style={{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      width: '100%'
    }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
    </div>
  );
};

export default Preloader;