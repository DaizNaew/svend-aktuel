<template>
  <f7-page name="chat">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Chat vindue</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
      <f7-nav-title-large>Chat vindue</f7-nav-title-large>
    </f7-navbar>
    <!-- Toolbar-->
    <f7-toolbar bottom>
      <f7-link>Left Link</f7-link>
      <f7-link>Right Link</f7-link>
    </f7-toolbar>
    <!-- Page content-->
    <f7-block-title>Chat</f7-block-title>
<f7-block strong>

        <f7-list>
          <f7-list-item>
            <input id="handle" type="text" placeholder="Handle" readonly :value="username" />
          </f7-list-item>
          <f7-list-item>
            <input id="message" type="text" placeholder="Message" />
          </f7-list-item>
          <f7-list-item>
            <f7-button id="send" large @click="fireEvent">Send</f7-button>
          </f7-list-item>
        </f7-list>
        <f7-block strong id="chat-window">
          <div id="output">
            
          </div>
          <div id="feedback"></div>
        </f7-block>
  </f7-block>
  </f7-page>
</template>

<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import io from 'socket.io-client';

  var socket = io.connect('http://localhost:3001');

  export default {

    data() {
      return {
        login: true,
        username: "",
      }
    },

    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password, () => {
          this.$f7.loginScreen.close();
        });
      },
      fireEvent() {
        const $$ = this.$$;
        var message = $$('#message'),
            handle = $$('#handle'),
            btn = $$('#send'),
            output = $$('#output');

          socket.emit('chat', {
            message: (message.val()),
            handle: (handle.val())
          })
      }
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
        console.dir(this.$f7route.params)
        this.$f7.request.getJSON(
        `http://127.0.0.1:3000/users/${this.$f7route.params.userid}`,
        response => {
          if (response != null) {
            this.username = `${response[0].firstname} ${response[0].lastname}` 
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
      });

      const $$ = this.$$;

      var   message = $$('#message'),
            handle = $$('#handle'),
            btn = $$('#send'),
            feedback = $$('#feedback');

        message.on('keypress', () => {
          socket.emit('typing', handle.val())
        })
      
      socket.on('chat', (data) => {
        var output = $$('#output');
        feedback.html('');
        output.append(`<p><strong>${data.handle}:</strong>  ${data.message} </p>`)
      });

      socket.on('typing', (data) => {
        feedback.html(`<p><em>${data} is typing...</p></em>`)
      })
      
    }
    
  }
</script>