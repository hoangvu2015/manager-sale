'use strict'

import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import Boom from 'boom'
import async from 'async'
import mongoose from 'mongoose'
import File from '../../../../utils/File'
import BaseApi from '../../../../utils/BaseApi'
const EmailCampaign = mongoose.model('EmailCampaign')
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js')

const get = (request, reply) => {
	// let populate = {}
	// let API = new BaseApi(EmailCampaign, request, reply, populate)
	let API = new BaseApi(EmailCampaign, request, reply)
  return API.getAll()
}

const edit = (request, reply) => {
	let populate = {}
	let API = new BaseApi(EmailCampaign, request, reply, populate)
  return API.getItem()
}

const update = (request, reply) => {
	let configManager = request.server.configManager
	let settings = configManager.get('web.context.settings')
	let uploadPath = configManager.get('web.upload.path')

	let item = request.pre.emailCampaign
	let oldItem = _.assignIn({}, item)
	_.assignIn(item, request.payload)

  let newTemplatePath = path.join(uploadPath, item.templatePath)
  let oldTemplatePath = path.join(uploadPath, oldItem.templatePath)

  let saveItem = (item) => {
  	(item.save())
  	.then(item => {
  		return reply({
  			data: item,
  			status: true,
  			message: 'Save email campaign successful!'
  		})
  	})
  	.catch(err => {
  		request.log(['error', 'EmailCampaign-save'], err)
  		return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)))
  	})
  }

  if (newTemplatePath != oldTemplatePath) {
  	File
  	.deleteDirectory(oldTemplatePath)
  	.then((done) => {
  		processContentTemplates(item, newTemplatePath, settings, (result, err) => {
  			if (err) {
  				request.log(['error', 'EmailCampaign-save'], err)
  				return reply(err)
  			}

  			return saveItem(result)  			
  		})
  	})
  	.catch(err => {
  		request.log(['error', 'EmailCampaign-update'], err)
  		return reply(JSON.stringify(err))
  	})
  } else {
  	return saveItem(item)  			
  }
}

const save = (request, reply) => {
	let configManager = request.server.configManager
	let settings = configManager.get('web.context.settings')
	let uploadPath = configManager.get('web.upload.path')

	let newItem = new EmailCampaign(request.payload)

  let fullPath = path.join(uploadPath, newItem.templatePath)

	return processContentTemplates(newItem, fullPath, settings, (result, err) => {
		if (err) {
			request.log(['error', 'EmailCampaign-save'], err)
			return reply(err)
		}

    let API = new BaseApi(EmailCampaign, request, reply)

    API
    .makeSlug(result.slug, (slug, err) => {
      if (err) {
        return reply(err)
      }
      
      result.slug = slug;

      (result.save())
      .then(item => {
        return reply({
          data: item,
          status: true,
          message: 'Save email campaign successful!'
        })
      })
      .catch(err => {
        request.log(['error', 'EmailCampaign-save'], err)
        return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)))
      })
    })
	})
}

const processContentTemplates = (record, templatePath, settings, callback) => {
	fs.readdir(templatePath, (err, files) => {
		if (err) {
			return callback(record, err)
		}

		record.templates = []
		for (let i = 0; i < files.length; i++) {
			if (path.extname(files[i]) == '.html') {
				let filePath = path.join(templatePath, files[i])
				record.templates.push(files[i])

				fs.readFile(filePath, 'utf8', (err, data) => {
					if (err) {
						return callback(record, err)
					}

					// settings.services.webUrl
					let result = data.replace(/(src="(.\/|\/))/i, `src="${settings.services.webUrl}/files/${record.templatePath}/`)

					fs.writeFile(filePath, result, 'utf8', (err) => {
						if (err) {
							return callback(record, err)
						}
					})
				})
			}

			if (i == files.length - 1) {
				return callback(record)
			}
		}
	})
}

const moveToTrashItems = (request, reply) => {
  let API = new BaseApi(EmailCampaign, request, reply)
  API.moveToTrashItems()
}

const publishItems = (request, reply) => {
  let settingCtrl = new BaseApi(EmailCampaign, request, reply)
  settingCtrl.publishItems()
}

const unPublishItems = (request, reply) => {
  let API = new BaseApi(EmailCampaign, request, reply)
  API.unPublishItems()
}

const deleteItems = (request, reply) => {
  // let API = new BaseApi(EmailCampaign, request, reply)
  // API.deleteItems()
  let filterIds = request.payload.ids
  EmailCampaign
  .find({
  	_id: {
  		$in: filterIds
  	}
  })
  .then((items) => {
  	let templatePaths = []

  	async.each(items, (item, callback) => {
  		item
  		.remove()
  		.then(done => {
  			templatePaths.push(item.templatePath)
  			callback()
  		})
  		.catch(err => {
  			callback(err)
  		})
  	}, (err) => {
  		if (err) {
  			request.log(['error', 'EmailCampaign-delete'], err)
  			return reply(Boom.badRequest('Xóa không thành công. Đã có lỗi xảy ra.'))
  		} else {
  			File
  			.deleteDirectories(templatePaths)
  			.then(done => {
  				return reply({
  					status: 1,
  					data: items,
  					message: 'Remove success'
  				})
  			})
  			.catch(err => {
  				console.log(err);
  				request.log(['error', 'EmailCampaign-deletePathFail'], err)
  				return reply(Boom.badRequest('Đã xảy ra lỗi. Xóa thư mục chứa template không thành công.'))
  			})
  		}
  	})
  })
}

export default {
	get,
	edit,
	update,
	save,
	moveToTrashItems,
	publishItems,
	unPublishItems,
	deleteItems
}