<template>
	<date-picker :date="value" :limit="limit" :option="option">
	</date-picker>
</template>

<script>
import Datepicker from 'vue-datepicker/vue-datepicker-es6.vue'
import { bzDatetime } from 'filters';
var moment = require('moment');


export default {
	components: {
		'date-picker': Datepicker
	},
	watch: {
		'value.time': function(newVal) {
			if (this.type == 'multi-day') {
				if (typeof newVal == 'string') {
					newVal = newVal.split(',');
				}
				newVal.map(item => {
					return moment(item, this.option.format).toDate()
				})
				this.$emit('input', newVal);
			}
			else {
				var time = moment(newVal, this.option.format).toDate();
				if (time != 'Invalid Date') {
					this.$emit('input', time);
				}

			}
		},
		'initValue': function(newVal) {
			if (this.type != 'multi-day') {
				var time = moment(newVal, this.option.format).toDate();
				if (time != 'Invalid Date') {
					this.value.time = time;
				}
			}
			else {
				this.value.time = newVal;
			}
		}
	},
	props: {
		label: {
			type: String,
			default: 'Datetime'
		},
		required: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: function() {
				return 'min';
			}
		},
		limit: {
			type: [Date, String, Object, Array],
		},
		initValue: {
			type: [Date, String, Array],
			default: null
		},
	},
	data() {
		return {
			value: {
				time: ''
			},
			option: {
				type: 'min', // 'min', day', 'multi-day'
				week: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
				month: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
				format: 'DD/MM/YYYY HH:mm',
				placeholder: 'Select date & time',
				inputStyle: {
					'display': 'block',
					'background': 'none',
					'padding': '0.125rem 0.125rem 0.0625rem',
					'font-size': '1rem',
					'border-width': '0',
					'border-color': 'transparent',
					'line-height': '1.9',
					'width': '100%',
					'-webkit-transition': 'all 0.28s ease',
					'transition': 'all 0.28s ease',
					'-webkit-box-shadow': 'none',
					'box-shadow': 'none',
					'color': 'black'
				},
				wrapperClass: '',
				color: {
					header: '#1e88e5',
					headerText: 'white'
				},
				buttons: {
					ok: 'Ok',
					cancel: 'Cancel'
				},
				overlayOpacity: 0.5, // 0.5 as default
				dismissible: true // as true as default
			},
			timeoption: {
				type: 'min',
				week: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
				month: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
				format: 'YYYY-MM-DD HH:mm'
			},
			multiOption: {
				type: 'multi-day',
				week: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
				month: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
				format: "YYYY-MM-DD HH:mm"
			},
		}
	},
	methods: {

	},
	mounted() {

	},
	created() {
		var formatStr = 'DD/MM/YYYY HH:mm';
		switch (this.type) {
			case 'day':
			case 'date':
				this.option.type = 'day';
				formatStr = 'DD/MM/YYYY';
				break;
			case 'multi-day':
				formatStr = 'DD/MM/YYYY';
				this.option.type = 'multi-day';
				this.value = { time: this.initValue };
				break;
			default:
				this.option.type = 'min';
				break;
		}
		if (this.type != 'multi-day') {
			this.option.format = formatStr;
			var time = moment(this.initValue).format(formatStr);
			if (time != 'Invalid date') {
				this.value = { time };
			}
		}
	},
	filters: {
		bzDatetime
	}
}
</script>

<style lang="scss">
.cov-vue-date {
	width: 100%;
}

.hour-item,
.min-item {
	padding: 0px;
	font-size: 30px;
}
</style>