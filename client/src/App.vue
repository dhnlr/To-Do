<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="hero is-info is-fullheight">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title">
            To-Do List
          </h1>
          <h2 class="subtitle">
            <router-view @token="token = $event" @email="email = $event"></router-view>
          </h2>
        </div>
      </div>
    </div>
    <div v-show="token" class="container is-widescreen is-fluid konten">
      <div class="columns"> 
        <div class="column is-one-quarter is-hidden-mobile">
          <aside class="menu">
            <p class="menu-label">
              Menu
            </p>
            <ul class="menu-list">
              <li><a @click="motivation()">Give Me Motivation</a></li>
              <li><a @click="showpomodoro = !showpomodoro">I want do it</a></li>
              <li><a @click="procr()">I can do it later</a></li>
            </ul>
          </aside>
          <div class="feature" v-show="showquotes">
            <blockquote>
              <p><em>{{quotes[0]}}</em></p>
              <p>-- {{quotes[1]}}</p>
            </blockquote>
          </div>
          <div class="feature" v-show="showprocr">
          <aside class="menu">
            <p class="menu-label">
              Waste Your Time
            </p>
            <ul class="menu-list">
              <li><a href="https://9gag.com" target="_blank">9Gag</a></li>
              <li><a href="https://reddit.com" target="_blank">Reddit</a></li>
              <li><a href="https://boredpanda.com" target="_blank">Bored Panda</a></li>
            </ul>
          </aside>
          </div>
          <div class="feature" v-show="showpomodoro">
            <Pomodoro :total-pomodoro = "totalPomodoro"
                      :work-duration = "25"
                      :diameter = "diameter">
            </Pomodoro>
          </div>
        </div>
        <div class="column">
          <div class="field is-fullwidth has-addons is-fullwidth">
            <div class="control">
              <input class="input is-fullwidth" type="text" placeholder="Your task here" @keyup.enter="addList()" v-model="newList" v-if="textButton == 'Add'">
              <input class="input is-fullwidth" type="text" placeholder="Your task here" @keyup.enter="editedList()" v-model="newList" v-if="textButton == 'Edit'">
            </div>
            <div class="control">
              <a class="button is-link" @click="addList()" v-if="textButton == 'Add'">
                {{textButton}}
              </a>
              <a class="button is-warning" @click="editedList()" v-if="textButton == 'Edit'">
                {{textButton}}
              </a>
            </div>
          </div>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>List</th>
                <th class="is-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in lists">
                <td>
                  <label class="checkbox" v-if="list.status == false">
                    <input type="checkbox" @click="updateList(list._id)">
                     {{list.title}}
                  </label>
                  <label class="checkbox" v-if="list.status">
                    <input type="checkbox" @click="updateList(list._id)" checked>
                     <s>{{list.title}}</s>
                  </label>
                </td>
                <td class="is-right">
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-warning" @click="editList(list.title, list._id)">
                        <span class="icon is-small">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span>Edit</span>
                      </a>
                    </p>
                    <p class="control">
                      <a class="button is-danger" @click="deleteList(list._id)">
                        <span class="icon is-small">
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </span>
                        <span>Delete</span>
                      </a>
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Navbar from './components/navbar.vue'
import Home from './components/home.vue'
import About from './components/about.vue'
import Contact from './components/contact.vue'
import Login from './components/login.vue'
import Pomodoro from 'vue-pomodoro'

Vue.use(VueRouter)

const routes =  [
  {path: '/home', component: Home},
  {path: '/about', component: About},
  {path: '/contact', component: Contact},
  {path: '/login', component: Login},
]

const router = new VueRouter({
  routes
})

export default {
  name: 'app',
  components: {
    Navbar,
    Login,
    Pomodoro
  },
  router,
  data () {
    return {
      email: null,
      token: null,
      tasks: [],
      textButton: 'Add',
      newList: "",
      lists : [],
      id: null,
      quotes: [],
      showquotes : false,
      showprocr: false,
      showpomodoro: false,
      diameter: 300,
      totalPomodoro: 4
    }
  },
  methods: {
    addList: function () {
      let localthis = this
      axios.post(`http://35.199.168.46/todos/add`, {title: localthis.newList}, {headers: {token: localthis.token}})
      .then( function (resp) {
        localthis.newList = ""
        localthis.updatedata()
        console.log(resp)
      })
    },
    editList: function (title, id) {
      this.textButton = "Edit"
      this.newList = title
      this.id = id
    },
    editedList: function () {
      let localthis = this
      axios.put(`http://35.199.168.46/todos/${localthis.id}`, {title: localthis.newList}, {headers: {token: localthis.token}})
      .then( function (resp) {
        localthis.newList = ""
        localthis.textButton = "Add"
        localthis.id = null
      })
    },
    deleteList: function (id) {
      let localthis = this
      this.newList = ' '
      axios.delete(`http://35.199.168.46/todos/${id}`, {headers: {token: localthis.token}})
      .then( function (resp) {
        localthis.newList= ""
      })
    },
    updateList: function (id) {
      let localthis = this
      this.newList = ' '
      axios.put(`http://35.199.168.46/todos/complete/${id}`, null, {headers: {token: localthis.token}})
      .then( function (resp) {
        localthis.newList= ""
      })
    },
    motivation: function () {
      this.showquotes = !this.showquotes
    },
    procr: function () {
      this.showprocr = !this.showprocr
    },
    updatedata () {
      let localthis = this
      axios.get(`http://35.199.168.46/todos`, {headers: {token: localthis.token}})
      .then(function (resp) {
        localthis.lists = resp.data.data
      })
    }
  },
  watch: {
    token : function () {
      let localthis = this
      axios.get(`http://35.199.168.46/todos`, {headers: {token: localthis.token}})
      .then(function (resp) {
        console.log(resp.data.data)
        localthis.lists = resp.data.data
      })
    },
    newList: function(value){
      let localthis = this
      if (value == "") {
        axios.get(`http://35.199.168.46/todos`, {headers: {token: localthis.token}})
        .then(function (resp) {
          localthis.lists = resp.data.data
        })
      }
    }
  },
  created: function () {
    let localthis = this
    axios.get("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=")
    .then(function (resp) {
      localthis.quotes.push(resp.data[0].content.replace(/(&nbsp;|<([^>]+)>)/ig, ""))
      localthis.quotes.push(resp.data[0].title)
    })
  }
}
</script>

<style>
  .konten{
    padding-top: 20px;
  }
  .feature{
    padding: 1.4em 0;
  }
</style>
