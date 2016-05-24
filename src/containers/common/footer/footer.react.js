import React, { Component } from 'react';

const styles = {
  display: 'flex',
  width: '100%',
  height: 40,
  bottom: 0,
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center'
}

const Footer = () => {
  return (
    <div style={ styles }>
      <a style={ { color: '#fff' } } href="https://www.facebook.com/haowei.liou">Design by Whien_Liou</a>
    </div>
  )
}

export default Footer;
