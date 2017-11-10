"use strict";

import Joi from 'joi';

const <%= modelName %>Val = {
  save: {
    payload: {<% for (key in formInfo) { %>
      <%= key %>: Joi.any().optional().description('<%= formInfo[key].label %>'),<% } %>
      status: Joi.number().required().description('Status')
    },
    options: {
      allowUnknown: true
    }
  },
  update: {
    payload: {
      _id: Joi.string().required().description('MongoID'),<% for (key in formInfo) { %>
      <%= key %>: Joi.any().optional().description('<%= formInfo[key].label %>'),<% } %>
      status: Joi.number().required().description('Status')
    },
    options: {
      allowUnknown: true
    }
  },
};

export default {
  <%= modelName %>Val
}
