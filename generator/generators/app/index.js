'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const pack = require('./../../package.json');
const stringifyObject = require('stringify-object');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    if(opts == 'json'){
      this.option('json');
    }
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine ' + chalk.green(pack.name) + ' generator!'
      ));

    let prompts = [];

    if(this.options.json){
      prompts = [{
        type: 'input',
        name: 'module',
        // default: 'default',
        message: 'Bạn hãy nhập tên module vào đây (không dấu cách và kí tự đăt biệt)?',
      },{
        type: 'input',
        name: 'fileJson',
        message: 'Bạn hãy nhập tên file json vào đây (không dấu cách và kí tự đăt biệt)?',
      }];
    }else{
      prompts = [{
        type: 'input',
        name: 'module',
        // default: 'default',
        message: 'Bạn hãy nhập tên module vào đây (không dấu cách và kí tự đăt biệt)?',
      }];
    }

    

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    /*Validate props*/
    if(!this.props || !this.props.module){
      this.log(chalk.red('Bạn chưa nhập tên module!!!'));
      return;
    }

    if(this.options.json){
      if(!this.props.fileJson ){
        this.log(chalk.red('Bạn chưa nhập tên file json!!!'));
        return;
      }
    }
    
    /*Format Props*/
    this.props.module = this.props.module.replace(/[^a-zA-Z0-9]/g, '');
    function capitalize(s){return s && s[0].toUpperCase() + s.slice(1);}
    var module = {
      moduleName: this.props.module.toLowerCase(),
      moduleNameUpper:  this.props.module.toUpperCase(),
      modelName:  capitalize(this.props.module)
    };

    /*Xử lý nếu có file json*/
    var contentJson = {};
    if(this.props && this.props.fileJson){
      try{
        contentJson = require(`../../json/${this.props.fileJson}.json`);
      }catch(e){
        console.log(e);
        this.log(chalk.red('Lỗi định dạng file json hoặc file không tồn tại!!!'));
        return;
      }
    }else{
      contentJson = require('../../json/default.json');
    }
    /*xử lý modelSchema*/
    var modelSchema = {};
    var formInfo = {};

    for (let k in contentJson) {
      if (contentJson.hasOwnProperty(k)) {
        modelSchema[k] = contentJson[k].schema;
        formInfo[k] = contentJson[k].form;
      }
    }

    /*add field status*/
    modelSchema.status = {
      type: 'Number',
      default: 1
    };

    modelSchema = stringifyObject(modelSchema,{
      transform: (obj, prop, originalResult) => {
        if (prop === 'type')
          return originalResult.replace(/\'/g, '');
        else
          return originalResult;
      }
    });

    /*=================START CREATE MODEL================*/

    /*Model*/
    this.fs.copyTpl(
      this.templatePath('modules/api/_api/_model/_.model.js'),
      this.destinationPath('../web/app/modules/api/api-'+module.moduleName+'/model/'+module.moduleName+'.model.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName,
        modelSchema: modelSchema
      });

    /*=================END CREATE MODEL================*/

    /*=================START ADMIN MODULE================*/

    /*index.js*/
    this.fs.copyTpl(
      this.templatePath('modules/admin/_admin/_index.js'),
      this.destinationPath('../web/app/modules/admin/admin-'+module.moduleName+'/index.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName
      });

    /*Validate*/
    this.fs.copyTpl(
      this.templatePath('modules/admin/_admin/_validate/_.validate.js'),
      this.destinationPath('../web/app/modules/admin/admin-'+module.moduleName+'/validate/'+module.moduleName+'.validate.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName,
        formInfo: formInfo
      });

    /*Controller*/
    this.fs.copyTpl(
      this.templatePath('modules/admin/_admin/_controller/_.controller.js'),
      this.destinationPath('../web/app/modules/admin/admin-'+module.moduleName+'/controller/'+module.moduleName+'.controller.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName
      });

    /*=================END ADMIN MODULE================*/

    /*=================START ANGULAR ADMIN MODULE================*/

    /*config.js*/
    this.fs.copyTpl(
      this.templatePath('cms-angular/_admin/client/js/config.js'),
      this.destinationPath('../web/app/templates/admin/html/admin-'+module.moduleName+'/client/js/config.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName
      });

    /*service.js*/
    this.fs.copyTpl(
      this.templatePath('cms-angular/_admin/client/js/service.js'),
      this.destinationPath('../web/app/templates/admin/html/admin-'+module.moduleName+'/client/js/service.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName
      });

    /*controller.js*/
    this.fs.copyTpl(
      this.templatePath('cms-angular/_admin/client/js/controller.js'),
      this.destinationPath('../web/app/templates/admin/html/admin-'+module.moduleName+'/client/js/controller.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName,
        formInfo: formInfo
      });

    /*list.js*/
    this.fs.copyTpl(
      this.templatePath('cms-angular/_admin/client/template/list.html'),
      this.destinationPath('../web/app/templates/admin/html/admin-'+module.moduleName+'/client/template/list.html'),{
        moduleName: module.moduleName,
        modelName: module.modelName,
        formInfo: formInfo
      });

    /*form.js*/
    this.fs.copyTpl(
      this.templatePath('cms-angular/_admin/client/template/form.html'),
      this.destinationPath('../web/app/templates/admin/html/admin-'+module.moduleName+'/client/template/form.html'),{
        moduleName: module.moduleName,
        modelName: module.modelName,
        formInfo: formInfo
      });
    
    /*menu.js*/
    this.fs.copyTpl(
      this.templatePath('cms-angular/_admin/client/template/menu.html'),
      this.destinationPath('../web/app/templates/admin/html/admin-'+module.moduleName+'/client/template/menu.html'),{
        moduleName: module.moduleName,
        modelName: module.modelName
      });

    /*Change content file menu sidebar-left.html*/
    fs.appendFile(
      '../web/app/templates/admin/layouts/partials/sidebar-left.html',
      '\n<% include \"admin/html/admin-'+module.moduleName+'/client/template/menu.html\" %>',
      function (err) {
        if (err) return console.log(err);
        console.log('Saved!');
      });

    /*=================END ANGULAR ADMIN MODULE================*/

    /*=================START VUE CMS MODULE================*/

    /*Đăng ký route*/
    this.fs.copyTpl(
      this.templatePath('cms-vue/router.js'),
      this.destinationPath('../cms/src/store/modules/menu/'+module.moduleName+'.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName
      });

    /*Đăng ký Component*/
    this.fs.copyTpl(
      this.templatePath('cms-vue/component/_/data/fields.js'),
      this.destinationPath('../cms/src/components/'+module.moduleName+'s/data/fields.js'),{
        moduleName: module.moduleName,
        modelName: module.modelName,
        formInfo: formInfo
      });

    this.fs.copyTpl(
      this.templatePath('cms-vue/component/_/List.vue'),
      this.destinationPath('../cms/src/components/'+module.moduleName+'s/List.vue'),{
        moduleName: module.moduleName,
        modelName: module.modelName,
        moduleNameUpper: module.moduleNameUpper
      });

    this.fs.copyTpl(
      this.templatePath('cms-vue/component/_/Detail.vue'),
      this.destinationPath('../cms/src/components/'+module.moduleName+'s/Detail.vue'),{
        moduleName: module.moduleName,
        modelName: module.modelName,
        moduleNameUpper: module.moduleNameUpper,
        formInfo: formInfo
      });

    /*Change content file service + inject module*/
    fs.appendFile(
      '../cms/src/services/url.js',
      '\nexport const API_'+module.moduleNameUpper+' = window.adminUrl + \'/'+module.moduleName+'\';', 
      function (err) {
        if (err) return console.log(err);
        console.log('Saved!');
      });

    var file = fs.createReadStream('../cms/src/store/modules/menu/index.js', 'utf8');
    var newContent = '';
    file.on('data', function (chunk) {
      newContent += chunk.toString().replace(/\/\*generator import module\*\//g, 'import '+module.moduleName+' from \'./'+module.moduleName+'\'\n\/\*generator import module\*\/')
      .replace(/\/\*generator inject module\*\//g, '\/\*generator inject module\*\/\n\t\t'+module.moduleName+',');
    });

    file.on('end', function () {
      fs.writeFile('../cms/src/store/modules/menu/index.js', newContent, function(err) {
        if (err)
          return console.log(err);
        else
          console.log('Updated content file service + inject module!');
      });
    });

    /*=================END VUE CMS MODULE================*/

    this.log(chalk.green('Bạn đã tạo module '+module.moduleName+' thành công!!!'));
  }
};



