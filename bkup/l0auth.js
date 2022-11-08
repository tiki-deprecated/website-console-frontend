import { LocalScheme } from '~auth/runtime'

const axios = require('axios')

const authServer = 'http://localhost:10502/api/latest'
const DEFAULTS = {
  name: 'local',
  endpoints: {
    login: {
      url: authServer + '/oauth/token',
      method: 'post',
    },
    logout: {
      url: authServer + '/oauth/revoke',
      method: 'post',
    },
    user: false,
  },
  token: {
    property: 'access_token',
    type: 'Bearer',
    name: 'Authorization',
    maxAge: 600,
    global: true,
    required: true,
    prefix: '_token.',
    expirationPrefix: '_token_expiration.',
  },
  user: {
    // property: 'user',
    autoFetch: false,
  },
  clientId: 'console',
  grantType: false,
  scope: false,
}

export default class L0auth extends LocalScheme {
  constructor(auth, options, ...defaults) {
    super(auth, options, ...defaults, DEFAULTS)
  }

  async login(endpoint, reset) {
    if (!this.options.endpoints.login) {
      return
    }
    if (reset) {
      this.$auth.reset({ resetInterceptor: false })
    }

    endpoint.data = new URLSearchParams({
      grant_type: this.options.grantType,
      username: endpoint.params.deviceId,
      password: endpoint.params.otp,
    })

    const rsp = await this.$auth.request(endpoint, this.options.endpoints.login)
    this.updateTokens(rsp)
  }

  async logout(endpoint) {
    if (this.options.endpoints.logout) {
      await this.$auth
        .requestWith(this.name, endpoint, this.options.endpoints.logout)
        .catch(() => {
          //
        })
    }
    return this.$auth.reset()
  }
}

export async function startPasswordless(email) {
  const rsp = await axios
    .post(authServer + '/otp/start', {
      email,
    })
    .catch(function (error) {
      return error.response
    })
  if (rsp !== undefined && rsp.status === 200) {
    return {
      deviceId: rsp.data.deviceId,
      expires: rsp.data.expires,
    }
  }
}
