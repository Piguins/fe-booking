import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const PaypalCheckoutButton = ({ product, dates }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("authToken");

    if (storedAccessToken) {
      setToken(storedAccessToken);
    }
  }, []);

  console.log(token);

  const { startDate, endDate } = dates[0];
  const { bedCount, floor } = product;

  const handleApprove = async (orderID, auth) => {
    // call be`

    const params = {
      fromDate: startDate.toISOString(),
      toDate: endDate.toISOString(),
      bedCount,
      floor,
      orderId: orderID,
    };

    await axios.post("http://localhost:8080/api/bookings", params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });
    setPaidFor(true);

    if (paidFor) {
      alert("thank you for your booking");
    }
    if (error) {
      alert(error);
    }
  };
  return (
    <PayPalButtons
      createOrder={(data, action) => {
        return action.order.create({
          purchase_units: [
            {
              description: product.title,
              amount: {
                value: product.priceAmount,
              },
            },
          ],
        });
      }}
      onApprove={async (data, action) => {
        const order = await action.order.capture();
        console.log("order", order);
        handleApprove(data.orderID, token);
      }}
      onError={(err) => {
        setError(err);
        console.log("checkout error", err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
