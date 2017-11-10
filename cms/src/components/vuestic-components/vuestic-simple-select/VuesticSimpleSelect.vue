<template>
  <div class="form-group with-icon-right dropdown select-form-group"
       v-dropdown.closeOnMenuClick
       :class="{'has-error': hasErrors()}">
    <div class="input-group dropdown-toggle" @click="$refs.scrollbar.onContainerResize()">
      <input
        readonly
        :class="{'has-value': !!displayValue}"
        v-model="displayValue"
        :name="name"
        required/>
      <i class="ion ion-chevron-down icon-right input-icon"></i>
      <label class="control-label">{{label}}</label><i class="bar"></i>
      <small v-show="hasErrors()" class="help text-danger">{{ showRequiredError() }}</small>
    </div>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <scrollbar ref="scrollbar">
        <div class="dropdown-menu-content">
          <div class="dropdown-item"
               :class="{'selected': isOptionSelected(typeOfOptions === 'string' ? option : option.id )}" v-for="option in options"
               @click="selectOption(option)">
            <span class="ellipsis">{{typeOfOptions === 'string' ? option : option.name }}</span>
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
    name: 'vuestic-simple-select',
    components: {
      Scrollbar
    },
    directives: {
      dropdown: Dropdown
    },
    data () {
      return {
        displayValue: '',
        selectedItem: {},
        validated: false,
        typeOfOptions: 'string'
      }
    },
    props: {
      label: String,
      options: {
        type: [Array, Object]
      },
      value: {},
      required: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        required: true
      }
    },
    beforeMount(){
      this.typeOfOptions = typeof this.options[0];
    },
    mounted () {
      this.typeOfOptions = typeof this.options[0];
      if (this.typeOfOptions === 'object'){
        for (let i=0;i<this.options.length;i++){
          if (this.value === this.options[i].id){
            this.selectedItem = this.options[i];
          }
        }
        this.updateDisplayValue(this.selectedItem.name)
        this.$emit('input', this.selectedItem, this.name)
      }else{
        this.updateDisplayValue(this.value)
        this.$emit('input', this.value, this.name)
      }
    },
    watch: {
      value(newV) {
        this.selectOption(newV)
      }
    },
    methods: {
      isOptionSelected (option) {
        return this.value === option
      },
      selectOption (option) {
        this.typeOfOptions = typeof this.options[0];
        if (this.typeOfOptions === 'object'){
          this.updateDisplayValue(option.name)
        }else{
          this.updateDisplayValue(option)
        }
        this.$emit('input', option, this.name)
      },
      updateDisplayValue (val) {
        this.displayValue = val
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

  .select-form-group {
    .dropdown-menu {
      padding: 0;
      .vuestic-scrollbar {
        height: $dropdown-item-height * 4;
      }
    }
  }
</style>
