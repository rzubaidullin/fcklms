import Vue from "vue";
import Router from "vue-router";
import CreateRoom from "./views/CreateRoom.vue";
import Room from "./views/Room.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "CreateRoom",
      component: CreateRoom
    },
    {
      path: "/room/:url",
      name: "Room",
      props: true,
      component: Room
    },
    {
      path: "*",
      name: "NotFound",
      redirect: "/"
    }
  ]
});
