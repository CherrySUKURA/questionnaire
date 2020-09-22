<template>
    <div class="img">
        <img :src="imgSrc">
    </div>
</template>

<script>
export default {
    data(){
        return {
            imgSrc: require("../assets/QrCode.jpg")
        }
    }
}
</script>

<style scoped>
    .img{
        width: 100%;
    }
    .img img{
        width: 100%;

    }
</style>