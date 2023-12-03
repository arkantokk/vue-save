<template>
    <div>
      <p>Referral Code: {{ referralCode }}</p>
      <button @click="sendReferralCode">Send Referral Code</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const referralCode = ref('');
  
      onMounted(() => {
        referralCode.value = route.params.referral;
      });
  
      function sendReferralCode() {
        fetch('http://localhost:3000/send-referral', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ referralCode: referralCode.value }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to send referral code');
          }
          return response.text();
        })
        .then(result => {
          console.log(result); // Confirmation message
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
  
      return { referralCode, sendReferralCode };
    }
  };
  </script>
  