import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {

        backClick() {
            // console.log('backClick');
            this.$refs.scroll.scrollTo(0, 0, 500)

        },
        listenShowBackTop(position) {
            this.isShowBackTop = (-position.y) > 1000
        }
    },
}