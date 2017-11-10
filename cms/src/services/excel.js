class Excel {
	constructor(fields, data, vm, name = 'data.xls') {
    this.vm = vm;
    this.data = data;
    this.name = name;
    this.keys = [];
    this.fields = fields;
  }

  detectHeader(field) {
  	if (field.title) {
  		return String(field.title).toUpperCase()
  	}

  	if (field.name) {
  		return String(field.name).toUpperCase()
  	}

  	return String(field).toUpperCase()
  }

	emitXmlHeader() {
		let headerRow =  '<tr>\n';
		if (Array.isArray(this.fields)) {
			for (let field of this.fields) {
				if (typeof field != 'object' || typeof field.name != 'string' || field.name.match(/^(__).*$/i)) {
					continue;
				}

				this.keys.push({
					field: field.name,
					callback: field.callback
				})

				headerRow += '  <th>\n';
				headerRow += this.detectHeader(field) + '\n';
				headerRow += '  </th>\n';
			}
		} else {
			for (let field in this.fields) {
				if (typeof this.fields[field] == 'object' && this.fields[field].name.match(/^(__).*$/i)) {
					continue;
				}

				let header

				if (typeof this.fields[field] == 'object') {
					this.keys.push({
						field: this.fields[field].name,
						callback: this.fields[field].callback
					})

					header = this.detectHeader(this.fields[field])
				} else if (typeof this.fields[field] == 'string' && !this.fields[field].match(/^(__).*$/i) && isNaN(Number(field))) {
					this.keys.push({
						field: field
					})

					header = this.detectHeader(field)
				}

				if (header) {
					headerRow += '  <th>\n';
					headerRow += header + '\n';
					headerRow += '  </th>\n';
				}
			}
		}


		headerRow += '</tr>\n';
		return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Data</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>\n' +
		'<thead>\n\n' +
		headerRow+
		'</thead>\n\n'+
		'</tbody>\n';
	}

	emitXmlFooter() {
		return '\n</tbody>\n' +
		'</table>\n'+
		'</body>\n'+
		'</html>\n';
	}

	processRow(row, keys) {
		return keys.reduce((obj, key) => {
			let value = row[key.field]
			if (key.callback) {
				if(typeof(key.callback) == 'function') {
					return obj[key.field] = key.callback(value), obj
				}

				let args = key.callback.split('|')
				let func = args.shift()

				if (typeof this.vm[func] === 'function') {

					if (args.length > 0) {
						return obj[key.field] = this.vm[func].apply(this.vm, [value].concat(args)), obj
					} else {
						return obj[key.field] = this.vm[func].call(this.vm, value), obj
					}
				}
			}

			return obj[key.field] = row[key.field], obj
		}, {})
	}

	jsonToHtml(jsonObject) {
		let i;
		let col;
		let xml = this.emitXmlHeader();
		let data = typeof jsonObject != "object"
		? JSON.parse(jsonObject)
		: jsonObject;

		for (i = 0; i < data.length; i++) {
			let row = this.processRow(data[i], this.keys)

			xml += '<tr>\n';

			for (col in row) {
				xml += '  <td>\n';
				xml += String(row[col])+ '\n';
				xml += '  </td>\n';
			}

			xml += '</tr>\n';
		}

		xml += this.emitXmlFooter();
		return xml;
	}

	export() {
		let a = document.createElement('a');
		let uri = 'data:application/vnd.ms-excel;base64,', base64 = (s) => { return window.btoa(unescape(encodeURIComponent(s))) }
		
		a.className = 'none';
		a.download = this.name;
		a.href = uri + base64(this.jsonToHtml(this.data));
		a.click();
		a.remove();
	}
}


export default Excel;
