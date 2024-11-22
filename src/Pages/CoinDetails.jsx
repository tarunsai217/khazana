import React from "react";
import { useParams } from "react-router-dom";

function CoinDetails() {
  const { id } = useParams();

  return <div>CoinDetails {id}</div>;
}

export default CoinDetails;
