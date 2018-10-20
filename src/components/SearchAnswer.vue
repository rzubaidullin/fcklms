<template>
  <div class="hello">
    <h1 style="margin-bottom:20px;">Ответы</h1>
    <v-textarea 
        solo
        name="input-7-4"
        label="Поле для поиска"
        @input="search"
        >
    </v-textarea>
  </div>
</template>

<script>
export default {
    methods: {
      search(query){
        this.$store.commit('setSearchQuery',query);
      }
    }
}
</script>

