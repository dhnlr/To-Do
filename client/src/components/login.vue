<template>
  <div
    class="fb-login-button" 
    data-max-rows="1" 
    data-size="medium" 
    data-button-type="login_with" 
    data-show-faces="false" 
    data-auto-logout-link="true" 
    data-use-continue-as="false" 
    onlogin="checkLoginState()" 
    scope="public_profile,email,"
    @click="checkLoginState()">
  </div>
</template>

<script>
export default {

  name: 'login',

  data () {
    return {
      accessToken: null,
    }
  },
  methods: {
    checkLoginState : function() {
      let localthis = this
      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          localStorage.accessToken = response.authResponse.accessToken
          localthis.token = response.authResponse.accessToken
          localStorage.userId = response.authResponse.userID
          axios({
            method: 'post',
            url:`http://35.199.168.46/signin`, 
            data: {
              userId: response.authResponse.userID,
              accessToken: response.authResponse.accessToken
            },
          })
          .then(function (resp) {
            console.log(resp);
            localthis.$emit('token', resp.data.token)
            localthis.$emit('email', resp.data.data.email)
          })
          .catch(function (error) {
            console.log(error);
          }); 
        } else if (response.status == 'not_authorized' || response.status == "unknown") {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("userId")
          localthis.token = null
          localthis.$emit('token', null)
            localthis.$emit('email', null)
        }
    })
    },
  },
  created: function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '392863434460697',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11'
      });  
    };

    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.checkLoginState = this.checkLoginState;
    this.accessToken = localStorage.getItem('accessToken');
  }
}
</script>

<style lang="css" scoped>
div{
  padding-top: 10px;
}
</style>