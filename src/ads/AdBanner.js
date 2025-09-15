import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Handle ad loading errors quietly
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot="YOUR_AD_SLOT"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
};

export default AdBanner;
