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
       {item.bulletList && (
  <div
    style={{
      marginTop: "12px",
      padding: "14px 16px",
      border: "1px solid #cbd5e1",
      borderRadius: "10px",
      background: "#f8fafc",
    }}
  >
    <div
      style={{
        fontWeight: 600,
        color: "#0f172a",
        marginBottom: "10px",
      }}
    >
      Fast Track Course
    </div>

    <ul
      style={{
        margin: 0,
        paddingLeft: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0,1fr))",
        gap: "6px 24px",
      }}
    >
      {item.bulletList.map((course, index) => (
        <li
          key={index}
          style={{
            color: "#475569",
            fontSize: "13px",
            lineHeight: "1.8",
          }}
        >
          {course}
        </li>
      ))}
    </ul>
  </div>
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
                text: ` This Subscription Agreement ("Agreement") is made and entered into by and between:  [Faces on Faces] referred to as ("Provider"), with its principal place of business at Little malgraves hall Lower dunton road Bulphan Upminster RM143TD, and  [Name]  referred to as ("Subscriber" or "Student"), with an address at: `,
              },
            ]} />
          </SectionCard>

          {/* 2 */}
          <SectionCard id="s2" title="2. General conditions of booking">
            <ClauseList items={[
              { clause: "2.1", text: " Faces on Faces Academy reserves the right to decline admission to any of its training courses. " },
              { clause: "2.2", text: "Faces on Faces Academy reserves the right to modify or cancel scheduled training courses, including changes to dates, locations, and course content. Subscribers will be notified in advance of any such changes and offered an alternative date. No refunds will be issued for changes to the date, location, or course content.  " },
              { clause: "2.3", text: " Regardless of the circumstances, Faces on Faces Academy is not liable for any loss of earnings or expenses incurred by the Subscriber or any models in the event of a course cancellation or rescheduling. " },
              { clause: "2.4", text: " Subscribers must wear appropriate clinic attire at all times while in the training academy, including scrubs or a uniform and closed-toe shoes. Denim and sportswear are not permitted.  Long hair must be tied back, jewelry should be kept to a minimum, and nails must be short. Additionally, all clothing worn by the Subscriber must be black in color" },
              { clause: "2.5", text: "Subscriber must email two forms of ID to the Provider on making their deposit or full payment, Subscriber must also bring the same ID such as a passport or driving license for picture ID and a utility bill for address ID, to the training course. Subscriber will not be permitted to train on the premises without it. " },
              { clause: "2.6", text: " If the Subscriber arrives more than 45 minutes late for the course start time, they may not be permitted to attend. No refund will be issued; however, a rescheduled date may be offered at the Provider's discretion. " },
              { clause: "2.7", text: " Faces on Faces Academy will provide at least one model per student; however, this cannot always be guaranteed, as models occasionally book but fail to attend. In such cases, the remaining models will be shared among students. If this is not satisfactory or if additional models are required, students are encouraged to bring their own models, which must be booked in advance. Faces on Faces Academy is not responsible for any cancellations by models. However, if a cancellation occurs, an alternative date will be offered for the missed procedures. The academy will not be held liable for any loss of earnings or travel expenses incurred due to rescheduling.   " },
              { clause: "2.8", text: "Faces on Faces Academy is a medically-led training institution where trainers include doctors, nurses, and advanced practitioners. While we cannot guarantee which specific trainer will be assigned to the Subscriber on the day of their training, Faces on Faces will assure that all training will be delivered at the highest standard. Regardless of the trainer, the quality and level of instruction will remain consistent and professional." },
              { clause: "2.9", text: "If a Subscriber wishes to undertake a refresher course more than one month after completing their original training, this may be offered at 50% of the original course price. Payment for the refresher must be made in full at the time of booking and cannot be included within the ongoing subscription payment plan. Subscribers may, as an optional support service, arrange to bring their own models to the clinic for supervised practical sessions. These sessions shall be conducted under the supervision of a qualified member of the Faces on Faces Academy team. Participation in such sessions shall be subject to a nominal fee, and all bookings must be made in advance through a designated representative of the Faces on Faces Academy. This service is offered solely at the discretion of the Academy and is subject to availability.  " },
            ]} />
          </SectionCard>

          {/* 3 */}
          <SectionCard id="s3" title="3. Subscription Terms  " muted>
            <ClauseList items={[
             {
  clause: "3.1",
  text: "The Subscriber agrees to enroll in a monthly subscription plan for access to training courses provided by the Provider, Faces on Faces Academy. Under this agreement, the Subscriber is enrolled in the following course:",
  bulletList: [
    "• Infection Control",
    "• Safety in Medicine",
    "• Anatomy & Physiology Level 3",
    "• Complications Management",
    "• Health & Safety",
    "• Microneedling",
    "• Skin Booster",
    "• Lumi Eye",
    "• Polynucleotide",
    "• Fat Dissolver",
    "• Vitamin B12",
    "• Foundation Dermal Filler",
    "• Use of Hyaluronidase",
    "• Foundation Anti-Wrinkle",
  ],
},
              {
                clause: "",
                text: "Access to these modules is granted as part of the subscription model, subject to the terms and conditions outlined in this agreement.  ",
              },
              {
                clause: "3.2",
                text: " The Subscriber agrees to pay an initial fee of £250 GBP upon signing this agreement, which covers administrative costs, model arrangements, and account setup. In addition, the first monthly subscription installment of £100 GBP is to be paid in advance.   ",
              },
               {
                clause: "",
                text: "Thereafter, a recurring monthly payment of £100 GBP will be collected via direct debit through the Provider’s authorised payment processor, GoCardless. The monthly collection date shall be set and confirmed upon subscription activation. Timely payments are a condition of continued access to the services provided under this agreement. ",
              },
               {
                clause: "3.3",
                text: "Right to Cancel Under Consumer Contracts Regulations  Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, Subscribers who enter into this agreement via distance means (such as online or over the phone) have the right to cancel this agreement within fourteen (14) days from the date of signing, without giving any reason.",
              },
               {
                clause: "",
                text: "To exercise the right to cancel, the Subscriber must notify Faces on Faces Academy in writing via email to support@facesonfaces.com before the 14-day cancellation period expires. In such cases, any payments made will be refunded in full, provided that no part of the course has been accessed or attended. If the Subscriber has already accessed digital course content or attended any part of the training before requesting cancellation, this right to cancel may be forfeited under regulation 37 of the Consumer Contracts Regulations. If the subscriber  wishes to hold out for 14 day before receiving the course manuals digitally, we must be informed in writing, by emailing to support@facesonfaces.com (we would need to be informed of this straight after paying the deposit or the full course payment of the course)",
              },
               {
                clause: "",
                text: "After this 14-day cooling-off period, all payments become non-refundable, and the terms outlined in this agreement will apply in full. ",
              },
               {
                clause: "",
                text: "Access to this agreement.  ",
              },
              
            ]} />
          </SectionCard>

          {/* 4 */}
          <SectionCard id="s4" icon={<CreditCard size={18} />} iconColor="#2563eb" title="4. Payment & billing">
            <Warning>The £250 initial deposit is non-refundable and is not deducted from the main course fee.</Warning>
            <ClauseList items={[
              
             {
                clause: "4.1",
                text: "The subscription fee shall be deducted automatically on a monthly basis from the payment method provided by the Subscriber.",
              },
             {
                clause: "4.2",
                text: "The subscription is non-refundable once services have been delivered” , and payments are due regardless of course completion or dissatisfaction with the service. ",
              },
             {
                clause: "4.3",
                text: "The Subscriber may choose to cancel the subscription at any time by providing written notice. However, upon cancellation, the full remaining balance of the course fee will become immediately due and payable. The total amount payable upon cancellation will be £1,599",
              },
             {
                clause: "4.4",
                text: "To begin the subscription process and secure a course booking, an initial deposit of £250 GBP along with the first subscription payment of £100 GBP is required. This fee covers administrative costs, model arrangements, and the setup of the subscription account. The £250 GBP is a non- refundable payment and will not be reduced from the main course fee.",
              },
             {
                clause: "4.5",
                text: "If the Subscriber fails to make a scheduled payment, a late payment fee of £40 GBP will be added to the next payment collection. In the event that two consecutive monthly payments are missed, the Provider reserves the right to cancel this agreement and the full outstanding balance of £250 shall become due. “Upon cancellation by the Subscriber, the Provider shall be entitled to recover  a cancellation charge reflecting the genuine loss suffered, including but not limited to loss of a reserved course place, administrative costs, and lost opportunity to resell the course at full value. ",
              },
             {
                clause: "",
                text: "The Subscriber acknowledges and agrees that, by securing a place in the course on a specific date, the course seat becomes unavailable for resale to other potential participants. As such, should the Subscriber access or reserve this place, and it cannot reasonably be reassigned, the company will incur a genuine loss equivalent to the full course fee. Therefore, the Subscriber will be liable for an amount up to the full course fee of £1,599 to cover this loss. ",
              },
             {
                clause: "",
                text: "”If the outstanding balance is not paid within fourteen (14) days from the cancellation date, a penalty fee amounting to 20% of the total balance will be added, this fee is charged due to an genuine loss of income caused by the additional time and effort spent on staff following up on late payments. If payment remains outstanding thirty (30) days after the cancellation date, the matter will be referred to the Provider’s legal team for recovery through the Small Claims Court. This action will incur additional legal costs, which will be added to the Subscriber’s outstanding balance. The Subscriber agrees that any changes occurring from a debt collection company or bailiff will be charged to the Subscriber and will be added to the outstanding balance for recovery.",
              },
             {
                clause: "",
                text: "The Subscriber acknowledges that failure to settle the debt may result in a County Court Judgment (CCJ) being recorded against their name, which could adversely affect their credit rating and ability to obtain future credit from financial institutions. ",
              },
            ]} />
          </SectionCard>

          {/* 5 */}
          <SectionCard id="s5" title="5. Course Access and Certification " muted>
            <ClauseList items={[
              {
                clause: "5.1",
                text: "The Subscriber will have access to courses under this subscription model, with course certificates remaining the property of Faces on Faces Academy. Upon cancellation of the subscription in accordance with the subscription terms, ownership of the certificates will transfer to the Subscriber providing the full amount of £1,599 is paid. If the certificates are needed for insurance purposes or to obtain products, Faces On Faces will email the certificate as proof to the relevant governing bodies. By you not holding a copy of the certificates, doesn’t effect your rights to practice as a practitioner for the above passed subjects. Faces On Faces hold proof of you passing the above course, where and when needed Faces On Faces will provide proof of your certifications to the relevant bodies. ",
              },
              {
                clause: "5.2",
                text: "The subscription grants access to select courses, with the option to add additional courses provided that the Subscriber maintains an uninterrupted subscription with no missed payments. The Subscriber has a capped subscription limit of £3,000, anything above £3,000 would need to be paid in full before the subscription can start. ",
              },
             
            ]} />
          </SectionCard>

          {/* 6 */}
          <SectionCard id="s6" title="6. Amendments and Modifications ">
            <ClauseList items={[
               {
                clause: "6.1",
                text: "The Provider reserves the right to amend the terms of this Agreement as necessary, including but not limited to payment terms, payment dates, payment amounts where additional courses have been selected, and the scope of course offerings. In the event that the Subscriber opts to add any additional courses, the revised costs and associated details shall be communicated to the Subscriber in writing via email. Such correspondence shall constitute an official addendum to this Agreement. All amendments will be communicated to the Subscriber with reasonable notice and shall be deemed binding unless otherwise objected to in writing within seven (7) days of notification.",
              },
               {
                clause: "6.2",
                text: "If the Subscriber wishes to amend their course booking by changing the course dates, the following terms and conditions shall apply:",
              },
               {
                clause: "6.3",
                text: "All requests to change a course date must be submitted in writing to info@facesonfaces.com and will incur an additional £250 GPB administration fee per course. ",
              },
               {
                clause: "6.4",
                text: "Faces on Faces Academy does not guarantee availability for the Subscriber’s preferred alternative course date. In the event that a place cannot be secured on the agreed date, the Provider will offer an alternative course dates. If the alternative dates are not acceptable to the Subscriber, with a reasonable reason, the Subscriber shall be entitled to a full refund of any payments made under this agreement, and the subscription will be cancelled without penalty.",
              },
               {
                clause: "6.5",
                text: "In some cases, the provider may be unable to offer a new date, in which case the original date will remain booked.",
              },
               {
                clause: "6.6",
                text: "Course bookings are non-transferable to another practitioner.  ",
              },
               
            ]} />
          </SectionCard>

          {/* 7 */}
          <SectionCard id="s7" title="7. Insurance Legislative and Regulatory Compliance" muted>
            <ClauseList items={[
             {
                clause: "7.1",
                text: "While learning on the premises at Faces on Faces Academy, Students will be covered by our group insurance policy provided by Beauty Insured. ",
              },
             {
                clause: "",
                text: "It is the Subscriber’s sole responsibility to obtain appropriate insurance coverage to legally practice in the country where they intend to operate. Faces on Faces Academy will not issue any refunds if the Subscriber is unable to secure suitable insurance, or if their insurance is declined or terminated by their provider.",
              },
             {
                clause: "",
                text: "This condition does not affect the validity of this Agreement, which will remain in force until formally cancelled in accordance with the terms outlined herein. The Subscriber agrees to provide a copy of their insurance certificate to the Provider within fourteen (14) days of obtaining coverage. Failure to submit this documentation within the stated timeframe may result in the suspension or cancellation of the subscription. ",
              },
             {
                clause: "",
                text: "Should the Subscriber choose to delay practicing and therefore not obtain insurance immediately, they must notify the Provider in writing by sending an email to support@facesonfaces.com.",
              },
             {
                clause: "7.2",
                text: "If the Subscriber remains uninsured for a period exceeding three (3) months, the Provider reserves the right to cancel the subscription, and the full outstanding balance shall become immediately payable under the cancellation terms of this Agreement.",
              },
             {
                clause: "7.3",
                text: "Subscribers are responsible for ensuring compliance with all statutory and legal obligations in the country where they practice, including, but not limited to, CQC, HIS, and HIW regulations. ",
              },
             {
                clause: "7.4",
                text: "The subscriber  acknowledges and agrees that it is their sole responsibility to remain informed of, and comply with, all applicable laws, regulations, and professional guidelines relevant to the provision of aesthetic treatments. Faces on Faces shall not be held liable for any non-compliance by the Practitioner with current or future legislative or regulatory changes. Any changes in law or regulation shall not impose any additional liability or obligation on Faces on Faces. The subscriber must ensure that their practice remains compliant at all times, including but not limited to obtaining and maintaining all necessary licences, registrations, and insurance.  ",
              },
            
             
            ]} />
          </SectionCard>

          {/* 8 */}
          <SectionCard id="s8" icon={<AlertCircle size={18} />} iconColor="#dc2626" title="8. Cancellation and Termination">
            <ClauseList items={[
              {
                clause: "8.1",
                text: "The Subscriber may cancel the subscription at any time but must settle any outstanding balance for all courses accessed before cancellation can be finalized. “Upon cancellation by the Subscriber, the Provider shall be entitled to recover a reasonable cancellation charge reflecting the genuine loss suffered, including but not limited to loss of a reserved course place, administrative costs, and lost opportunity to resell the course at full value.",
              },
               {
                clause: "",
                text: "Where the Subscriber has accessed or been allocated a course place that cannot reasonably be resold, this charge will be up to the full course fee of £1,599.” ",
              },
               {
                clause: "8.2",
                text: "The subscription must remain active and cannot be paused or terminated due to dissatisfaction with courses or any related issues. The only method of cancellation is by settling the full outstanding balance of £1 599.00 ",
              },
               
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
          <SectionCard id="s10" title="10. Data Protection">
            <ClauseList items={[
              {
                clause: "10.1",
                text: "By booking a training course with Faces on Faces Academy, the Subscriber agrees to allow Faces on Faces Academy to use any submitted data for processing the Subscribers order and for future marketing purposes.",
              },
              {
                clause: "10.2",
                text: "Subscriber details will not be shared with any third party without their written consent. ",
              },
              
            ]} />
          </SectionCard>

          {/* 11 */}
          <SectionCard id="s11" title="11. Complaint Procedure" muted>
            <ClauseList items={[
              {
                clause: "11.1",
                text: "Faces on Faces Academy is committed to providing high-quality service and will make every effort to resolve any complaints promptly.  ",
              },
              {
                clause: "11.2",
                text: "Any complaints regarding Faces on Faces Academy should be submitted in writing via email to support@facesonfaces.com ",
              },
              {
                clause: "11.3",
                text: "Complaints submitted in writing will be acknowledged by email or letter within 14 working days from the date the complaint was received. ",
              },
              {
                clause: "11.4",
                text: "Faces on Faces Academy does not offer refunds for courses that have already been undertaken.",
              },
              
            ]} />
          </SectionCard>

          {/* 12 */}
          <SectionCard id="s12" title="12. Governing Law">
            <ClauseList items={[
              {
                clause: "12.1",
                text: "This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction].",
              },
              {
                clause: "12.2",
                text: "Any disputes arising from or related to this Agreement shall be resolved through [Dispute Resolution Method, e.g., Arbitration or Court Jurisdiction].",
              },
              {
                clause: "",
                text: "By signing below, both parties acknowledge and agree to the terms set forth in this Agreement.  ",
              },
              
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