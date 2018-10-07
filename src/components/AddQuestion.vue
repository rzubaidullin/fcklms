<template>
  <div>
    <h1 style="margin-bottom:20px;">Вопросы</h1>
    <v-textarea 
        solo
        name="input-7-4"
        label="Добавь вопрос"
        :value="question"
        @input="setQuestion"
        >
    </v-textarea>
    <v-btn depressed large color="primary" @click="addNew" :loading="loading">
        {{ confirmed ? 'Подобный вопрос есть, отправить все равно' : 'Отправить' }}
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data: () => ({
        confirmed: false,
        loading: false
    }),
    computed: {
        ...mapState({
            'question': s => s.question
        }),
        ...mapGetters(['needsConfirm'])
    },
    methods: {
        ...mapMutations({
            'setQuestion': 'setQuestion',
            'addQuestion': 'addQuestion'
        }),
        ...mapActions({
            'addQuestionAsync': 'addQuestion'
        }),

        addNew() {
            if (this.needsConfirm && !this.confirmed) {
                this.confirmed = true
                return
            }

            if (this.newQuestion !== '') {
                this.confirmed = false
                this.loading = true
                this.addQuestionAsync().then(() => {
                    this.loading = false
                    this.addQuestion()
                    this.$toaster.success('Вопрос добавлен');
                }).catch(() => {
                    this.loading = false
                    this.$toaster.error('Что-то сломалось. Наверное твой накоп :(');
                })
            }
        }
    }
}
</script>


