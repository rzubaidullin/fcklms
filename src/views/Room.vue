<template>
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
</template>
