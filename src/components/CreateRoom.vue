<template>
    <div class="creation">
        <h3>Создать комнату</h3>
        <div class="input-block">
            <h4>Название комнаты</h4>
            <input depressed large color="primary" class="input" type="text" placeholder="Название комнаты"/>
        </div>
        
        <v-btn>Создать</v-btn>
    </div>
</template>

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

