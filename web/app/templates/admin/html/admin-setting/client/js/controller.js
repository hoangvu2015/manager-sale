'use strict';

angular.module('settings').controller('SettingController', SettingController);

function SettingController (
  $stateParams, $location, $state, $timeout,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, Categories, SettingSvc, GeneralSvc, UploadSvc, bzUtilsSvc
  ) {

  var vmSetting = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmSetting, 'setting');
  vmSetting.value_types = Option.valueTypes();
  vmSetting.queryParams = $stateParams;
  vmSetting.gotoList = gotoList;

  vmSetting.value_boolean = [{
    name: 'True',
    value: true
  }, {
    name: 'False',
    value: false
  }];

  vmSetting.json_editor_opt = {
    mode: 'tree'
  };

  var tmp = {
    string: '',
    boolean: true,
    json: {
      "key": "value"
    },
    number: 0,
    date: new Date()
  };

  vmSetting.isOpen = {
    start_date: false
  };

  function gotoList() {
    $state.go('listSetting');
  }

  /*Start Upload Image*/
  vmSetting.fieldImages = [
  // 'image'
  ];
  
  vmSetting.uploadFile = uploadFile;
  vmSetting.removeImage = removeImage;
  vmSetting.cropImage = cropImage;

  vmSetting.changeValueType = changeValueType;
  vmSetting.changeValue = changeValue;
  vmSetting.openCalendar = openCalendar;
  vmSetting.prettyJson = prettyJson;
  vmSetting.changeOptions = changeOptions;
  vmSetting.uploadFileSetting = uploadFileSetting;
  vmSetting.cancelUpload = cancelUpload;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmSetting, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmSetting, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmSetting, files, type, nameField);
  }
  /*End Upload Image*/

  function changeValueType (value_type) {
    if (value_type == 'number') {
      vmSetting.input_value_type = 'number';
    } else {
      vmSetting.input_value_type = 'text';
    }
    var edit_mode = typeof(edit_mode) != 'undefined' ? edit_mode : false;
    var value = vmSetting.formData.value;
    value = tmp[value_type];
    vmSetting.formData.value = value;
  };

  function changeValue(value_type, value) {
    if (value_type == 'date') {
      tmp[value_type] = new Date(value).getTime().toString();
    } else {
      tmp[value_type] = value;
    }
  };

  function openCalendar() {
    vmSetting.isOpen.start_date = true;
  }

  function prettyJson(value_type, obj) {
    if (value_type == 'json') {
      vmSetting.changeValue('json', obj);
      delete obj['$$hashKey'];
      return angular.toJson(obj, true);
    }
    return null;
  };

  function changeOptions() {
    vmSetting.json_editor_opt.mode = vmSetting.json_editor_opt.mode == 'tree' ? 'code' : 'tree';
  };

  function uploadFileSetting(file, errFiles) {
    vmSetting.imageValidate = "";
    if (errFiles.length > 0) {
      vmSetting.imageValidate = "Vui lòng chọn tệp tin ảnh và kích thước không quá 10MB.";
    } else if (file) {
      var width = file.$ngfWidth,
      height = file.$ngfHeight;
      if (width > 250) {
        var ratio = width / 250;
        var optionsThumb = {
          width: 250,
          height: ratio * height
        };
        Upload.resize(file, optionsThumb).then(function(resizedFile) {
          vmSetting.f = resizedFile;
        });
      } else {
        vmSetting.f = file;
      }
      vmSetting.errFile = errFiles && errFiles[0];
    }
  };

  function cancelUpload(status) {
    vmSetting.f = null;
    vmSetting.errFile = null;
  };

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "setting.filterData";

  vmSetting.find = find;
  vmSetting.reset = reset;
  vmSetting.pageChanged = pageChanged;
  vmSetting.sellectAll = sellectAll;
  vmSetting.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmSetting.changeStatus = changeStatus;
  vmSetting.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmSetting.openPopupDeleteMulti = openPopupDeleteMulti;
  vmSetting.confirmMoveToTrash = confirmMoveToTrash;
  vmSetting.confirmDelete = confirmDelete;
  vmSetting.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmSetting);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(SettingSvc, vmSetting, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmSetting.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmSetting.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmSetting.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmSetting.currentPage,
      filter: vmSetting.search.filter,
      status: vmSetting.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmSetting.search.filter = "";
    vmSetting.search.status = "";
    vmSetting.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmSetting, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmSetting, page);
    GeneralSvc.setFilterToLocalStorage(vmSetting, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmSetting, vmSetting.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(SettingSvc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(SettingSvc, vmSetting, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(SettingSvc, vmSetting);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(SettingSvc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    vmSetting.fieldImages = ['value'];
    GeneralSvc.openPopupDeleteMulti(SettingSvc, vmSetting);
  }
  /*delete*/
  function confirmDelete(id) {
    vmSetting.fieldImages = ['value'];
    GeneralSvc.confirmDelete(SettingSvc, vmSetting, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(SettingSvc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmSetting.create = create;
  /*khai báo default field*/
  vmSetting.formData = {
    // status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmSetting.submitted = true;

    /*validate image*/
    if (vmSetting.formData.value_type == 'image' && !vmSetting.f) 
      vmSetting.imageValidate = "Please select an image file";
    if (vmSetting.formData.value_type == 'image' && !vmSetting.value) 
      isValid = true;
    if (vmSetting.imageValidate) 
      isValid = false;

    if (!isValid) return;
    GeneralSvc.showLoading(vmSetting);

    var file = vmSetting.f;
    if (file && vmSetting.formData.value_type == 'image') {
      file.upload = Upload.upload({
        url: vmSetting.apiUrl + "/upload/image",
        data: {
          file: file,
          type: 'settings'
        }
      });
      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
          console.log("Success:", response);
          vmSetting.formData.value = response.data.data.imgUrl;
          /*Create new object*/
          GeneralSvc.save(SettingSvc, vmSetting, type, 'editSetting');
        });
      }, function(response) {
        if (response.status > 0)
          console.log("Error:", response);
      });
    } else {
      /*format json*/
      vmSetting.formData.value = typeof(vmSetting.formData.value) == 'object' 
      ? JSON.stringify(vmSetting.formData.value) 
      : vmSetting.formData.value;

      /*format date*/
      if (vmSetting.formData.value_type == 'date') {
        vmSetting.formData.value = tmp['date'];
      }

      /*Create new object*/
      GeneralSvc.save(SettingSvc, vmSetting, type, 'editSetting');
    }
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmSetting.findOne = findOne;
  vmSetting.update = update;

  function parseSetting(input) {
    switch (input.value_type) {
      case 'boolean':
      if (input.value == 'false') 
        input.value = false;
      else
        input.value = true;
      break;
      case 'json':
      try {
        input.value = JSON.parse(input.value);
      } catch (e) {}
      break;
      case 'date':
      input.value = new Date(parseInt(input.value));
      break;
      case 'number':
      input.value = Number(input.value.toString());
      break;
    }
    return input.value;
  }

  /*Find existing*/
  function findOne() {
    if(!vmSetting.queryParams.id) return;
    
    GeneralSvc.showLoading(vmSetting);
    SettingSvc.get({
      id: $stateParams.id
    }, function(data) {

      /*Nếu có field image thì add vào đây*/
      vmSetting.formData = parseSetting(data);
      vmSetting.formData = {
        _id: data._id,
        key: data.key,
        value_type: data.value_type,
        value: parseSetting(data),
        description: data.description,
        status: data.status
      }

      tmp[vmSetting.formData.value_type] = vmSetting.formData.value;

      /*Gán giá trị image tại đây*/
      // _.map(vmSetting.fieldImages, function( value, key) {
      //   vmSetting.allFile[value] = data[value]
      // })
      GeneralSvc.hideLoading(vmSetting);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmSetting.submitted = true;
    console.log('test',vmSetting.imageValidate);

    if (vmSetting.formData.value_type == 'image' && !vmSetting.f) 
      vmSetting.imageValidate = "Please select an image file";
    if (vmSetting.formData.value_type == 'image' && !vmSetting.value) 
      isValid = true;
    if (vmSetting.imageValidate) 
      isValid = false;

    if (!isValid) return;
    GeneralSvc.showLoading(vmSetting);

    var file = vmSetting.f;
    if (file && vmSetting.formData.value_type == 'image') {
      file.upload = Upload.upload({
        url: vmSetting.apiUrl + "/upload/image",
        data: {
          file: file,
          type: 'settings',
          old_filename: (vmSetting.formData.value)?vmSetting.formData.value.split('/').pop():''
        }
      });
      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
          console.log("Success:", response);
          vmSetting.formData.value = response.data.data.imgUrl;
          /*Update doc*/
          GeneralSvc.updateDoc(SettingSvc, vmSetting, type);
        });
      }, function(response) {
        if (response.status > 0)
          console.log("Error:", response);
      });
    } else {
      /*format json*/
      vmSetting.formData.value = typeof(vmSetting.formData.value) == 'object' 
      ? JSON.stringify(vmSetting.formData.value) 
      : vmSetting.formData.value;

      /*format date*/
      if (vmSetting.formData.value_type == 'date') {
        vmSetting.formData.value = tmp['date'];
      }
      /*Update doc*/
      GeneralSvc.updateDoc(SettingSvc, vmSetting, type);
    }
  };
  /*================================END UPDATE========================================*/
}