<template>
    
    <v-container fluid grid-list-xl class="container">
        <v-layout justify-center row wrap>
            <v-flex md5>
                <div class="creation" style="background-color:white;">
                    <h3>Создать комнату</h3>
                    <div class="input-block">
                        <h4>Название комнаты</h4>
                        <v-text-field class="elevation-0" 
                                      placeholder="Название комнаты" 
                                      :value="room"
                                      @input="setRoom"
                                      />
                    </div>
                    
                    <v-btn depressed large color="#ce1515" style="color:white;" @click="addRoomMethod">Создать</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    name: "CreateRoom",
    computed: {
        ...mapState({
            'room': s => s.room,
            'roomExists': s => s.roomExists
        }),
    },
    methods: ({
        ...mapActions({'addRoomAs':'addRoom'}),
        ...mapMutations({'setRoom':'setRoom'}),
        addRoomMethod() {
            if (this.room == null) 
                this.$toaster.error('Добавь название комнаты!');
            else {
                this.addRoomAs(this.room).then(() => {
                    if(this.roomExists == 0){
                        this.$toaster.error("Комната с таким названием уже существет!");                        
                    }
                    else{
                        this.$toaster.success("Комната добавлена! Перенаправляю..."); 
                        this.$router.push({ name: 'Room', params: { url: this.roomExists } });         
                    }   
                        
                }).catch(e => {
                    console.log(e);
                    this.$toaster.error('Что-то сломалось. Наверное твой накоп :(');
                })
            }

        }
    })
}
</script>



<style scoped>
    
    .creation{
        padding: 40px;
        border: 1px solid #c5c5c5;
        border-radius: 6px;
        /* max-width: 600px; */
        margin: 30px auto;
    }

    h3{
        margin: 0;
    }

    .input-block{
        margin: 10px 0;
    }

    h4{
        padding: 10px 0;
        text-align: left;
    }

    input{
        width:100%;
    }
</style>

