<template>
  <div class="form-group with-icon-right dropdown select-form-group multiselect-form-group"
       v-dropdown
       :class="{'has-error': hasErrors()}">
    <div class="input-group dropdown-toggle" @click="$refs.scrollbar.onContainerResize()">
      <input
        readonly
        :class="{'has-value': !!displayValue}"
        v-bind:value="displayValue"
        required/>
      <i class="ion ion-chevron-down icon-right input-icon"></i>
      <label class="control-label">{{label}}</label><i class="bar"></i>
      <small v-show="hasErrors()" class="help text-danger">{{ showRequiredError() }}</small>
    </div>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <scrollbar ref="scrollbar">
        <div class="dropdown-menu-content">
          <div class="dropdown-item"
               :class="{'selected': isOptionSelected(typeOfOptions === 'string' ? option : option.id)}" v-for="option in options"
               @click="toggleSelection(option)">
            <span class="ellipsis">{{typeOfOptions === 'string' ? option : option.name }}</span>
            <i class="fa fa-check selected-icon"></i>
          </div>
        </div>
      </scrollbar>
    </div>
  </div>
</template>

<script>
  import Dropdown from '../../../directives/Dropdown'
  import Scrollbar from '../vuestic-scrollbar/VuesticScrollbar.vue'

  export default {
    name: 'vuestic-multi-select',
    components: {
      Scrollbar
    },
    directives: {
      dropdown: Dropdown
    },
    data () {
      return {
        displayValue: '',
        validated: false,
        typeOfOptions: 'string'
      }
    },
    props: {
      label: String,
      options: {
        type: [Array, Object]
      },
      value: Array,
      required: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: 'multiselect'
      }
    },
    beforeMount(){
      this.typeOfOptions = typeof this.options[0];
    },
    mounted () {
      this.typeOfOptions = typeof this.options[0];
      if (this.typeOfOptions === 'object'){
        for (let i=0;i<this.options.length;i++){
          if (this.value.indexOf(this.options[i].id) >= 0){
            this.selectedItem = this.options[i];
          }
        }

        this.$emit('input', this.selectedItem, this.name)
      }else{
        this.$emit('input', this.value, this.name)
      }
    },
    watch: {
      value(newV) {
        this.updateDisplayValue(newV == undefined ? [] : newV)
      }
    },
    methods: {
      toggleSelection (option) {
        if (typeof option === 'object'){
          option = option.id;
        }
        let newVal = this.isOptionSelected(option) ? this.deselectOption(option) : this.selectOption(option)
        this.updateDisplayValue(newVal)
        this.$emit('input', newVal, this.name)
      },
      isOptionSelected (option) {
        if (this.value){
          return this.value.includes(option)
        }
        return false;
      },
      selectOption (option) {
        return this.value.concat(option)
      },
      deselectOption (option) {
        return this.value.filter(item => item !== option)
      },
      updateDisplayValue (newVal) {

        let tmpOptions = [];
        for (let i = 0 ; i < this.options.length; i++){
          tmpOptions.push(this.options[i].id);
        }

        this.typeOfOptions = typeof this.options[0];
        if (this.typeOfOptions === 'object'){
          let tmpNewVal = [];
          let tmpIdx = 0;
          for (let i = 0; i < newVal.length; i++){
            tmpIdx = tmpOptions.indexOf(newVal[i]);
            if (tmpIdx > -1){
              tmpNewVal.push(this.options[tmpIdx].name);
            }
          }
          newVal = tmpNewVal;
        }


        if (newVal.length > 2) {
          this.displayValue = `${newVal.length} of ${this.options.length} chosen`
        } else {
          this.displayValue = newVal.join(', ')
        }
      },
      validate () {
        this.validated = true
      },
      isValid () {
        let isValid = true
        if (this.required) {
          isValid = !!this.displayValue
        }
        return isValid
      },
      hasErrors () {
        let hasErrors = false
        if (this.required) {
          hasErrors = this.validated && !this.displayValue
        }
        return hasErrors
      },
      showRequiredError () {
        return `The ${this.name} field is required`
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";

  .multiselect-form-group {
    .dropdown-menu {
      padding: 0;
      .vuestic-scrollbar {
        height: $dropdown-item-height * 4;
      }
    }
  }
</style>
