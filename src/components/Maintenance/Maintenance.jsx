import React, { useEffect, useState } from "react";

const MaintenancePage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countDown = () => {
      const countDay = new Date("December 28, 2024 00:00:00");
      const now = new Date();
      const counter = countDay - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      setTimeLeft({
        days: Math.floor(counter / day),
        hours: Math.floor((counter % day) / hour),
        minutes: Math.floor((counter % hour) / minute),
        seconds: Math.floor((counter % minute) / second),
      });
    };

    const intervalId = setInterval(countDown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=" text-center py-10 text-gray-700">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-5xl mb-4">We&rsquo;ll be back soon!</h1>
        <div>
          <p className="mb-4">
            Sorry for the inconvenience but we&rsquo;re performing some
            maintenance at the moment. If you need to you can always{" "}
            <a
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSBpRjzbCfpHSjPLWnlSwBfzHqFGSmVKxKMJfKxQqdtqgdWQzmJBQTnscMTXLJDdmBqpLXnL"
              className="text-yellow-500 hover:text-gray-200"
            >
              contact us
            </a>
            , otherwise we&rsquo;ll be back online shortly!
          </p>
          <p>&mdash; Dev Team</p>
        </div>
        <div className="flex flex-row items- justify-center gap-5 mt-4">
          <p className="day">{timeLeft.days} Days</p>
          <p className="hour">{timeLeft.hours} Hours</p>
          <p className="minute">{timeLeft.minutes} Minutes</p>
          <p className="second">{timeLeft.seconds} Seconds</p>
        </div>
      </article>
    </div>
  );
};

export default MaintenancePage;
