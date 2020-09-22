import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HCyWQFFkI0bf18tGwsJAH90Uad4LhQEOMxg6bALS47ua35EA3I8SRccrl1Yw7hM3gC3hcQVUToXujiRNaZDUorZ00BRTQGh1v";

  const onToken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment successful')
    }).catch(error => {
      console.log('Payment error: ', error)
      alert("There was an issue with your payment. Please make sure you use the provided credit card.");
    })
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
