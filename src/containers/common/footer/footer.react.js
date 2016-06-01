import React from 'react';

const styles = {
  width: '100%',
  // height: 40,
  bottom: 0,
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center'
};

const Footer = () => (
  <div style={ styles }>
    1.1.0v <a style={ { color: '#fff' } } href='https://www.facebook.com/haowei.liou'>Design by Whien_Liou</a>
  </div>
);

export default Footer;
