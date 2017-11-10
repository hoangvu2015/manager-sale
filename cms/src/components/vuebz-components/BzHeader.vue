<template>
    <vuestic-widget class=" color-buttons" :headerText="headerText">
        <div class="row">
            <div class=".col-md-1">
                <button class="btn btn-info focus btn-micro" @click="saveAndList">
                    <div class="btn-with-icon-content"><i class="glyphicon glyphicon-floppy-disk"></i> Save & List</div>
                </button>
            </div>
            &nbsp; &nbsp;
            <div class=".col-md-1">
                <button class="btn btn-secondary focus btn-micro" @click="save">
                    <div class="btn-with-icon-content"><i class="glyphicon glyphicon-floppy-disk"></i> Save</div>
                </button>
            </div>
            &nbsp; &nbsp;
            <div class=".col-md-1">
                <button class="btn btn-warning focus btn-micro" @click="cancel">
                    <div class="btn-with-icon-content"><i class="glyphicon glyphicon-arrow-left"></i> Cancel</div>
                </button>
            </div>
        </div>
    </vuestic-widget>
</template>
<script>

    import VuesticWidget from 'components/vuestic-components/vuestic-widget/VuesticWidget'

    export default {
        name: 'bz-header',
        components: {
            VuesticWidget
        },
        props: {
            routeList: {
                type: String
            },
            headerText: {
                type: String
            }
        },
        methods: {
            saveAndList(){
                this.$emit("save", true);
            },
            save(){
                this.$emit("save");
            },
            cancel(){
                this.$store.dispatch("goToList", {
                    "routeList": this.routeList
                });
            }
        }
    }
</script>