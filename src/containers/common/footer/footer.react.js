import React from 'react';

const styles = {
  width: '100%',
  // height: 40,
  bottom: 0,
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  opacity: 0.75
};

const Footer = () => (
  <div style={ styles }>
    <div>
      1.2.5v Design by <a style={ { color: '#fff' } } href='https://www.facebook.com/haowei.liou'>Whien_Liou</a> & <a style={ { color: '#fff' } } href='https://www.facebook.com/profile.php?id=100001827348632&fref=ts'>Culture</a>
    </div>
  </div>
);

export default Footer;
