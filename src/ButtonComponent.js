// ButtonComponent.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonComponent = ({ row, allRows }) => {
  const navigate = useNavigate();
  const shipping = row.row;
  return row.row.Bidding_Option === true ? (
    <button
      onClick={() => {
        const auctionId = row.row.id;
        console.log(`Navigating to /auction/${auctionId}`);
        navigate(`/auction/${auctionId}`, {
          state: { shipping: shipping, rows: allRows },
        });
      }}
    >
      Auction
    </button>
  ) : (
    <div>Closed</div>
  );
};

export default ButtonComponent;
