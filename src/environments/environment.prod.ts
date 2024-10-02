export const environment = {
  production: false,

  user:{
    // USER_BASE_URL:'https://fitzee.online/',
    USER_BASE_URL:'http://localhost:3000/',
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
    TRAINER_BASE_URL: `http://localhost:3000/trainer/`,
    LOGIN:'login',
    REGISTRATION:'registration',
    GET_ALL_ITEMS:'getitems',
    GET_TRAINER_BY_ID:'gettrainer', 
    UPDATE_TRAINER: 'updatetrainer',
    INSERT_NEW_DIET: 'setdiet',
    UPDATE_DIET: 'updatediet',
  },
  admin:{
    ADMIN_BASE_URL: `http://localhost:3000/admin/`,
    LOGIN:'login',
    GET_ALL_ITEMS:'getitems',
    GET_PAYMENTS: 'getpayments',
    INSERT_ITEMS:'insertitems',
    EDIT_ITEMS:'updateitems',
    DELETE_ITEMS:'deleteitems',
    GET_DASHBOARD:'getdashboard'
  }
};
