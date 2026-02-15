import { useEffect, useRef } from 'react';
import { ADSENSE_CONFIG, isAdSenseConfigured } from '../config/adsense';

function AdSense({ 
  adSlot = '1234567890', 
  adFormat = 'auto',
  adLayout = '',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = '',
  adClient = ADSENSE_CONFIG.publisherId
}) {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (adRef.current && window.adsbygoogle && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Don't render if AdSense is not configured
  if (!isAdSenseConfigured()) {
    return (
      <div className={`adsense-placeholder ${className}`} style={style}>
        <div style={{
          padding: '20px',
          background: '#f3f4f6',
          border: '2px dashed #d1d5db',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.9rem'
        }}>
          Ad Space
          <br />
          <small>Configure AdSense client ID in AdSense component</small>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

export default AdSense;

