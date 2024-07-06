// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function ECPayCheckout() {
//   const router = useRouter();
//   const { html } = router.query;

//   useEffect(() => {
//     if (html) {
//       // 將返回的表單 HTML 放入 DOM
//       document.getElementById('payment-form-container').innerHTML = decodeURIComponent(html);
//       // 自動提交表單
//       document.getElementById('_form_aiochk').submit();
//     }
//   }, [html]);

//   return <div id="payment-form-container"></div>;
// }
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ECPayCheckout() {
  const router = useRouter();
  const { html } = router.query;

  useEffect(() => {
    const handlePaymentSubmission = () => {
      if (html) {
        // Decode the HTML received from the query parameter
        const decodedHtml = decodeURIComponent(html);
        
        // Render the payment form HTML received from the server
        const paymentFormContainer = document.getElementById('payment-form-container');
        if (paymentFormContainer) {
          paymentFormContainer.innerHTML = decodedHtml;

          // Auto-submit the form using JavaScript
          const paymentForm = document.getElementById('_form_aiochk');
          if (paymentForm) {
            paymentForm.submit();
          }
        }
      }
    };

    handlePaymentSubmission();
  }, [html]);

  return <div id="payment-form-container"></div>;
}
