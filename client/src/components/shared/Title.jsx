import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ title = "WhatsApp", discription = "This is a WhatsApp" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={discription} />
    </Helmet>
  );
};

export default Title;
