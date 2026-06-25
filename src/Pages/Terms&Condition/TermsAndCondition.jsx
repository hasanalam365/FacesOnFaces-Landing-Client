import React from "react";
import { FileText, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";

const sections = [
  {
    id: "general",
    title: "General Conditions of Booking",
  },
  {
    id: "payment",
    title: "Paying For Your Training Course",
  },
  {
    id: "cancellation",
    title: "Cancelling Your Training Course Booking",
  },
  {
    id: "amendments",
    title: "Amending Your Training Course Booking",
  },
  {
    id: "insurance",
    title: "Insurance & Regulation",
  },
  {
    id: "contact",
    title: "Contact Information",
  },
  {
    id: "data",
    title: "Data Protection",
  },
  {
    id: "complaints",
    title: "Complaints",
  },
];

const TermsAndCondition = () => {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden text-white bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <div className="container px-6 py-24 mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm border rounded-full border-white/20 bg-white/10 backdrop-blur">
              <FileText size={16} />
              Terms & Conditions
            </div>

            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Faces On Faces Academy
              <span className="block text-gray-300">
                Terms & Conditions
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-gray-300">
              Please read these terms carefully before booking any training
              course with Faces On Faces Academy.
            </p>

            <div className="inline-flex px-4 py-2 mt-8 text-sm rounded-full bg-white/10">
              Last Updated: June 2026
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container px-6 py-16 mx-auto">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky p-6 bg-white border shadow-sm top-28 rounded-2xl">
              <h3 className="mb-4 font-semibold">
                Quick Navigation
              </h3>

              <div className="space-y-3">
                {sections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-600 transition hover:text-black"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="space-y-8">
            {/* INTRO */}
            <div className="p-8 border rounded-3xl bg-gray-50">
              <div className="flex items-center gap-3">
               
                <h2 className="text-2xl font-bold">
                1.  About These Terms 
                </h2>
                 <ShieldCheck className="text-green-600" />
              </div>

              <p className="mt-4 leading-relaxed text-gray-700">
               <span className="font-bold">1.1</span> In these terms and conditions “we”, “our”, and “us” refer to Faces on Faces Academy, and “you” and “your” refers to the delegate purchasing a Faces on Faces Academy training course.  
              </p>
            </div>

            {/* GENERAL */}
            <section
              id="general"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
               2. General Conditions of Booking
              </h2>

              <ul className="space-y-4 leading-relaxed text-gray-700">
                <li>
                   <span className="font-bold">2.1</span> Faces On Faces Academy reserves the right to
                  decline admission to any training course.
                </li>

                <li>
                 <span className="font-bold">2.2</span> Faces on Faces Academy reserves the right to cancel or 
                 change planned training courses in terms of dates, locations,
                  and course content. You will be notified in advance of any
                   planning changes and an alternative date will be offered.
                    We will not offer a refund if we need to change the date,
                     location or course content.  
                </li>

                <li>
                 <span className="font-bold">2.3</span> Irrespective of circumstances, 
                 Faces on Faces Academy accepts no liability for any loss of earnings or 
                 expenses incurred by you or any models should a course need to be 
                 cancelled or rearranged.   
                </li>

                <li>
                 <span className="font-bold">2.4</span> You must wear suitable clinic wear in the training academy at all times
                   such as scrubs or a uniform and closed-toe shoes. Denim and sportswear 
                   are not suitable to be worn. Long hair must be tied up, jewellery should
                    be minimum and nails should be cut short, please note, that all clothing 
                    worn by students must be black in colour.   
                </li>

                <li>
                 <span className="font-bold">2.5</span> You must email your ID to us on making your deposit 
                 or full payment, you must also bring the same ID with you such as passport or driving license 
                 to your training course. You will not be permitted to train on the premises without it. 
                </li>

                <li>
                  <span className="font-bold">2.6</span>  If you arrive more than 45 minutes late for the start time of your course you may 
                   not be permitted into the course. No refund will be given, however we may offer you a future date.   
                </li>

                <li>
                  <span className="font-bold">2.7</span> Faces on Faces Academy will provide one model per student at a minimum,
                   this isn’t always guaranteed as time to time models book and don’t turn up, if this was to happen
                    the remaining models will be shared between the students, if this is not satisfactory, 
                    or you want more than one model, students are advised to bring their own models (this must 
                    be booked in advance) Faces On Faces will not be held responsible for any cancellation from
                     models, however if an unfortunate cancellation happens, we will provide an alternative date
                      for the procedures missed. Faces On Faces will not be held responsible for any loss of 
                      earnings or travel expenses if a future date is provided.  
                </li>
                <li>
                  <span className="font-bold">2.8</span> Faces on Faces is a medically run training 
                  academy, our trainers are doctors, nurses and advanced practitioners, on the day
                   we can’t guarantee who you will be trained by, however we do guarantee that the 
                   training provided will be the same no matter who the trainer is and the delivery 
                   of the training will be at the highest level. 
                </li>
                <li>
                  <span className="font-bold">2.9</span> If after 1 month of completing the course  a student 
                  needs an Refresher, this will be charged at 50% rate of the course price, however student
                   are able to bring in models to us for practice, this will be over looked by a professional
                    member of our staff, this service is free and the only cost that will be applied is the 
                    cost of the products. 
                </li>
              </ul>
            </section>

            {/* PAYMENT */}
            <section
              id="payment"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-blue-600" />
                <h2 className="text-2xl font-bold">
                 3. Paying For Your Training Course
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                  <ul className="space-y-4 leading-relaxed text-gray-700">
                <li>
                   <span className="font-bold">3.1</span> You may pay for your training course via Faces payment link.  
                </li>
                <li>
                   <span className="font-bold">3.2</span>  You may pay for your training course in one of two following ways:  
                   <ul className="space-y-4 leading-relaxed text-gray-700">
                    <li> <span className="font-bold">3.2.1</span>  Payment in full – you are required to pay the full price of your course prior to attending your training
                      course. An order confirmation confirming your place will be sent within 24 hours
                       of payment being received in full.
                    </li>
                    <li> <span className="font-bold">3.2.2</span>   Payment scheme – you are required to pay a deposit for your course in order to secure
                     your place on the course date. An order confirmation confirming your place will
                      be sent within 24 hours of us receiving your deposit payment. We will then contact
                       you to arrange your future payment dates for when additional payments can be 
                       taken via the online payment link. 
                    </li>
                   </ul>
                </li>

               <li>  <span className="font-bold">3.3</span>  Your course balance must be paid in full 
               no later than 3 days prior to the course start date. It is then your responsibility to
                ensure that the balance is paid in full at least 3 days before the course date. 
                Failure to do so may result in your course place being cancelled, re-listed for 
                sale and any payment already made may be forfeited in line with our cancellation 
                procedure. 
               </li>
               <li>  <span className="font-bold">3.4</span>  The deposit paid is a non-refundable booking
                fee that is deducted from the total price of the course. The deposit paid cannot 
                be transferred to another practitioner.  
               </li>

              </ul>

      
              </div>
            </section>

            {/* CANCELLATION */}
            <section
              id="cancellation"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-red-500" />
                <h2 className="text-2xl font-bold">
                 4. Cancelling Your Training Course Booking
                </h2>
                
              </div>

             <p>
                  We understand that sometimes plans change and you 
  may need to change your arrangements. Should you wish to cancel your booking, 
  the following terms and conditions apply. 
                </p>
               <ul className="mt-3 space-y-4 leading-relaxed text-gray-700">
<li>
  <span className="font-bold">4.1</span> Courses can be cancelled four weeks in advance of a course.
   All cancellations must be made in writing to info@facesonfaces.com and will incur a 25% admin 
   charge of the full price of the course. This is to cover the cost of f inding models for the
    training day and staffing costs. Courses booked or cancelled within 4 weeks of the course date 
    will not be fully refunded, 50% cancellations fee applies, however we are happy to move students 
    to another date, without any additional costs, providing the course is paid in full. 
</li>
<li>
  <span className="font-bold">4.2</span> Delegates may choose to independently arrange 
  insurance to provide indemnity against possible cancellation. Faces on Faces Academy 
  does not provide any cancellation insurance but recommends that you have your own insurance 
  in place should a course be cancelled at the last minute either by us or you. 
</li>
<li>
  <span className="font-bold">4.3</span> Faces on Faces Academy does not issue refunds for 
  Acts of God. An Act of God is defined as an event outside of human control such as sudden
   floods, earthquakes, or other natural disasters, for which no one can be held responsible.
    This also includes weather- related issues such as snow, ice, floods etc. If Faces on Faces
     Academy chooses to cancel a course due to an Act of God then it is not liable for any 
     loss resulting to the customer as a result of this cancelled course. Faces on Faces Academy
      will make all reasonable efforts to replace a cancelled course by arranging an alternative
       date but this cannot be guaranteed. Where the majority of customers for that course have 
       been affected, this will be made free of additional charge.  
</li>
<li>
  <span className="font-bold">4.4</span>  Courses that include registration with an OFQUAL awarding 
  body can not be cancelled once you have been registered under any circumstances. Once registered 
  the full outstanding balance of your invoice must be paid as per your invoice. Any outstanding 
  invoice balance will be pursued.     
</li>
<li>
  <span className="font-bold">4.5</span>   To exercise the right to cancel, the Student must notify 
  Faces on Faces Academy in writing via email to support@facesonfaces.com before the 14-day 
  cancellation period expires. In such cases, any payments made will be refunded in full, 
  provided that no part of the course has been accessed or attended. If the Student has already 
  accessed digital course content or attended any part of the training before requesting cancellation, 
  this right to cancel may be forfeited under regulation 37 of the Consumer Contracts Regulations. 
  If the student wishes to hold out for 14 day before receiving the course manuals digitally,
   we must be informed in writing, by emailing to support@facesonfaces.com (we would need to be 
   informed of this straight after paying the deposit or the full course payment of the course)     
</li>

               </ul>
             
            </section>

            {/* AMENDMENTS */}
            <section
              id="amendments"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                5. Amending Your Training Course Booking 
              </h2>

               <ul className="space-y-4 leading-relaxed text-gray-700">
<li>
  <span className="font-bold">5.1</span> Should you wish to amend your booking by changing your 
  course date, the following terms and conditions apply:  


<ul className="space-y-4 leading-relaxed text-gray-700">
 <span className="font-bold">5.1.1</span> All requests to change a course date must be made
  in writing to info@facesonfaces.com and will incur an additional 25% admin charge
   of the full price of the course.
</ul>

</li>
              </ul>
            </section>

            {/* INSURANCE */}
            <section
              id="insurance"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Insurance & Regulation
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  Students are covered under the academy group
                  insurance while learning on site.
                </p>

                <p>
                  Students remain responsible for obtaining their
                  own insurance to practice professionally.
                </p>

                <p>
                  Compliance with local legal and regulatory
                  requirements remains the student's
                  responsibility.
                </p>
              </div>
            </section>

            {/* CONTACT */}
            <section
              id="contact"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Contact Information
              </h2>

              <div className="space-y-3 text-gray-700">
                <p>Email: support@facesonfaces.com</p>
                <p>Instagram: @facesonfaces_</p>
                <p>Facebook: @facesonfaces</p>
                <p>Phone: 08009991751</p>
              </div>
            </section>

            {/* DATA */}
            <section
              id="data"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Data Protection
              </h2>

              <p className="leading-relaxed text-gray-700">
                By booking a course, you consent to the use of
                your information for order processing and future
                marketing communications. Your information will
                never be shared with third parties without your
                written consent.
              </p>
            </section>

            {/* COMPLAINTS */}
            <section
              id="complaints"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Complaints
              </h2>

              <p className="leading-relaxed text-gray-700">
                Complaints should be submitted in writing to
                support@facesonfaces.com. Written complaints will
                be acknowledged within 14 working days.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndCondition;