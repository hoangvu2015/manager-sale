<template>
    <div class="dashboard">
        <dashboard-info-widgets></dashboard-info-widgets>
    </div>
</template>

<script>
    import VuesticWidget from 'components/vuestic-components/vuestic-widget/VuesticWidget'
    import DashboardInfoWidgets from './DashboardInfoWidgets'

    export default {
        name: 'dashboard',
        components: {
            VuesticWidget,
            DashboardInfoWidgets
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../sass/_variables.scss";
</style>
