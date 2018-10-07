<template>
    <div>
        <div class="text">
            <h4>{{question.name}}</h4>
            <div class="answer">
                <h4>Ответ:</h4>
                <input placeholder="поле ответа" v-model="answerText"/>
                <v-btn @click="answerQuestion">Отправить</v-btn>
            </div>
        </div>
        <hr/>
    </div>
</template>

<script>
import _assign from 'lodash/assign'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data: () => ({
        answerText:''
    }),
    props: ['question'],
    computed: {
        ...mapState({
            'questionCopy': 'answer'
        }),
    },
    methods: {
        ...mapActions({
            'answerQuestionAsync': 'answerQuestion'
        }),

        answerQuestion(question){
            // console.log(question);
            if (this.answerText !== '') {
                var questionCopy = _assign({}, this.question, { answer: this.answerText })
                this.answerQuestionAsync(questionCopy).then(()=>{
                    this.$toaster.success("Ответ записан!");
                    this.$store.commit('answerToQuestion', questionCopy)
                })
                .catch(()=>{
                    this.$toaster.error('Что-то сломалось. Наверное накоп одногруппников:(');
                });
            }
        }
    }
    
}
</script>

<style scoped>
    .answer *{
        display: inline-block;
    }
</style>


