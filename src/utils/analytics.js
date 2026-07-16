export const trackEvent = (eventName, params = {}) => {
  // Ensure dataLayer exists even if GTM hasn't finished loading yet.
  // Without this, events fired early (e.g. on page mount) can be
  // silently lost if window.dataLayer is still undefined.
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: eventName,
    ...params,
  });
};