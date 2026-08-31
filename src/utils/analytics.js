// Map GA4/GTM event names to Meta's official Standard Events where a
// direct equivalent exists. Meta gives better ad-optimization signal
// (lookalike audiences, campaign bidding) to Standard Events than to
// Custom Events, so it's worth this small mapping layer rather than
// sending everything as trackCustom.
const META_STANDARD_EVENT_MAP = {
  enrollment_completed: "Purchase",
  deposit_completed: "Purchase",
  subscription_first_payment_completed: "Purchase",
  mandate_completed: "Subscribe",
  course_details_enroll_click: "InitiateCheckout",
  start_journey_enroll_click: "InitiateCheckout",
  pricing_enroll_click: "InitiateCheckout",
  explore_courses_enroll_click: "InitiateCheckout",
  advisor_lead_form_click: "Lead",
  whatsapp_click: "Contact",
  advisor_whatsapp_click: "Contact",
};

// Meta's Purchase/Subscribe events expect `value` (number) and
// `currency` (ISO string) specifically under these key names — our
// GA4 params already use `value`/`currency`, so this just forwards
// them, but stays explicit in case that ever changes.
const buildMetaParams = (params) => {
  const metaParams = { ...params };
  if (typeof metaParams.value === "number" && !metaParams.currency) {
    metaParams.currency = "GBP";
  }
  return metaParams;
};

export const trackEvent = (eventName, params = {}) => {
  // GA4 — we're loading gtag.js directly (no GTM container), so gtag()
  // must be called explicitly. Pushing to dataLayer alone does nothing
  // here since there's no GTM listening for custom dataLayer pushes.
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Keep dataLayer push too, in case a GTM container gets added later.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  // Meta Pixel — guard in case fbq hasn't loaded yet (ad blockers,
  // slow network, etc.) so this never throws and breaks the caller.
  if (typeof window.fbq === "function") {
    const metaParams = buildMetaParams(params);
    const standardEvent = META_STANDARD_EVENT_MAP[eventName];

    if (standardEvent) {
      window.fbq("track", standardEvent, metaParams);
    } else {
      window.fbq("trackCustom", eventName, metaParams);
    }
  }
};