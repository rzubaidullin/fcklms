<template>
  <v-app class="app" id="app">
    <header>
      <h3>F*ck LMS</h3>
    </header>
    
    <!-- <CreateRoom/> -->
    <v-container fluid grid-list-xl class="container">
      <v-layout justify-center>
        <v-flex md5>
          <AddQuestion/>
          <hr style="margin: 20px;"/>
          <h5 v-if="questionsLoading">Загрузка...</h5>
          <h5 v-else>Список Вопросов</h5>
          <h4 v-if="!isQuestions">Пока нет вопросов. Добавь!</h4>
          <div>
            <QuestionItem v-for="item in searchedQuestions" :key="item.id" :question="item"/>
          </div>
        </v-flex>
        <v-flex md5>
          <h1 style="margin-bottom:20px;">Ответы</h1>
          <h4 v-if="!isAnswers">Пока нет вопросов с ответами</h4>
          <div v-for="item in reversedAnswersList" :key="item.id">
            <AnswerItem :answer="item"/>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    
    <footer>
      <h4>Powered by <b>rzubaidullin</b></h4>
      <!-- and <b style="color:#ff0000">Red</b>Octopus</h4> -->
    </footer>
  </v-app>
</template>

<script>

import AddQuestion from "./components/AddQuestion.vue";
import AnswerItem from "./components/AnswerItem.vue";
import QuestionItem from "./components/QuestionItem.vue";
import CreateRoom from "./components/CreateRoom.vue";
import { mapState, mapGetters, mapActions } from 'vuex';


export default {
  name: "app",
  components: {
    AddQuestion,
    AnswerItem,
    QuestionItem,
    CreateRoom
  },
  data: () => ({
    questionsLoading: false,
  }),
  computed: {
    ...mapState({
      questions: s => s.questions,
      answers: s => s.answers
    }),
    ...mapGetters([
      'searchedAnswers', 
      'reversedAnswersList',
      'searchedQuestions'
      ]),
    isQuestions: s => s.searchedQuestions.length > 0 ? true : false,
    isAnswers: s => s.searchedAnswers.length > 0 ? true : false,
  },
  methods: {
    ...mapActions({
      'getQuestionsList': 'getQuestionsList',
      'getAnsweresList':'getAnsweresList'
    }),

    loadQuestions () {
      this.questionsLoading = true
      this.getQuestionsList().then(() => {
        this.questionsLoading = false
      }).catch(() => {
        this.questionsLoading = false
      }),
      this.getAnsweresList().then(()=>{});
    }
  },

  created () {
    this.loadQuestions()
    setInterval(() => {
      this.loadQuestions()
    }, 5000)
  }
};
</script>

<style>
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

html {

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
  /* margin: auto;  */
}

.input {
  border:1px solid #c5c5c5;
  padding: 10px;
}

b {
  color:#ff0000;
}
</style>
