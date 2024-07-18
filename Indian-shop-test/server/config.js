require("dotenv").config(); // Load environment variables from .env

module.exports = {
  getOtpMaxDigit: () => {
    return process.env.OTP_MAX_DIGIT;
  },
  getMongoDbUrl: () => {
    return process.env.MONGO_DB_URL;
  },
  getMongoDbName: () => {
    return process.env.MONGO_DB_NAME;
  },
  getEmailServiceProvider: () => {
    return process.env.EMAIL_SERVICE_PROVIDER;
  },
  getEmailServiceProviderSmtpHost: () => {
    return process.env.EMAIL_SERVICE_PROVIDER_SMTP_HOST;
  },
  getEmailServiceProviderSmtpPort: () => {
    return process.env.EMAIL_SERVICE_PROVIDER_SMTP_PORT;
  },
  getEmailSenderId: () => {
    return process.env.EMAIL_SENDER_ID;
  },
  getEmailSenderPwd: () => {
    return process.env.EMAIL_SENDER_PWD;
  },
  getJwtSecret: () => {
    return process.env.JWT_SECRET;
  },
  getJwtExpiresTime: () => {
    return process.env.JWT_EXPIRES_IN;
  },
  getFrontendUrl: () => {
    return process.env.FRONTEND_APP;
  },
  getNutritionixSearchUrl: () => {
    return process.env.NUTRITIONIX_SEARCH_URl;
  },
  getNutritionixNutrientsUrl: () => {
    return process.env.NUTRITIONIX_NUTRIENTS_URl;
  },
  getNutritionixBrandedNutrientsUrl: () => {
    return process.env.NUTRITIONIX_BRANDED_NUTRIENTS_URl;
  },
  getNutritionixAppId: () => {
    return process.env.NUTRITIONIX_APP_ID;
  },
  getNutritionixAppKey: () => {
    return process.env.NUTRITIONIX_APP_KEY;
  },
  getTerraDevId: () => {
    return process.env.TERRA_DEV_ID;
  },
  getTerraApiKey: () => {
    return process.env.TERRA_API_KEY;
  },
  getTerraConnectWidgetSessionUrl: () => {
    return process.env.TERRA_CONNECT_WIDGET_SESSION_URL;
  },
  getTerraConnectDeviceSessionUrl: () => {
    return process.env.TERRA_CONNECT_DEVICE_SESSION_URL;
  },
  getTerraDeRegisterDeviceUrl: () => {
    return process.env.TERRA_DE_REGISTER_DEVICE_URL;
  },
  getOpenaiApiKey: () => {
    return process.env.OPENAI_API_KEY;
  },
  getOpenaiChatCompletionUrl: () => {
    return process.env.OPENAI_CHAT_COMPLETION_URL;
  },
  getTerraAuthSuccessRedirectUrl: () => {
    return process.env.TERRA_AUTH_SUCCESS_REDIRECT_URL;
  },
  getTerraAuthRegisterSuccessRedirectUrl: () => {
    return process.env.TERRA_AUTH_SUCCESS_REGISTRATION_REDIRECT_URL;
  },
  getStripeAfterCompletionRedirectUrl: () => {
    return process.env.STRIPE_AFTER_COMPLETION_REDIRECT_URL;
  },
  getNewUserSignUpUrl: () => {
    return process.env.NEW_USER_SIGNUP_URL;
  },
  getValidateNpiUrl: () => {
    return process.env.VALIDATE_NPI_URL;
  },
  getGoogleAddressValidationUrl: () => {
    return process.env.GOOGLE_ADDRESS_API_URL;
  },
};
