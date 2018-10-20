<template>
    <div>
        <div class="text">
            <h4>{{answer.text}}</h4>
            <h4 style="margin:0px !important;">Ответ: {{answer.answer}}</h4>
        </div>
        <hr/>
    </div>
</template>

<script>
export default {
    props: ['answer']
}
</script>

<style>
    
</style>

