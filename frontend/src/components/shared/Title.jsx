import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ title = "Chat App", discription = "The is a Chat Aoo" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={discription} />
    </Helmet>
  );
};

export default Title;
