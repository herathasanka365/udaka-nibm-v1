// Analytics tracking placeholder
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // Google Analytics placeholder
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', event, properties);
    }
    
    // Console logging for development
    console.log('Analytics Event:', event, properties);
  },
  
  page: (path: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path
      });
    }
    
    console.log('Analytics Page View:', path);
  },
  
  identify: (userId: string, traits?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        user_id: userId,
        custom_map: traits
      });
    }
    
    console.log('Analytics Identify:', userId, traits);
  }
};

// Initialize analytics on app load
export const initializeAnalytics = () => {
  if (typeof window !== "undefined") {
    // Google Analytics initialization placeholder
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href
    });
    
    console.log('Analytics initialized');
  }
};