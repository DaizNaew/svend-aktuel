<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Login Vindue</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
      <f7-nav-title-large>Login Vindue</f7-nav-title-large>
    </f7-navbar>
    <!-- Page content-->
    <f7-login-screen id="my-login-screen" :opened="true">
      <f7-view>
        <f7-page login-screen>
          <div v-if="login">
            <f7-login-screen-title>Login</f7-login-screen-title>
            <f7-list form>
              <f7-list-input
                type="text"
                name="username"
                floating-label
                label="Brugernavn"
                placeholder="Dit brugernavn"
                :value="username"
                @input="username = $event.target.value"
              >
                <f7-icon material="person" slot="media"></f7-icon>
              </f7-list-input>
              <f7-list-input
                type="password"
                name="password"
                floating-label
                label="Adgangskode"
                placeholder="Adgangskode"
                :value="password"
                @input="password = $event.target.value"
              >
                <f7-icon material="lock" slot="media"></f7-icon>
              </f7-list-input>
            </f7-list>
            <f7-list>
              <f7-list-button title="Log Ind" login-screen-close @click="userLogin"></f7-list-button>
              <f7-list-button title="Ny Konto" @click="openRegister"></f7-list-button>
              <f7-block-footer>
                Tryk "Log Ind" for at logge ind med det indtastede brugernavn.
                <br />Hvis ikke du har en konto, try "Ny Konto", for at lave en ny konto.
              </f7-block-footer>
            </f7-list>
          </div>
          <div v-else-if="!login">
            <f7-login-screen-title>Register</f7-login-screen-title>
            <f7-list form>
              <f7-list-input
                type="text"
                name="username"
                floating-label
                label="Brugernavn"
                placeholder="Dit Brugernavn"
                :value="username"
                @input="username = $event.target.value"
                required
              >
                <f7-icon material="person" slot="media"></f7-icon>
              </f7-list-input>
              <f7-list-input
                type="email"
                name="email"
                floating-label
                label="Email"
                placeholder="Din Email"
                :value="email"
                @input="email = $event.target.value"
                required
              >
                <f7-icon material="email" slot="media"></f7-icon>
              </f7-list-input>
              <f7-list-input
                type="password"
                name="password"
                floating-label
                label="Adgangskode"
                placeholder="Adgangskode"
                :value="password"
                @input="password = $event.target.value"
              >
                <f7-icon material="lock" slot="media"></f7-icon>
              </f7-list-input>
              <f7-list-input
                type="password"
                name="Rpassword"
                floating-label
                label="Adgangskode igen"
                placeholder="Gentag Adgangskode"
                :value="Rpassword"
                @input="Rpassword = $event.target.value"
              >
                <f7-icon material="lock" slot="media"></f7-icon>
              </f7-list-input>
            </f7-list>
            <f7-list>
              <f7-list-button title="Registrer Konto" login-screen-close @click="userRegister"></f7-list-button>
              <f7-list-button title="Log ind" @click="openRegister"></f7-list-button>
              <f7-block-footer>
                Tryk "Registrer Konto" for at lave en ny konto.
                <br />For at komme tilbage til login tryk "Log ind".
              </f7-block-footer>
            </f7-list>
          </div>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-page>
</template>

<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';

  export default {
    data() {
      return {
        login: true,
        username: "",
        email: "",
        password: "",
        Rpassword: ""
      }
    },

    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password, () => {
          this.$f7.loginScreen.close();
        });
      },
          openRegister() {
      this.login = !this.login;
    },
    userLogin() {
      const f7 = this.$f7;
      f7.request.getJSON(
        `http://127.0.0.1:3000/user/${this.username}/${this.password}`,
        response => {
          if (response != null) {
            f7.data.userId = response[0].ID;
            f7.data.loggedIn = true;
            this.$f7router.navigate('/chat/'+response[0].ID)
          } else {
            f7.dialog.alert("Forkert brugernavn og/eller adgangskode");
          }
        },
        function(e, e2) {
          f7.dialog.alert("Forkert brugernavn og/eller adgangskode");
          console.error(e);
          console.error(e2);
        }
      );
    },
    userRegister() {
      const f7 = this.$f7;
      f7.request.postJSON(
        `http://127.0.0.1:3000/users`,
        {
          FirstName: this.username,
          LastName: this.username,
          Email: this.email,
          UserName: this.username,
          Password: this.password
        },
        response => {
          f7.data.userId = response;
          f7.data.loggedIn = true;
          this.$f7router.navigate('/chat/'+response)
        },
        function(e, e2) {
          console.error(e);
          console.error(e2);
        }
      );
    },
        logOut() {
      const f7 = this.$f7;
      f7.data.userId = 0;
          f7.data.loggedIn = false;
    }
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });

      const $$ = this.$$;

      this.$$('input[type="password"]').on("keyup", e => {});
    const updateChannel = new BroadcastChannel("precache-channel");
    updateChannel.addEventListener("message", event => {
      if (confirm(`New content is available. Click OK to refresh`)) {
        window.location.reload();
      }
    });

      
    }
    
  }
</script>