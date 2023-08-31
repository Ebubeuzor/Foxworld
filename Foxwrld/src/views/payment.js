import axiosClient from "../axoisClient";

const makePaymentWithFlutterwave = async (apiKey, cartItems) => {
  // Create a header for Flutterwave
  const flutterwaveAuthHeader = `Bearer ${apiKey}`

  // Make the payment request to Flutterwave
  const response = await axiosClient.post('/payment/initiate-multiple', {
    cartItems,
  },
  {
    headers: {
      Authorization: flutterwaveAuthHeader,
    },
  });

  // Check if the payment was successful
  if (response.data.payment_link) {
    // Redirect the user to the payment link
    window.location.href = response.data.payment_link;
  } else {
    // Handle the payment failure
  }
};

export default makePaymentWithFlutterwave;