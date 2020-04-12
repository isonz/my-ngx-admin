import {NbAuthJWTToken, NbAuthSocialLink, NbPasswordAuthStrategy} from '@nebular/auth';

const socialLinks: NbAuthSocialLink[] = [];


export const defaultAuthOptions: any = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'username',
      baseEndpoint: '/api/',
      login: {
        method: 'post',
        endpoint: 'auth/login',
      },
      register: {
        method: 'post',
        endpoint: 'auth/register',
      },
      token: {
        class: NbAuthJWTToken,
        key: 'data.token',
      },
      errors: {
        key: 'error.message',
      },
    }),
  ],
  forms: {
    login: {
      redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
      strategy: 'username',  // provider id key. If you have multiple strategies, or what to use your own
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      },
      socialLinks: socialLinks, // social links at the bottom of a page
    },
    register: {
      redirectDelay: 500,
      strategy: 'username',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
      socialLinks: socialLinks,
    },
    requestPassword: {
      redirectDelay: 500,
      strategy: 'username',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    resetPassword: {
      redirectDelay: 500,
      strategy: 'username',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    logout: {
      redirectDelay: 500,
      strategy: 'username',
    },

    validation: {
      username: {
        required: true,
        minLength: 4,
        maxLength: 30,
      },
      password: {
        required: true,
        minLength: 6,
        maxLength: 30,
      },
    },
  },
};

