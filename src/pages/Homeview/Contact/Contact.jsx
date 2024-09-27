import React from "react";
import ContactForm from "../../../components/ContactUs/ContactUs";

function Contact() {
  return (
    <div className="flex justify-center">
      <section id="contact" className="max-w-screen-md">
        <ContactForm email={"philtong15@gmail.com"} company={"philbizz"} />
      </section>
    </div>
  );
}

export default Contact;
