import React, { useEffect, useRef } from "react";
import { FileText, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";

const sections = [
  { id: "about", title: "1. About These Terms" },
  { id: "general", title: "2. General Conditions" },
  { id: "payment", title: "3. Payment" },
  { id: "cancellation", title: "4. Cancellation" },
  { id: "amendments", title: "5. Amendments" },
  { id: "insurance", title: "6. Insurance & Regulation" },
  { id: "contact", title: "7. Contact" },
  { id: "data", title: "8. Data Protection" },
  { id: "complaints", title: "9. Complaints" },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 96;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};

const SectionCard = ({ id, icon, iconColor, title, children, muted }) => (
  <section
    style={{
      border: "0.5px solid #e2e8f0",
      borderRadius: "16px",
      padding: "28px 32px",
      marginBottom: "20px",
      background: muted ? "#f8fafc" : "#fff",
    }}
  >
    <h2
      id={id}
      style={{
        fontSize: "18px",
        fontWeight: 600,
        color: "#0f172a",
        marginBottom: "18px",
        paddingBottom: "14px",
        borderBottom: "0.5px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        scrollMarginTop: "96px",
      }}
    >
      {icon && (
        <span style={{ color: iconColor, display: "flex" }}>{icon}</span>
      )}
      {title}
    </h2>
    {children}
  </section>
);

const ClauseList = ({ items }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
    {items.map((item, i) => (
      <li key={i} style={{ fontSize: "14.5px", lineHeight: "1.8", color: "#334155" }}>
        <span style={{ fontWeight: 600, color: "#0f172a", marginRight: "6px" }}>{item.clause}</span>
        {item.text}
        {item.sub && (
          <ul style={{ listStyle: "none", padding: "10px 0 0 20px", margin: 0, display: "flex", flexDirection: "column", gap: "10px", borderLeft: "2px solid #e2e8f0", marginTop: "10px" }}>
            {item.sub.map((s, j) => (
              <li key={j} style={{ fontSize: "14px", lineHeight: "1.8", color: "#475569" }}>
                <span style={{ fontWeight: 600, color: "#334155", marginRight: "6px" }}>{s.clause}</span>
                {s.text}
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const TermsAndCondition = () => {
  return (
    <div style={{ background: "#fff", fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" }}>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #000 100%)", color: "#fff", padding: "64px 32px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", fontSize: "13px", border: "0.5px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", marginBottom: "20px" }}>
            <FileText size={14} />
            Terms &amp; Conditions
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "14px" }}>
            Faces On Faces Academy
            <span style={{ display: "block", color: "#94a3b8", fontWeight: 400 }}>Terms &amp; Conditions</span>
          </h1>
          <p style={{ fontSize: "15px", color: "#cbd5e1", maxWidth: "520px", lineHeight: "1.7" }}>
            Please read these terms carefully before booking any training course with Faces On Faces Academy.
          </p>
          <div style={{ display: "inline-block", marginTop: "20px", fontSize: "12px", background: "rgba(255,255,255,0.1)", padding: "4px 14px", borderRadius: "999px" }}>
            Last Updated: June 2026
          </div>
        </div>
      </section>

      {/* BODY */}
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "220px 1fr", gap: "36px" }}>

        {/* SIDEBAR */}
        <aside style={{ position: "sticky", top: "80px", height: "fit-content" }}>
          <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Quick Navigation</p>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#475569", padding: "6px 10px", borderRadius: "8px", lineHeight: "1.4", marginBottom: "2px" }}
                onMouseEnter={e => { e.target.style.background = "#f1f5f9"; e.target.style.color = "#0f172a"; }}
                onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#475569"; }}
              >
                {s.title}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main>

          {/* 1. ABOUT */}
          <SectionCard id="about" icon={<ShieldCheck size={18} />} iconColor="#16a34a" title="1. About These Terms" muted>
            <p style={{ fontSize: "14.5px", lineHeight: "1.8", color: "#334155" }}>
              <span style={{ fontWeight: 600, color: "#0f172a", marginRight: "6px" }}>1.1</span>
              In these terms and conditions "we", "our", and "us" refer to Faces on Faces Academy, and "you" and "your" refers to the delegate purchasing a Faces on Faces Academy training course.
            </p>
          </SectionCard>

          {/* 2. GENERAL */}
          <SectionCard id="general" title="2. General Conditions of Booking">
            <ClauseList items={[
              { clause: "2.1", text: "Faces On Faces Academy reserves the right to decline admission to any training course." },
              { clause: "2.2", text: "Faces on Faces Academy reserves the right to cancel or change planned training courses in terms of dates, locations, and course content. You will be notified in advance of any planning changes and an alternative date will be offered. We will not offer a refund if we need to change the date, location or course content." },
              { clause: "2.3", text: "Irrespective of circumstances, Faces on Faces Academy accepts no liability for any loss of earnings or expenses incurred by you or any models should a course need to be cancelled or rearranged." },
              { clause: "2.4", text: "You must wear suitable clinic wear in the training academy at all times such as scrubs or a uniform and closed-toe shoes. Denim and sportswear are not suitable to be worn. Long hair must be tied up, jewellery should be minimum and nails should be cut short, please note, that all clothing worn by students must be black in colour." },
              { clause: "2.5", text: "You must email your ID to us on making your deposit or full payment, you must also bring the same ID with you such as passport or driving license to your training course. You will not be permitted to train on the premises without it." },
              { clause: "2.6", text: "If you arrive more than 45 minutes late for the start time of your course you may not be permitted into the course. No refund will be given, however we may offer you a future date." },
              { clause: "2.7", text: "Faces on Faces Academy will provide one model per student at a minimum, this isn't always guaranteed as time to time models book and don't turn up, if this was to happen the remaining models will be shared between the students, if this is not satisfactory, or you want more than one model, students are advised to bring their own models (this must be booked in advance) Faces On Faces will not be held responsible for any cancellation from models, however if an unfortunate cancellation happens, we will provide an alternative date for the procedures missed. Faces On Faces will not be held responsible for any loss of earnings or travel expenses if a future date is provided." },
              { clause: "2.8", text: "Faces on Faces is a medically run training academy, our trainers are doctors, nurses and advanced practitioners, on the day we can't guarantee who you will be trained by, however we do guarantee that the training provided will be the same no matter who the trainer is and the delivery of the training will be at the highest level." },
              { clause: "2.9", text: "If after 1 month of completing the course a student needs a Refresher, this will be charged at 50% rate of the course price, however students are able to bring in models to us for practice, this will be over looked by a professional member of our staff, this service is free and the only cost that will be applied is the cost of the products." },
            ]} />
          </SectionCard>

          {/* 3. PAYMENT */}
          <SectionCard id="payment" icon={<CreditCard size={18} />} iconColor="#2563eb" title="3. Paying For Your Training Course">
            <ClauseList items={[
              { clause: "3.1", text: "You may pay for your training course via Faces payment link." },
              {
                clause: "3.2", text: "You may pay for your training course in one of two following ways:",
                sub: [
                  { clause: "3.2.1", text: "Payment in full – you are required to pay the full price of your course prior to attending your training course. An order confirmation confirming your place will be sent within 24 hours of payment being received in full." },
                  { clause: "3.2.2", text: "Payment scheme – you are required to pay a deposit for your course in order to secure your place on the course date. An order confirmation confirming your place will be sent within 24 hours of us receiving your deposit payment. We will then contact you to arrange your future payment dates for when additional payments can be taken via the online payment link." },
                ]
              },
              { clause: "3.3", text: "Your course balance must be paid in full no later than 3 days prior to the course start date. It is then your responsibility to ensure that the balance is paid in full at least 3 days before the course date. Failure to do so may result in your course place being cancelled, re-listed for sale and any payment already made may be forfeited in line with our cancellation procedure." },
              { clause: "3.4", text: "The deposit paid is a non-refundable booking fee that is deducted from the total price of the course. The deposit paid cannot be transferred to another practitioner." },
            ]} />
          </SectionCard>

          {/* 4. CANCELLATION */}
          <SectionCard id="cancellation" icon={<AlertCircle size={18} />} iconColor="#dc2626" title="4. Cancelling Your Training Course Booking">
            <p style={{ fontSize: "14.5px", lineHeight: "1.8", color: "#64748b", marginBottom: "16px" }}>
              We understand that sometimes plans change and you may need to change your arrangements. Should you wish to cancel your booking, the following terms and conditions apply.
            </p>
            <ClauseList items={[
              { clause: "4.1", text: "Courses can be cancelled four weeks in advance of a course. All cancellations must be made in writing to info@facesonfaces.com and will incur a 25% admin charge of the full price of the course. This is to cover the cost of finding models for the training day and staffing costs. Courses booked or cancelled within 4 weeks of the course date will not be fully refunded, 50% cancellations fee applies, however we are happy to move students to another date, without any additional costs, providing the course is paid in full." },
              { clause: "4.2", text: "Delegates may choose to independently arrange insurance to provide indemnity against possible cancellation. Faces on Faces Academy does not provide any cancellation insurance but recommends that you have your own insurance in place should a course be cancelled at the last minute either by us or you." },
              { clause: "4.3", text: "Faces on Faces Academy does not issue refunds for Acts of God. An Act of God is defined as an event outside of human control such as sudden floods, earthquakes, or other natural disasters, for which no one can be held responsible. This also includes weather-related issues such as snow, ice, floods etc. If Faces on Faces Academy chooses to cancel a course due to an Act of God then it is not liable for any loss resulting to the customer as a result of this cancelled course. Faces on Faces Academy will make all reasonable efforts to replace a cancelled course by arranging an alternative date but this cannot be guaranteed. Where the majority of customers for that course have been affected, this will be made free of additional charge." },
              { clause: "4.4", text: "Courses that include registration with an OFQUAL awarding body can not be cancelled once you have been registered under any circumstances. Once registered the full outstanding balance of your invoice must be paid as per your invoice. Any outstanding invoice balance will be pursued." },
              { clause: "4.5", text: "To exercise the right to cancel, the Student must notify Faces on Faces Academy in writing via email to support@facesonfaces.com before the 14-day cancellation period expires. In such cases, any payments made will be refunded in full, provided that no part of the course has been accessed or attended. If the Student has already accessed digital course content or attended any part of the training before requesting cancellation, this right to cancel may be forfeited under regulation 37 of the Consumer Contracts Regulations. If the student wishes to hold out for 14 days before receiving the course manuals digitally, we must be informed in writing, by emailing to support@facesonfaces.com (we would need to be informed of this straight after paying the deposit or the full course payment of the course)." },
            ]} />
          </SectionCard>

          {/* 5. AMENDMENTS */}
          <SectionCard id="amendments" title="5. Amending Your Training Course Booking">
            <ClauseList items={[
              {
                clause: "5.1", text: "Should you wish to amend your booking by changing your course date, the following terms and conditions apply:",
                sub: [
                  { clause: "5.1.1", text: "All requests to change a course date must be made in writing to info@facesonfaces.com and will incur an additional 25% admin charge of the full price of the course." },
                  { clause: "5.1.2", text: "Faces on Faces Academy cannot guarantee you a place on your chosen alternative course date. If a place cannot be provided on your preferred date, you will be offered a refund in line with the terms and conditions in Section 4 of this document (should this apply). This is at the discretion of Faces on Faces Academy." },
                  { clause: "5.1.3", text: "We may not be able to offer you a new date and the original date will need to stay booked." },
                  { clause: "5.1.4", text: "You are not able to transfer the course to another practitioner." },
                ]
              },
            ]} />
          </SectionCard>

          {/* 6. INSURANCE */}
          <SectionCard id="insurance" title="6. Insurance and Regulation">
            <ClauseList items={[
              { clause: "6.1", text: "Whilst learning on premises at Faces on Faces Academy you will be covered by our group insurance policy." },
              { clause: "6.2", text: "You are responsible for ensuring you can gain appropriate insurance cover to work in your own country you wish to practice. Faces on Faces Academy does not offer refunds if you find you are not able to gain appropriate insurance, or if an insurer declines or terminates your insurance." },
              { clause: "6.3", text: "You are responsible for ensuring that you comply with statutory and legal obligations in the country that you practice including but not limited to CQC, HIS, and HIW. Contacting Faces on Faces Academy." },
            ]} />
          </SectionCard>

          {/* 7. CONTACT */}
          <SectionCard id="contact" title="7. Contacting Faces on Faces Academy">
            <p style={{ fontSize: "14.5px", lineHeight: "1.8", color: "#64748b", marginBottom: "16px" }}>
              You can contact Faces on Faces Academy in any one of the following ways:
            </p>
            <ClauseList items={[
              { clause: "7.1", text: "Email: support@facesonfaces.com" },
              { clause: "7.2", text: "Facebook: @facesonfaces" },
              { clause: "7.3", text: "Phone: +44 7308 888874" },
            ]} />
          </SectionCard>

          {/* 8. DATA */}
          <SectionCard id="data" title="8. Data Protection">
            <ClauseList items={[
              { clause: "8.1", text: "In booking a training course with Faces on Faces Academy, you agree to us using any data you submit in order to process your order and for future marketing purposes by Faces on Faces Academy." },
              { clause: "8.2", text: "Your details will not be transferred to any other third party without your written consent." },
            ]} />
          </SectionCard>

          {/* 9. COMPLAINTS */}
          <SectionCard id="complaints" title="9. Complaints">
            <ClauseList items={[
              { clause: "9.1", text: "Faces on Faces Academy takes pride in the quality of its service and as such will try to resolve any complaints as quickly as possible." },
              { clause: "9.2", text: "Complaints about any aspect of Faces on Faces Academy should be made in writing by emailing support@facesonfaces.com" },
              { clause: "9.3", text: "Complaints received in writing will be acknowledged by return email or letter within 14 working days from the written date of the complaint." },
              { clause: "9.4", text: "Faces on Faces Academy does not offer refunds for training courses undertaken." },
            ]} />
          </SectionCard>

        </main>
      </div>

      {/* RESPONSIVE SIDEBAR HIDE */}
      <style>{`
        @media (max-width: 700px) {
          aside { display: none !important; }
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default TermsAndCondition;