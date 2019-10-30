<template>
    <div
    class="progress-bar"
    @touchstart.prevent="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend.prevent="onTouchEnd">
        <div class="inner-bar" ref="progressBar">
            <div class="progress" :style="{ width: displayPercent + '%' }" ref="progress"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            newPercent: this.percent,
            isMoving: false
        }
    },  
    computed: {
        displayPercent() {
            return this.isMoving ? this.newPercent * 100 : this.percent * 100;
        }
    },
    methods: {
        onTouchStart(e) {
            this.isMoving = false;
            let touchObj = e.touches[0];
            let innerBar = this.$refs.progressBar;
            let clientX = touchObj.clientX;
            let offsetL = innerBar.offsetLeft;
            let barWidth = innerBar.offsetWidth;
            this.newPercent  = (clientX - offsetL) / barWidth;
        },
        onTouchMove(e) {
            this.isMoving = true;
            let touchObj = e.touches[0];
            let innerBar = this.$refs.progressBar;
            let clientX = touchObj.clientX;
            let offsetL = innerBar.offsetLeft;
            let barWidth = innerBar.offsetWidth;
            let dis = clientX - offsetL;
            this.newPercent = dis < 0 ? 0 : dis > barWidth ? 1 : (dis/barWidth);
        },
        onTouchEnd() {
            this.isMoving = false;
            this.$emit('touchEnd',this.newPercent);
        }
    } 
}
</script>>
<style scoped>
.progress-bar{
    display: flex;
    width: 100%;
    align-items: center;
    height: 33px;
}
.inner-bar{
    position: relative;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    height: 3px;
    border-radius: 5px;
}
.progress{
    position: relative;
    width: 0;
    height: 100%;
    background-color: red;
    border-radius: 5px;
}
.progress::after{
    content: '';
    background-color: #fff;
    border: 5px #fff solid;
    border-radius: 50%;
    position: absolute;
    top: -4px;
    right: -4px;
    text-align: center;
    box-sizing: border-box;
}
</style>