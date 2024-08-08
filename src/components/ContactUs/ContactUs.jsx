import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { send } from "emailjs-com";

function ContactForm(props) {
  const { email, company } = props;
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    company: company,
  });
  const { t } = useTranslation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_email: formData.email,
      to_email: email,
      subject: formData.subject,
      message: formData.message,
      companyName: formData.company,
    };

    send(
      "service_eh4kxgl",
      "template_8lerwug",
      templateParams,
      "Fz-gbi6vz8SFHDHd-"
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setFormData({
          email: "",
          subject: "",
          message: "",
          company: company || "",
        });
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900" id="contactus">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          {t("contactus")}
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          {t("contactDisc")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {t("subject")}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder={t("placeholder2")}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={t("placeholder")}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-dark rounded-lg bg-blue-500 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300  transform transition-transform duration-500 hover:scale-95"
          >
            {t("send_message")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
