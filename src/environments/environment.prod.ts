export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: 'AIzaSyDFLuCdGENQaY1X0YIB43P8f5bwo-gW-oo',
    authDomain: 'fitzee-8fb5a.firebaseapp.com',
    projectId: 'fitzee-8fb5a',
    storageBucket: 'fitzee-8fb5a.appspot.com',
    messagingSenderId: '923622423708',
    appId: '1:923622423708:web:d7d3703d76eabc4bc60159',
  },

  razorpayConfig:{
    razorpayKey: 'rzp_test_INdsum2VQ3Iddl'
  },

  user:{
    USER_BASE_URL:'https://fitzee.online/',
    USER_LOGIN:'login',
    GET_USER_BY_ID: `getuserbyid`,
    GET_ITEMS: `getitems`,
    REGISTER:`register`,
    PROFILE_COMPLETION:`profilecompletion`,
    GET_ITEMS_BY_ID:`getitemsbyid`,
    PAYMENT:`payment`,  
    PAYMENT_VERIFY:`paymentverify`
  },
  trainer:{
    TRAINER_BASE_URL: `https://fitzee.online/trainer/`,
    LOGIN:'login',
    REGISTRATION:'registration',
    GET_ALL_ITEMS:'getitems',
    GET_TRAINER_BY_ID:'gettrainer', 
    UPDATE_TRAINER: 'updatetrainer',
    INSERT_NEW_DIET: 'setdiet',
    UPDATE_DIET: 'updatediet',
  },
  admin:{
    ADMIN_BASE_URL: `https://fitzee.online/admin/`,
    LOGIN:'login',
    GET_ALL_ITEMS:'getitems',
    GET_PAYMENTS: 'getpayments',
    INSERT_ITEMS:'insertitems',
    EDIT_ITEMS:'updateitems',
    DELETE_ITEMS:'deleteitems',
    
  }
};
