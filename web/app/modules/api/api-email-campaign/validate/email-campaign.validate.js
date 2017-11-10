import Joi from 'joi'

export default {
	send:{
		payload: {
			id: Joi.string().required(),
			subject: Joi.string().required(),
			template: Joi.string().required(),
			email: Joi.array().items(Joi.string().email())
		},
		options: {
			allowUnknown: true
		}
	}
}