import React, { useState } from "react";
import { FileText, ShieldCheck, CreditCard, AlertCircle, AlertTriangle, Phone, Mail, Instagram, Facebook } from "lucide-react";

const NAV_SECTIONS = [
  { id: "s1", label: "1. About these terms" },
  { id: "s2", label: "2. General conditions" },
  { id: "s3", label: "3. Subscription & course" },
  { id: "s4", label: "4. Payment & billing" },
  { id: "s5", label: "5. Course access" },
  { id: "s6", label: "6. Amendments" },
  { id: "s7", label: "7. Insurance & regulation" },
  { id: "s8", label: "8. Cancellation" },
  { id: "s9", label: "9. Contact" },
  { id: "s10", label: "10. Data protection" },
  { id: "s11", label: "11. Complaints" },
  { id: "s12", label: "12. Governing law" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const SectionCard = ({ id, icon, iconColor, title, children, muted }) => (
  <section
    id={id}
    style={{
      border: "0.5px solid #e2e8f0",
      borderRadius: "12px",
      padding: "22px 24px",
      marginBottom: "16px",
      background: muted ? "#f8fafc" : "#ffffff",
      scrollMarginTop: "20px",
    }}
  >
    <h2
      style={{
        fontSize: "16px",
        fontWeight: 500,
        color: "#0f172a",
        marginBottom: "16px",
        paddingBottom: "12px",
        borderBottom: "0.5px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {icon && <span style={{ color: iconColor, display: "flex" }}>{icon}</span>}
      {title}
    </h2>
    {children}
  </section>
);

const ClauseList = ({ items }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
    {items.map((item, i) => (
      <li key={i} style={{ fontSize: "13.5px", lineHeight: "1.8", color: "#475569" }}>
        <span style={{ fontWeight: 500, color: "#0f172a", marginRight: "5px" }}>{item.clause}</span>
        <span dangerouslySetInnerHTML={{ __html: item.text }} />
        {item.sub && (
          <ul
            style={{
              listStyle: "none",
              padding: "8px 0 0 16px",
              marginTop: "8px",
              borderLeft: "2px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {item.sub.map((s, j) => (
              <li key={j} style={{ fontSize: "13px", lineHeight: "1.8", color: "#64748b" }}>
                <span style={{ fontWeight: 500, color: "#475569", marginRight: "5px" }}>{s.clause}</span>
                <span dangerouslySetInnerHTML={{ __html: s.text }} />
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const Warning = ({ children }) => (
  <div
    style={{
      background: "#fefce8",
      border: "0.5px solid #fde047",
      borderRadius: "8px",
      padding: "10px 14px",
      marginBottom: "14px",
      fontSize: "13px",
      color: "#854d0e",
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
    }}
  >
    <AlertTriangle size={15} style={{ marginTop: "2px", flexShrink: 0 }} />
    {children}
  </div>
);

const SubscriptionsAgreement = () => {
  const [activeNav, setActiveNav] = useState(null);

  const handleNav = (id) => {
    setActiveNav(id);
    scrollTo(id);
  };

  return (
    <div style={{ background: "#ffffff", fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" }}>

      {/* HERO */}
      <div style={{ background: "#0f172a", color: "#fff", padding: "40px 28px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              fontSize: "12px",
              border: "0.5px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "999px",
              marginBottom: "16px",
            }}
          >
            <FileText size={13} />
            Subscription agreement
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 500, lineHeight: 1.2, marginBottom: "8px" }}>
            Faces on Faces Academy
            <span style={{ display: "block", color: "#94a3b8", fontWeight: 400, fontSize: "18px", marginTop: "4px" }}>
              Terms &amp; Conditions
            </span>
          </h1>
          <p style={{ fontSize: "14px", color: "#cbd5e1", maxWidth: "480px", lineHeight: "1.7", marginTop: "10px" }}>
            Please read these terms carefully before booking any training course with Faces on Faces Academy.
          </p>
          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "12px" }}>
            Last updated: June 2026 · Faces on Faces Ltd · Company no. 13962930
          </div>
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "28px 24px",
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "28px",
        }}
      >
        {/* SIDEBAR */}
        <aside style={{ position: "sticky", top: "12px", height: "fit-content" }}>
          <div
            style={{
              background: "#f8fafc",
              border: "0.5px solid #e2e8f0",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: "10px",
              }}
            >
              Navigation
            </p>
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleNav(s.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: activeNav === s.id ? "#e2e8f0" : "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12.5px",
                  color: activeNav === s.id ? "#0f172a" : "#64748b",
                  padding: "5px 8px",
                  borderRadius: "6px",
                  lineHeight: "1.4",
                  marginBottom: "1px",
                  fontFamily: "inherit",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = activeNav === s.id ? "#e2e8f0" : "none";
                  e.currentTarget.style.color = activeNav === s.id ? "#0f172a" : "#64748b";
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main>

          {/* 1 */}
          <SectionCard id="s1" icon={<ShieldCheck size={18} />} iconColor="#16a34a" title="1. About these terms" muted>
            <ClauseList items={[
              {
                clause: "1.1",
                text: `This Subscription Agreement is made between <strong>Faces on Faces</strong> ("Provider"), principal place of business at Little Malgraves Hall, Lower Dunton Road, Bulphan, Upminster RM14 3TD, and the Subscriber named in the agreement. In these terms "we", "our", and "us" refer to Faces on Faces Academy, and "you" and "your" refers to the Subscriber/Student.`,
              },
            ]} />
          </SectionCard>

          {/* 2 */}
          <SectionCard id="s2" title="2. General conditions of booking">
            <ClauseList items={[
              { clause: "2.1", text: "Faces on Faces Academy reserves the right to decline admission to any of its training courses." },
              { clause: "2.2", text: "The Academy reserves the right to modify or cancel scheduled training courses, including changes to dates, locations, and course content. Subscribers will be notified in advance and offered an alternative date. No refunds will be issued for changes to date, location or course content." },
              { clause: "2.3", text: "Regardless of circumstances, Faces on Faces Academy is not liable for any loss of earnings or expenses incurred by the Subscriber or any models in the event of a course cancellation or rescheduling." },
              { clause: "2.4", text: "You must wear suitable clinic attire at all times — scrubs or a uniform and closed-toe shoes. Denim and sportswear are not permitted. Long hair must be tied back, jewellery kept to a minimum, nails cut short. <strong>All clothing must be black in colour.</strong>" },
              { clause: "2.5", text: "You must email two forms of ID upon making your deposit or full payment, and bring the same ID (passport or driving licence + utility bill) to the training course. You will not be permitted to train without it." },
              { clause: "2.6", text: "If you arrive more than 45 minutes late, you may not be permitted to attend. No refund will be issued; however, a rescheduled date may be offered at the Provider's discretion." },
              { clause: "2.7", text: "The Academy will provide at least one model per student, though this cannot always be guaranteed. If a model fails to attend, remaining models will be shared. Students are encouraged to bring their own models (must be booked in advance). The Academy is not responsible for model cancellations but will offer an alternative date for missed procedures. No liability is accepted for loss of earnings or travel expenses." },
              { clause: "2.8", text: "Faces on Faces is a medically-led training institution — trainers include doctors, nurses, and advanced practitioners. While a specific trainer cannot be guaranteed, training quality and delivery will remain consistent and professional at all times." },
              { clause: "2.9", text: "If a refresher course is needed more than one month after completing the original training, it may be offered at <strong>50% of the original course price</strong> and must be paid in full at time of booking. Supervised practical sessions with your own models are available at the clinic subject to a nominal fee and availability." },
            ]} />
          </SectionCard>

          {/* 3 */}
          <SectionCard id="s3" title="3. Subscription terms & course access" muted>
            <ClauseList items={[
              {
                clause: "3.1",
                text: "By enrolling, the Subscriber joins a monthly subscription plan for the <strong>Fast Track Course</strong>, which includes: Fast Track Infection Control, Safety in Medicine, Anatomy & Physiology Level 3, Complications Management, Health and Safety, Microneedling, Skin Booster, Lumi Eye, Polynucleotide, Fat Dissolver, B12, Foundation Dermal Filler, Use of Hyaluronidase, and Foundation Anti-Wrinkle. Access is granted subject to these terms.",
              },
              {
                clause: "3.2",
                text: "An initial fee of <strong>£250</strong> is due upon signing, covering administrative costs, model arrangements, and account setup. The first monthly instalment of <strong>£100</strong> is also payable in advance. Thereafter, <strong>£100/month</strong> is collected via direct debit through GoCardless on a set monthly date.",
              },
              {
                clause: "3.3",
                text: "<strong>Right to cancel (Consumer Contracts Regulations 2013)</strong> — Subscribers who sign via distance means have the right to cancel within <strong>14 days</strong> from the date of signing without giving any reason, by emailing support@facesonfaces.com. A full refund will be issued provided no part of the course has been accessed or attended. If digital content has been accessed prior to cancellation, this right may be forfeited under Regulation 37. To delay receipt of course manuals until after the 14-day period, you must notify us in writing immediately after payment.",
              },
            ]} />
          </SectionCard>

          {/* 4 */}
          <SectionCard id="s4" icon={<CreditCard size={18} />} iconColor="#2563eb" title="4. Payment & billing">
            <Warning>The £250 initial deposit is non-refundable and is not deducted from the main course fee.</Warning>
            <ClauseList items={[
              { clause: "4.1", text: "The subscription fee is deducted automatically each month from the payment method provided." },
              { clause: "4.2", text: "Payments are non-refundable once services have been delivered and are due regardless of course completion or dissatisfaction." },
              { clause: "4.3", text: "If the Subscriber cancels the subscription at any time, the <strong>full remaining balance of £1,599</strong> becomes immediately due and payable." },
              { clause: "4.4", text: "To begin, an initial deposit of £250 plus the first month's payment of £100 is required to secure a course booking." },
              { clause: "4.5", text: "A late payment fee of <strong>£40</strong> will be added for any missed payment. If two consecutive monthly payments are missed, the Provider may cancel the agreement and the full outstanding balance becomes due immediately. If unpaid within 14 days of cancellation, a 20% penalty fee is added. If unpaid after 30 days, the matter will be referred to the legal team for Small Claims Court recovery. Any debt collection or bailiff charges will be added to the outstanding balance. Failure to settle may result in a County Court Judgment (CCJ) being recorded against the Subscriber." },
            ]} />
          </SectionCard>

          {/* 5 */}
          <SectionCard id="s5" title="5. Course access & certification" muted>
            <ClauseList items={[
              { clause: "5.1", text: "Course certificates remain the property of Faces on Faces Academy until the full amount of <strong>£1,599</strong> has been paid, at which point ownership transfers to the Subscriber. In the interim, Faces on Faces will provide certificates as proof to relevant governing bodies and insurers as required. Not holding a copy does not affect your right to practise for the above passed subjects." },
              { clause: "5.2", text: "The subscription grants access to select courses, with additional courses available provided payments are uninterrupted. The subscription has a <strong>capped limit of £3,000</strong>; amounts above this must be paid in full before the subscription can begin." },
            ]} />
          </SectionCard>

          {/* 6 */}
          <SectionCard id="s6" title="6. Amendments & modifications">
            <ClauseList items={[
              { clause: "6.1", text: "The Provider reserves the right to amend these terms, including payment terms, dates, amounts (where additional courses are added), and course offerings. Amendments will be communicated with reasonable notice and are deemed binding unless objected to in writing within 7 days." },
              { clause: "6.2–6.3", text: "All requests to change a course date must be submitted in writing to info@facesonfaces.com and will incur an additional <strong>£250 administration fee</strong> per course." },
              { clause: "6.4", text: "Availability on an alternative date cannot be guaranteed. If no suitable date is available and the Subscriber has reasonable grounds for objection, a full refund of payments made will be offered and the subscription cancelled without penalty." },
              { clause: "6.5", text: "In some cases, no new date may be available and the original booking date will remain." },
              { clause: "6.6", text: "Course bookings are non-transferable to another practitioner." },
            ]} />
          </SectionCard>

          {/* 7 */}
          <SectionCard id="s7" title="7. Insurance & regulation" muted>
            <ClauseList items={[
              { clause: "7.1", text: "While training on Academy premises, students are covered by the group insurance policy provided by <strong>Beauty Insured</strong>. It is solely the Subscriber's responsibility to obtain appropriate insurance to practise in their own country. No refunds will be issued if the Subscriber is unable to obtain, or has declined or terminated, suitable insurance." },
              { clause: "7.2", text: "The Subscriber must provide a copy of their insurance certificate to the Provider within <strong>14 days</strong> of obtaining coverage. Failure to do so may result in suspension or cancellation of the subscription. If the Subscriber chooses to delay practising, they must notify us in writing at support@facesonfaces.com. If uninsured for more than <strong>3 months</strong>, the Provider reserves the right to cancel the subscription and the full outstanding balance becomes immediately payable." },
              { clause: "7.3", text: "Subscribers are responsible for compliance with all statutory and legal obligations in the country where they practise, including but not limited to CQC, HIS, and HIW regulations." },
              { clause: "7.4", text: "Faces on Faces shall not be held liable for any non-compliance by the Subscriber with current or future legislative or regulatory changes. The Subscriber must maintain all necessary licences, registrations, and insurance at all times." },
            ]} />
          </SectionCard>

          {/* 8 */}
          <SectionCard id="s8" icon={<AlertCircle size={18} />} iconColor="#dc2626" title="8. Cancellation & termination">
            <ClauseList items={[
              { clause: "8.1", text: "The Subscriber may cancel at any time but must settle all outstanding balances for courses accessed before cancellation can be finalised. Upon cancellation, the Provider is entitled to recover a reasonable cancellation charge reflecting genuine loss, including loss of a reserved course place, administrative costs, and lost opportunity to resell. Where the Subscriber has accessed or been allocated a course place that cannot reasonably be resold, this charge will be up to the <strong>full course fee of £1,599</strong>." },
              { clause: "8.2", text: "The subscription cannot be paused or terminated due to dissatisfaction. The only method of cancellation is by settling the full outstanding balance of <strong>£1,599.00</strong>." },
            ]} />
          </SectionCard>

          {/* 9 */}
          <SectionCard id="s9" title="9. Contact" muted>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { icon: <Mail size={15} />, label: "Email", value: "support@facesonfaces.com", href: "mailto:support@facesonfaces.com" },
                { icon: <Instagram size={15} />, label: "Instagram", value: "@facesonfaces_" },
                { icon: <Facebook size={15} />, label: "Facebook", value: "@facesonfaces" },
                { icon: <Phone size={15} />, label: "Phone", value: "0800 999 1751", href: "tel:08009991751" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}>
                  <span style={{ color: "#64748b", display: "flex" }}>{item.icon}</span>
                  <span style={{ color: "#94a3b8", minWidth: "70px" }}>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} style={{ color: "#2563eb", textDecoration: "none" }}>{item.value}</a>
                  ) : (
                    <span style={{ color: "#334155" }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 10 */}
          <SectionCard id="s10" title="10. Data protection">
            <ClauseList items={[
              { clause: "10.1", text: "By booking a training course, you agree to allow Faces on Faces Academy to use submitted data for processing your order and for future marketing purposes." },
              { clause: "10.2", text: "Your details will not be shared with any third party without your written consent." },
            ]} />
          </SectionCard>

          {/* 11 */}
          <SectionCard id="s11" title="11. Complaints" muted>
            <ClauseList items={[
              { clause: "11.1", text: "Faces on Faces Academy is committed to providing high-quality service and will make every effort to resolve complaints promptly." },
              { clause: "11.2", text: "Complaints must be submitted in writing to <a href='mailto:support@facesonfaces.com' style='color:#2563eb'>support@facesonfaces.com</a>" },
              { clause: "11.3", text: "Written complaints will be acknowledged within <strong>14 working days</strong> from the date received." },
              { clause: "11.4", text: "Faces on Faces Academy does not offer refunds for courses that have already been undertaken." },
            ]} />
          </SectionCard>

          {/* 12 */}
          <SectionCard id="s12" title="12. Governing law">
            <ClauseList items={[
              { clause: "12.1", text: "This Agreement is governed by and construed in accordance with the laws of England and Wales." },
              { clause: "12.2", text: "Any disputes arising from this Agreement shall be resolved through the appropriate courts of jurisdiction in England and Wales." },
            ]} />

            {/* Signature block */}
            <div
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "0.5px solid #e2e8f0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              {["Provider authorised representative", "Subscriber name & signature"].map((label, i) => (
                <div key={i}>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px", fontWeight: 500 }}>{label}</div>
                  <div style={{ borderBottom: "0.5px solid #94a3b8", height: "36px", marginBottom: "6px" }} />
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>Signature &amp; date</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Footer */}
          <div style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center", padding: "8px 0 4px" }}>
            Faces on Faces Ltd · 50 Brian Road, Romford, England, RM6 5BX · Company no. 13962930
          </div>

        </main>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          aside { display: none !important; }
          div[style*="grid-template-columns: 200px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default SubscriptionsAgreement;