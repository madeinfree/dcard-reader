import React from 'react';

const styles = {
  width: '100%',
  height: 40,
  bottom: 0,
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center'
};

const Footer = () => (
  <div style={ styles }>
    <div>
      1.0.0v <a style={ { color: '#fff' } } href='https://www.facebook.com/haowei.liou'>Design by Whien_Liou</a>
    </div>
    <div>
       此專案為學術學習用，如果侵犯請來信告知
    </div>
  </div>
);

export default Footer;
