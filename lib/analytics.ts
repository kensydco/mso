// Google Analytics 4 Integration

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined event helpers
export const trackCTAClick = (ctaName: string) => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: ctaName,
  });
};

export const trackFormSubmit = (formName: string) => {
  event({
    action: 'form_submit',
    category: 'conversion',
    label: formName,
  });
};

export const trackBrandView = (brandName: string) => {
  event({
    action: 'brand_view',
    category: 'portfolio',
    label: brandName,
  });
};

export const trackOutboundClick = (url: string) => {
  event({
    action: 'click',
    category: 'outbound',
    label: url,
  });
};
