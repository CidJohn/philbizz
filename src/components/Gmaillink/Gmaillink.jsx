import React from "react";

const GmailLink = ({ threadId, text, onclick }) => {
  const gmailUrl = `https://mail.google.com/mail/u/0/#inbox?${threadId}`;

  return (
    <div>
      <a
        href={gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onclick}
      >
        {text}
      </a>
    </div>
  );
};

export default GmailLink;
