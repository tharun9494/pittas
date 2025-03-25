import axios from 'axios';
import CryptoJS from 'crypto-js';

const MERCHANT_ID = import.meta.env.VITE_PHONEPE_MERCHANT_ID;
const SALT_KEY = import.meta.env.VITE_PHONEPE_SALT_KEY;
const SALT_INDEX = import.meta.env.VITE_PHONEPE_SALT_INDEX;
const API_ENDPOINT = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

interface PaymentRequest {
  amount: number;
  orderId: string;
  userId: string;
  userEmail: string;
  userName: string;
}

export const initiatePayment = async ({
  amount,
  orderId,
  userId,
  userEmail,
  userName
}: PaymentRequest) => {
  try {
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: orderId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${window.location.origin}/payment/callback`,
      redirectMode: 'POST',
      callbackUrl: `${window.location.origin}/api/payment/callback`,
      paymentInstrument: {
        type: 'PAY_PAGE'
      },
      userDetail: {
        name: userName,
        email: userEmail
      }
    };

    // Use browser's btoa function for base64 encoding
    const base64Payload = btoa(JSON.stringify(payload));
    
    // Generate checksum
    const string = `${base64Payload}/pg/v1/pay${SALT_KEY}`;
    const sha256 = CryptoJS.SHA256(string);
    const checksum = `${sha256}###${SALT_INDEX}`;

    const response = await axios.post(API_ENDPOINT, {
      request: base64Payload
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      }
    });

    if (response.data.success) {
      // Redirect to PhonePe payment page
      window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
    } else {
      throw new Error(response.data.message || 'Payment initiation failed');
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    throw error;
  }
};