import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ECPayCheckout() {
  const router = useRouter();
  const { html } = router.query;

  useEffect(() => {
    if (html) {
      // 將返回的表單 HTML 放入 DOM
      document.getElementById('payment-form-container').innerHTML = decodeURIComponent(html);
      // 自動提交表單
      document.getElementById('_form_aiochk').submit();
    }
  }, [html]);

  return <div id="payment-form-container"></div>;
}
