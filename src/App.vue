<template>
  <v-app class="app" id="app">
    <header>
      <h3><router-link to="/" style="color:white; text-decoration:none;">Fck LMS</router-link></h3>
      <!-- <h4 style="position:absolute; right:15%; top:10px;">Онлайн: <b>150</b></h4> -->
    </header>
    
    <router-view/>

    <footer>
      <h4>Powered by <a href="https://redoctopus.studio" target="_blank" style="text-decoration:none;"><b>ZR</b></a></h4>
      <h5>Если вы хотите поддержать проект можно приобрести почту типа imgonna@fcklms.ru <br>
        <a href="mailto:imgonna@fcklms.ru" style="text-decoration:none; color:#ff0000;" target="_blank">Пиши нам</a>
      </h5>
    </footer>
  </v-app>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#home {
  color: white;
  text-decoration: none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  padding: 10px;
  background: black;
  color: white;
}

footer {
  padding: 10px;
  background: black;
  color: white;
}

h3 {
  /* margin: 30px 0 0; */
  font-size: 36px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.app{
  height: 100%;
}

h4{
  padding: 10px; 
  font-size: 17px;
  font-weight: inherit;
  white-space: pre-wrap;
}

.text{
  text-align: left;
  padding: 10px 0;
}

hr{
  width: 40%;
  margin: 0;
  /* margin: auto;  */
}

.input {
  border:1px solid #c5c5c5;
  padding: 10px;
}

b {
  color:#ff0000;
}

@media(max-width:700px){
  .desktop {
    display: none;
  }
}


</style>
