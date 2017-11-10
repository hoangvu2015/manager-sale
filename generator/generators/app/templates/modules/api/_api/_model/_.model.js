'use strict';

/**
* Module dependencies.
*/

import mongoose from 'mongoose'
import slug from 'slug'
var Schema = mongoose.Schema;

/**
*  <%= modelName %> Schema
*/
var <%= modelName %>Schema = new Schema(<%- modelSchema %>, { collection: '<%= moduleName %>s', timestamps: true });

export default mongoose.model('<%= modelName %>', <%= modelName %>Schema);
