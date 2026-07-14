export const trackEvent = (eventName, params = {}) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
};