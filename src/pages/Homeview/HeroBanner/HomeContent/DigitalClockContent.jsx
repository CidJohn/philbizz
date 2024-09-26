import React from "react";
import DigitalClock from "../../../../components/DigitalClock/DigitalClock";

export default function DigitalClockContent() {
  return (
    <React.Fragment>
      <h1 className="text-4xl p-2 font-bold">Digital Clock</h1>
      <div className="z-20 flex shadow border-2 w-full hover:border-blue-700">
        <div className="w-full">
          <DigitalClock />
        </div>
      </div>
    </React.Fragment>
  );
}
