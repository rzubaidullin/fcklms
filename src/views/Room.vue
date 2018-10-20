<template>
    <v-container fluid grid-list-xl class="container">
      <v-layout justify-center row wrap>
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
</template>
<script>
import AddQuestion from "../components/AddQuestion.vue";
import AnswerItem from "../components/AnswerItem.vue";
import QuestionItem from "../components/QuestionItem.vue";
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: "room",
  props: ['url'],
  components: {
    AddQuestion,
    AnswerItem,
    QuestionItem
  },
  data: () => ({
    questionsLoading: false,
  }),
  computed: {
    ...mapState({
      questions: s => s.questions,
      answers: s => s.answers,
      room: s => s.room
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

    loadQuestions (url) {
      this.questionsLoading = true
      this.getQuestionsList(this.url).then(() => {
        this.questionsLoading = false
      }).catch(() => {
        this.questionsLoading = false
      }),
      this.getAnsweresList(this.url).then(()=>{});
    },

    loadRoom () {
      
    }
  },

  created () {
    this.loadRoom()

    this.loadQuestions()
    setInterval(() => {
      this.loadQuestions()
    }, 5000)
  }
}
</script>
