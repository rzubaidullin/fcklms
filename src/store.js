import Vue from "vue";
import Vuex from "vuex";
import _filter from "lodash/filter";
import _includes from "lodash/includes";
import _toLower from "lodash/toLower";
import _trim from "lodash/trim";
import uuid from "uuid";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    room: null, // null || { id, name }
    question: "",
    answer: [],
    questions: [],
    answers: [],
    roomExists: null,
    currUrl: null // null || {bool}
  },
  getters: {
    searchedAnswers(state) {
      return _filter(
        state.answers,
        (item) =>
          state.question === "" ||
          (state.question !== "" &&
            _includes(_toLower(item.text), _toLower(state.question)))
      );
    },

    searchedQuestions(state) {
      // console.log(state);
      return _filter(
        state.questions,
        (item) =>
          state.question === "" ||
          (state.question !== "" &&
            _includes(_toLower(item.name), _toLower(state.question)))
      );
    },

    reversedAnswersList(state, getters) {
      return getters.searchedAnswers.reverse();
    },

    needsConfirm(state, getters) {
      return getters.searchedAnswers.length > 0 && state.question !== "";
    }
  },
  mutations: {
    addQuestion(state) {
      state.questions.push({ id: uuid(), name: state.question });
      state.question = "";
    },
    answerToQuestion(state, question) {
      state.answers.push({
        id: question.id,
        text: question.name,
        answer: question.answer
      });
      var indexToRemove = state.questions.findIndex(
        obj => obj.id == question.id
      );
      state.questions.splice(indexToRemove, 1);
    },
    setQuestion(state, question) {
      state.question = _trim(question);
    },
    setQuestionsList(state, list) {
      state.questions = list;
    },
    setAnswersList(state, list) {
      state.answers = list;
    },
    setRoom(state, room) {
      state.room = room;
    }
  },
  actions: {
    getQuestionsList(context, url) {
      return axios
        .get("http://fcklms.styleru.org/api/getAllQuestions" + "?url=" + url)
        .then(response => {
          // { questions: [{}, {}, ..] }
          context.commit("setQuestionsList", response.data);
          return response.data;
        });
    },
    getAnsweresList(context, url) {
      return axios
        .get(
          "http://fcklms.styleru.org/api/getAnsweredQuestions" + "?url=" + url)
        .then(response => {
          // { questions: [{}, {}, ..] }
          context.commit("setAnswersList", response.data);
          return response.data;
        });
    },
    addQuestion(context, url) {
      const data = new FormData();
      data.append("text", context.state.question);
      data.append("url", url);

      return axios
        .post("http://fcklms.styleru.org/api/addQuestions", data)
        .then()
        .catch(e => {
          console.log(e);
        });
    },
    answerQuestion(context, answer, url) {
      const data = new FormData();
      data.append("answer", answer.answer);
      data.append("id", answer.id);
      data.append("url", url);

      return axios
        .post("http://fcklms.styleru.org/api/answerQuestion", data)
        .then()
        .catch(e => {
          console.log(e);
        });
    },
    addRoom(context) {
      const data = new FormData();
      data.append("room", context.state.room);
      return axios
        .post("http://fcklms.styleru.org/api/createRoom", data)
        .then(response => {
          context.state.roomExists = response.data;
          // console.log(context.state.roomExists);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
});
