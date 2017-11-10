<template>
	<div class="form-group">
		<div class="input-group">
			<select :name="name" :value="value" v-validate="validateRules"></select>

			<small v-show="errors.has(name)" class="help text-danger">
				{{ errors.first(name) }}
			</small>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import select2 from 'select2'

	export default {
		name: 'bz-select2',

		props: {
			// v-model
			value: {
				type: [String, Boolean, Number],
				default: '',
				require: false
			},
			options: {
				type: [Array, Object, String],
				required: true
			},
			name: {
				type: String,
				required: true
			},
			required: {
				type: Boolean,
				default: false
			},
			// multiple: {
			// 	type: Boolean,
			// 	default: false
			// },
			placeholder: {
				type: String,
				required: false,
				default: 'Select a state'
			},
			// valid:{
			// 	type: Function,
			// 	required: false,
			// 	default() {
			// 		return 123
			// 	}
			// },
			// invalid:{
			// 	type: Function,
			// 	required: false,
			// 	default() {
			// 		return 123
			// 	}
			// }
		},
		watch: {
			// update value
			value(value) {
				let vm = this

				// $(vm.$el)
				// .find('select')
				// .select2('val', value)

				$(vm.$el)
				.find('select')
				.val(value)
				.trigger('change')
			},
			
			// update options
			options(options) {
				let vm = this

				let data = options.map(option => { 
					return { 
						id: this.optionValue(option),
						text: this.optionText(option)
					} 
				})

				// For empty option
				// data.unshift({
				// 	id: '',
				// 	text: vm.$props.placeholder
				// })

				// Create new config for select2
				let select2Config = { 
					allowClear: true,
					width: '100%',
					data: data,
					placeholder: {
						id: '-1',
						text: vm.$props.placeholder,
						selected: 'selected'
					}
				}

				// Remove all old option
				$(vm.$el)
				.find('select')
				.empty()

				// Init new select2
				$(vm.$el)
				.find('select')
				.select2(select2Config)

				// Set old value
				$(vm.$el)
				.find('select')
				.val(vm.$props.value)
				.trigger('change')
			}
		},
		data() {
			return {
				validateRules: { 
					rules: { 
						required: typeof this.$props.value == 'object' ? false : this.$props.required,
						regex: /^.{1,1000}$/
						// numeric: true,
						// email: true 
					} 
				}
			}
		},
		methods: {
			optionValue(option) {
				if (option._id !== undefined) {
					return option._id
				}

				if (option.value !== undefined) {
					return option.value
				}

				if (option.id !== undefined) {
					return option.id
				}

				if (option.name !== undefined) {
					return option.name
				}

				if (option.title !== undefined) {
					return option.title
				}

				return option
			},
			optionText(option) {
				if (option.title !== undefined) {
					return option.title
				}

				if (option.name !== undefined) {
					return option.name
				}

				if (option.text !== undefined) {
					return option.text
				}

				return option
			}
		},
		computed: {
			
		},
		mounted() {
			let vm = this

			let data = vm.$props.options.map(option => { 
				return { 
					id: this.optionValue(option),
					text: this.optionText(option)
				} 
			})

			let select2Config = { 
				allowClear: true,
				width: '100%',
				data: data,
				placeholder: {
					id: '-1',
					text: vm.$props.placeholder,
					selected: 'selected'
				}
			}

			$(vm.$el)
			.find('select')

			// init select2
			.select2(select2Config)
			.val(vm.$props.value)
			.trigger('change')

			// emit event on change.
			.on('change', (e) => {
				vm.$validator.validateAll().then(result => {
					if (!result && vm.errors.items[0]) {
						vm.$emit('invalid', vm.errors.items[0].field, vm.errors.items[0].msg, vm.errors.items[0].rule, vm.errors.items[0].scope)
					} else {
						vm.$emit('valid', vm.$props.name, '__global__')
					}       			
				})

				let option, value = $(vm.$el).find('select').val()

				for (let i = 0; i < vm.$props.options.length; i++) {
					if (vm.$props.options[i]._id == value) {
						option = vm.$props.options[i]
					}
				}

				if (value == vm.$props.placeholder) {
					vm.$emit('input', null)
					vm.$emit('change', null, null, vm.$props.name)
				} else {
					// Not work with nested v-model look like <formData.example>
					vm.$emit('input', value)
					vm.$emit('change', value, option, vm.$props.name)
				}
			})

			// Khắc phục validate
			let x = 0
      let interval = setInterval(() => {
      	x++

      	if (x < 3) {
      		vm.$validator.validateAll().then(result => {
      			if (!result) {
      				vm.$emit('invalid', vm.errors.items[0].field, vm.errors.items[0].msg, vm.errors.items[0].rule, vm.errors.items[0].scope)
      			} else {
      				vm.$emit('valid', vm.$props.name, '__global__')
      			}       			
      		})
      	} else {
      		// vm.validateRules.rules.email = false
      		// vm.validateRules.rules.numeric = false
      		clearInterval(interval)
      	}
      }, 10)
		},
		updated() {
			// console.log('updated');
		},
		destroyed() {
			$(this.$el).find('select').off().select2('destroy')
		}
	}
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../../node_modules/select2/src/scss/core.scss";
</style>
