'use strict';
angular.module('core')
.factory("Notice", Notice)
.service('bzUtilsSvc', bzUtilsSvc)
.service('GeneralSvc', GeneralSvc)
.service('UploadSvc', UploadSvc)
.service('Menus', Menus);

function UploadSvc($resource) {
  return $resource(window.settings.services.apiUrl + '/upload/:id', {
    id: '@_id'
  }, {
    upload: {
      url: window.settings.services.apiUrl + '/upload/image',
      method: 'POST',
    },
    moveTmptoModule: {
      url: window.settings.services.apiUrl + '/upload/moveTmptoModule',
      method: 'POST',
    },
    removeFile: {
      url: window.settings.services.apiUrl + '/upload/removeFile',
      method: 'POST',
    }
  });
}

function GeneralSvc($state, $timeout, $uibModal, toastr, dialogs, localStorageService, Option, UploadSvc, Upload, Categories){
  return {
    initModule: initModule,
    showLoading: showLoading,
    hideLoading: hideLoading,
    sellectAll: sellectAll,
    setPage: setPage,
    getFilterToLocalStorage: getFilterToLocalStorage,
    setFilterToLocalStorage: setFilterToLocalStorage,
    setScopeAfterQuery: setScopeAfterQuery,
    getListData: getListData,
    changeStatus: changeStatus,
    openPopupChangeStatusMulti: openPopupChangeStatusMulti,
    openPopupMoveToTrashMulti: openPopupMoveToTrashMulti,
    confirmMoveToTrash: confirmMoveToTrash,
    processChangeStatus: processChangeStatus,
    openPopupDeleteMulti: openPopupDeleteMulti,
    confirmDelete: confirmDelete,
    putback: putback,
    save: save,
    updateDoc: updateDoc,
    removeImage: removeImage,
    checkRemoveFile: checkRemoveFile,
    uploadFile: uploadFile,
    cropImage: cropImage,
  };

  function initModule(Ctl, module){
    /*khai báo biến cho module*/
    Ctl.isLoading = false;
    Ctl.currentPage = 1;
    Ctl.rowsSelected = {};
    Ctl.search = {};
    Ctl.apiUrl = window.settings.services.apiUrl;
    Ctl.uploadApi = window.settings.services.uploadApi;
    Ctl.webUrl = window.settings.services.webUrl;
    Ctl.statuses = Option.getStatus();
    Ctl.tinymceOptions = Option.tinymceOptions();

    /*khai báo field upload file*/
    Ctl.pathFileTmp = 'tmp/'+module;
    Ctl.pathFile = module;
    Ctl.fileTmp = {};
    Ctl.fileProgress = {};
    Ctl.fileRemove = [];
    Ctl.allFile = {};
  }

  function showLoading(Ctl) {
    Ctl.isLoading = true;
  }

  function hideLoading(Ctl) {
    $timeout(function() {
      Ctl.isLoading = false;
    }, 500);
  }

  function setPage(Ctl, pageNo) {
    Ctl.currentPage = pageNo;
  };

  function sellectAll(Ctl, list) {
    var rowsSelected = {};
    if (Ctl.selectAll) {
      var items = list;
      items.forEach(function(item) {
        rowsSelected[item._id] = true;
      });
    }
    Ctl.rowsSelected = rowsSelected;
  }

  function getFilterToLocalStorage(Ctl, localStorageName) {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      Ctl.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        Ctl.search.filter = filterData.search.filter ? filterData.search.filter : "";
        Ctl.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }

  function setFilterToLocalStorage(Ctl, localStorageName) {
    localStorageService.set(localStorageName, {
      currentPage: Ctl.currentPage,
      search: Ctl.search
    });
  }

  function setScopeAfterQuery(Ctl, data) {
    Ctl.listItems = data.data;
    Ctl.totalItems = data.total;
    Ctl.totalPage = data.last_page;
    Ctl.itemsPerPage = data.itemsPerPage;
    Ctl.numberVisiblePages = data.numberVisiblePages;
  }

  function getListData(Service, Ctl, options) {
    Ctl.rowsSelected = {};
    Service.query(options, function(data) {
      setScopeAfterQuery(Ctl, data);
      hideLoading(Ctl);
    });
  }

  // Change status
  function changeStatus(Service,ids, status) {
    if (status == 1) {
      var dlg = dialogs.confirm('Confirm', 'Do you want to change status from <b>Publish</b> to <b>Unpublish</b>?', {animation: true, size: 'sm'});
      dlg.result.then(function(btn){
        processChangeStatus(Service, ids, status);
      })
    } else {
      var dlg = dialogs.confirm('Confirm', 'Do you want to change status from <b>Unpublish</b> to <b>Publish</b>?', {animation: true, size: 'sm'});
      dlg.result.then(function(btn){
        processChangeStatus(Service, ids, status);
      })
    }
  }

  // change Multi status
  function openPopupChangeStatusMulti (Service, Ctl, status) {
    var dlg = dialogs.confirm('Confirm', 'Do you want to change status these items?', {animation: true, size: 'sm'});
    dlg.result.then(function(btn){
      if(status != 1)
        status = 1;
      else
        status = 0;

      if (angular.equals({}, Ctl.rowsSelected)) {
        toastr.warning('Choose Items before change status', 'Warning');
      }else{
        var filter_ids = [];
        _.map(Ctl.rowsSelected, function(key, value) {
          if (key) 
            filter_ids.push(value);
        });
        processChangeStatus(Service, filter_ids, status);
      }
    })
  }

  // move to trash Multi
  function openPopupMoveToTrashMulti(Service, Ctl) {
    var dlg = dialogs.confirm('Alert', 'Do you want to move to trash these items?', {animation: true, size: 'sm'});
    dlg.result.then(function(btn){
      if (angular.equals({}, Ctl.rowsSelected)) {
        toastr.warning('Choose Items before move to trash', 'Warning');
      }else{
        var filter_ids = [];
        _.map(Ctl.rowsSelected, function(key, value) {
          if (key) 
            filter_ids.push(value);
        });
        processChangeStatus(Service, filter_ids, 2, 'trash');
      }
    })
  }

  // move to trash
  function confirmMoveToTrash(Service, id) {
    var dlg = dialogs.confirm('Alert', 'Do you want to move to trash?', {animation: true, size: 'sm'});
    dlg.result.then(function(btn){
      processChangeStatus(Service, id, 2, 'trash');
    })
  }

  function processChangeStatus(Service, ids, status, type){
    if(type == 'trash'){
      Service.moveToTrashItems({ids: ids}, function(response) {
        if (response.status) {
          $state.reload();
          toastr.success(response.message, 'SUCCESS');
        }
      });
      return;
    }

    if(status != 1){
      Service.publishItems({ids: ids}, function(response) {
        if (response.status) {
          $state.reload();
          toastr.success(response.message, 'SUCCESS');
        }
      });
    }else{
      Service.unPublishItems({ids: ids}, function(response) {
        if (response.status) {
          $state.reload();
          toastr.success(response.message, 'SUCCESS');
        }
      });
    }
  }

  /*Xóa object file*/
  function removeObjectFile(doc, fieldImages){
    if(fieldImages.length>0){
      _.map(fieldImages, function( value, key) {

        if(Array.isArray(doc[value])){
          _.map(doc[value], function(val, ind){
            removeFile(doc[value][ind]);
          })
        }
        if(typeof doc[value] === 'string' && doc[value].length>0)
          removeFile(doc[value]);
      })
    }
  }

  /*Xóa pathFile*/
  function removeFile(filePath){
    var dataRemove = {
      filePath: filePath.substring(6, filePath.length)
    };
    UploadSvc.removeFile({ data:dataRemove }, function(resp){});
  }

  // delete multi
  function openPopupDeleteMulti(Service, Ctl) {
    var dlg = dialogs.confirm('Alert', 'Do you want to delete permanent?', {animation: true, size: 'sm'});
    dlg.result.then(function(btn){
      if (angular.equals({}, Ctl.rowsSelected)) {
        toastr.warning('Choose Items before Delete', 'Warning');
      }else{
        var filter_ids = [];
        _.map(Ctl.rowsSelected, function(key, value) {
          if (key) 
            filter_ids.push(value);
        });
        Service.deleteItems({ids: filter_ids}, function(response) {
          if (response.status) {
            /*Xóa file trong doc*/
            _.map(response.data, function( value, key) {
              removeObjectFile(value, Ctl.fieldImages);
            })
            /*Reload lại state*/
            $state.reload();
            toastr.success(response.message, 'SUCCESS');
          }
        });
      }
    })
  }

  /*delete Vĩnh viễn*/
  function confirmDelete(Service, Ctl, id) {
    var dlg = dialogs.confirm('Alert', 'Do you want to delete permanent?', {animation: true, size: 'sm'});
    dlg.result.then(function(btn){
      /*Xóa record*/
      Service.deleteItems({ids: [id]}, function(response) {
        if (response.status) {
          /*Xóa file trong doc*/
          _.map(response.data, function( value, key) {
            removeObjectFile(value, Ctl.fieldImages);
          })
          /*Reload lại state*/
          $state.reload();
          toastr.success(response.message, 'SUCCESS');
        }
      });
    })
  }

  /*putback*/
  function putback(Service, id) {
    Service.unPublishItems({ids: id}, function(response) {
      if (response.status) {
        $state.reload();
        toastr.success('Put back success!', 'SUCCESS');
      }
    }, function(errorResponse) {
      toastr.error(errorResponse.data.message, 'Error');
    });
  }

  /*SAVE*/
  function save(Service, Ctr, type, editState){
    /*Create new object*/
    var save = function(){
      var doc = new Service(Ctr.formData);
      doc.$save(function(response) {
        hideLoading(Ctr);
        Ctr.submitted = false;
        if (response.data._id) {
          toastr.success("Create success!", "Success");
          if (type == 'save&list')
            Ctr.gotoList();
          else 
            $state.go(editState, { id: response.data._id });
        }else {
          toastr.error(response.message, "Error");
        }
      }, function(errorResponse) {
        console.log('errorResponse',errorResponse);
        hideLoading(Ctr);
        Ctr.submitted = false;
        toastr.error(errorResponse.data.message, "Error");
      });
    }

    /*Di chuyển file trong thư mục tmp vào module để tránh bị thừa file và xóa file cũ*/
    UploadSvc.moveTmptoModule({ data : Ctr.allFile, fileRemove: Ctr.fileRemove},function(resp){
      _.map(resp.data,function( value, key) {
        Ctr.formData[key] = value;
      })
      save();
    });
  }
  
  /*UPDATE*/
  function updateDoc(Service, Ctl, type){
    var updateDoc = function(){
      var doc = new Service(Ctl.formData);
      doc.$update(function(response) {
        hideLoading(Ctl);
        Ctl.submitted = false;

        if (response.error) {
          toastr.error(response.message, 'Error');
        } else {
          toastr.success("Update success!", 'SUCCESS');
          if (type == 'save&list') {
            Ctl.gotoList();
          } else {
            $state.reload();
          }
        }
      }, function(errorResponse) {
        hideLoading(Ctl);
        Ctl.submitted = false;
        toastr.error(errorResponse.data.message, 'ERROR');
      });
    }

    /*Di chuyển file trong thư mục tmp vào module để tránh bị thừa file và xóa file cũ*/
    UploadSvc.moveTmptoModule({ data : Ctl.allFile, fileRemove: Ctl.fileRemove },function(resp){
      _.map(resp.data,function( value, key) {
        Ctl.formData[key] = value;
      })
      updateDoc();
    });
  }

  /*UPLOAD FILE*/
  function removeImage(Ctl, type, fieldName, key){
    var dataRemove = {};
    if(type === 'single'){
      checkRemoveFile(Ctl, Ctl.allFile[fieldName], fieldName);
      Ctl.allFile[fieldName] = null;
    }else if(type === 'multi'){
      checkRemoveFile(Ctl, Ctl.allFile[fieldName][key], fieldName);
      Ctl.allFile[fieldName].splice(key,1);
    }else{
      toastr.error('failed', 'ERROR');
      return;
    }
  }

  function checkRemoveFile(Ctl, linkFile, fieldName){
    /*nếu file nằm trong tmp có thể xóa ngay, ngược lại push vào trong mảng fileRemove*/
    if(linkFile.substr(0,10) == 'files/tmp/'){
      removeFile(linkFile);
    }
    else{
      Ctl.fileRemove.push(linkFile);
    }
  }

  function uploadFile(Service, Ctl, files, type, fieldName){
    if(files){
      angular.forEach(files, function(file) {
        var data = {
          file: file, 
          type: Ctl.pathFileTmp + '/' + fieldName
        }
        /*replace file nếu file đã tồn tại*/
        if(type == 'single'){
          if(Ctl.allFile[fieldName])
            data.old_filename = Ctl.allFile[fieldName].split('/').pop();
          /*Nếu không phải trong tmp thì đưa vào stack remove file*/
          if(Ctl.allFile[fieldName] && Ctl.allFile[fieldName].substr(0,10) !== 'files/tmp/')
            Ctl.fileRemove.push(Ctl.allFile[fieldName]);
        }
        /*Upload*/
        Service.upload({
          url: window.settings.services.apiUrl + '/upload/image',
          data: data,
        })
        .then(function (resp) {
          Ctl.fileTmp[fieldName] = undefined;
          $timeout(function () {
            if(type == 'multi'){
              if(typeof Ctl.allFile[fieldName] == 'undefined')
                Ctl.allFile[fieldName] = [];
              Ctl.allFile[fieldName].push(resp.data.data.imgUrl);
            }
            else if(type == 'single'){
              Ctl.allFile[fieldName] = resp.data.data.imgUrl;
            }
          });
        }, function (error) {
          if (error.status > 0)
            toastr.error(error.data.message, 'ERROR');
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          if(type == 'multi')
            Ctl.fileProgress[fieldName] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          else if(type == 'single')
            Ctl.fileProgress[fieldName] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      });
    }
  }

  function cropImage(Ctl, type, fieldName, key){
    /*Get link file cần crop*/
    var imageLink = '';
    if(type === 'single'){
      imageLink = Ctl.allFile[fieldName];
    }else if(type === 'multi'){
      imageLink = Ctl.allFile[fieldName][key];
    }

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/templates/admin-core/crop-view.html',
      controller: function ($scope, $uibModalInstance) {
        var popupScope = this;
        $scope.popupScope = {
          image: '/'+imageLink,
          event: 'crop:image',
          ratio: 1,
          width: 500,
          height: 500,
          // mimeType : 'image/jpeg'
        };
        $scope.$on('crop:image', function (event, image) {
          Upload.upload({
            url: window.settings.services.apiUrl + '/upload/uploadBase64',
            data: { prefix: 'crop', directory: Ctl.pathFileTmp+'/'+fieldName, image: image.image },
          })
          .then(function (resp) {
            // console.log('resp',resp);
            $timeout(function () {
              var fileLink = 'files/'+resp.data.directory+'/'+resp.data.name;

              /*Checks xử lý là hình trong tmp hay trong module*/
              if(type === 'single'){
                checkRemoveFile(Ctl, Ctl.allFile[fieldName], fieldName);
                Ctl.allFile[fieldName] = fileLink;
              }else if(type === 'multi'){
                checkRemoveFile(Ctl, Ctl.allFile[fieldName][key], fieldName);
                Ctl.allFile[fieldName][key] = fileLink;
              }
              $uibModalInstance.close();

            });
          }, function (error) {
            if (error.status > 0)
              toastr.error(error.data.message, 'ERROR');
          });
        })
      }
    });
  }

}

//Menu service used for managing  menus
function Menus() {
  // Define a set of default roles
  this.defaultRoles = ['*'];

  // Define the menus object
  this.menus = {};

  // A private function for rendering decision 
  var shouldRender = function(user) {
    if (user) {
      if (!!~this.roles.indexOf('*')) {
        return true;
      } else {
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      }
    } else {
      return this.isPublic;
    }

    return false;
  };

  // Validate menu existance
  this.validateMenuExistance = function(menuId) {
    if (menuId && menuId.length) {
      if (this.menus[menuId]) {
        return true;
      } else {
        throw new Error('Menu does not exists');
      }
    } else {
      throw new Error('MenuId was not provided');
    }

    return false;
  };

  // Get the menu object by menu id
  this.getMenu = function(menuId) {
    // Validate that the menu exists
    this.validateMenuExistance(menuId);

    // Return the menu object
    return this.menus[menuId];
  };

  // Add new menu object by menu id
  this.addMenu = function(menuId, isPublic, roles) {
    // Create the new menu
    this.menus[menuId] = {
      isPublic: isPublic || false,
      roles: roles || this.defaultRoles,
      items: [],
      shouldRender: shouldRender
    };

    // Return the menu object
    return this.menus[menuId];
  };

  // Remove existing menu object by menu id
  this.removeMenu = function(menuId) {
    // Validate that the menu exists
    this.validateMenuExistance(menuId);

    // Return the menu object
    delete this.menus[menuId];
  };

  // Add menu item object
  this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
    // Validate that the menu exists
    this.validateMenuExistance(menuId);

    // Push new menu item
    this.menus[menuId].items.push({
      title: menuItemTitle,
      link: menuItemURL,
      menuItemType: menuItemType || 'item',
      menuItemClass: menuItemType,
      uiRoute: menuItemUIRoute || ('/' + menuItemURL),
      isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
      roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
      position: position || 0,
      items: [],
      shouldRender: shouldRender
    });

    // Return the menu object
    return this.menus[menuId];
  };

  // Add submenu item object
  this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
    // Validate that the menu exists
    this.validateMenuExistance(menuId);

    // Search for menu item
    for (var itemIndex in this.menus[menuId].items) {
      if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
        // Push new submenu item
        this.menus[menuId].items[itemIndex].items.push({
          title: menuItemTitle,
          link: menuItemURL,
          uiRoute: menuItemUIRoute || ('/' + menuItemURL),
          isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
          roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
          position: position || 0,
          shouldRender: shouldRender
        });
      }
    }

    // Return the menu object
    return this.menus[menuId];
  };

  // Remove existing menu object by menu id
  this.removeMenuItem = function(menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

  // Remove existing menu object by menu id
  this.removeSubMenuItem = function(menuId, submenuItemURL) {
    // Validate that the menu exists
    this.validateMenuExistance(menuId);

    // Search for menu item to remove
    for (var itemIndex in this.menus[menuId].items) {
      for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
        if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
          this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
        }
      }
    }

    // Return the menu object
    return this.menus[menuId];
  };

  //Adding the topbar menu
  this.addMenu('topbar');
}

function Notice($rootScope) {
  var queue = [];
  var oldMessage = "";
  var currentMessage = "";

  $rootScope.$on("$stateChangeStart", function() {
    oldMessage = currentMessage;
    currentMessage = queue.shift() || "";
      // console.log(currentMessage);
    });

  $rootScope.$on("requireChange", function() {
    oldMessage = currentMessage;
    currentMessage = queue.shift() || "";
      // console.log(currentMessage);
    });

  $rootScope.$on("$stateChangeError", function() {
    queue.push(oldMessage);
    currentMessage = "";
  });

  return {
    setNotice: function(message, type, require) {
      var require = typeof require !== 'undefined' ? require : false;
      queue.push({
        type: type,
        message: message
      });
      if (require) {
        $rootScope.$broadcast('requireChange');
          // console.log('requireChange');
        }
          // console.log('Queue',queue);
        },
        getNotice: function() {
          return currentMessage;
        },
        requireChange: function() {
          $rootScope.$broadcast('requireChange');
        },
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
        INFO: 'INFO',
        clearNotice: function() {
          queue = [];
          currentMessage = "";
          $rootScope.$broadcast('CLEAR_NOTICE');
        }
      };
    }

    /*=======Service util=======*/

    function bzUtilsSvc() {
      return {
        recusive: recusive,
        //cropAvatar: cropAvatar,
        findObject: findObject,                 // Tìm đối tượng trong mảng đối tượng
        textToSlug: textToSlug,                 // genarator slug
        setLocalStorage: setLocalStorage,
        getLocalStorage: getLocalStorage,
        removeLocalStorage: removeLocalStorage,

        setInfoUser: setInfoUser,
        getInfoUser: getInfoUser,
        removeInfoUser: removeInfoUser,

        intersection: intersection,
      };

      function textToSlug(string) {
        if (string) {
            //Đổi chữ hoa thành chữ thường
            var slug = string.toLowerCase();

            //Đổi ký tự có dấu thành không dấu
            slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
            slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
            slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
            slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
            slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
            slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
            slug = slug.replace(/đ/gi, 'd');
            //Xóa các ký tự đặt biệt
            slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            //Đổi khoảng trắng thành ký tự gạch ngang
            slug = slug.replace(/ /gi, "-");
            //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
            //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
            slug = slug.replace(/\-\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-/gi, '-');
            slug = slug.replace(/\-\-/gi, '-');
            //Xóa các ký tự gạch ngang ở đầu và cuối
            slug = '@' + slug + '@';
            slug = slug.replace(/\@\-|\-\@|\@/gi, '');
            return slug;
          }

          return string;
        }

        function findObject(field, value, array) {
          function findCherries(fruit) {
            return fruit[field] === value;
          }

          return array.find(findCherries);
        }

        function recusive(data, parentId, seperator) {
          var output;
          var tmp = [];
          seperator = seperator || '';
          if (angular.isArray(data)) {
            var items = data.filter(function (item) { return item.parentId === parentId });
            if (items.length) {
              for (var i = 0; i < items.length; i++) {
                items[i].name = seperator + items[i].name;

                tmp.push(items[i]);

                var subs = recusive(data, items[i].id, seperator + "—");

                for (var j = 0; j < subs.length; j++) {
                  tmp.push(subs[j]);
                }
              }
            }
            output = tmp;
          } else {
            output = data;
          }
          return output;
        }

    // function cropAvatar() {
    //     $bzPopup.open({
    //         templateUrl: 'modules/popup/cropper/view.html',
    //         closeOnBg: false,
    //         data: {
    //             ratio: 1,
    //             width: 320,
    //             height: 320,
    //             type: 'image/jpeg',
    //             event: 'bz:CropperAvatarSuccess',
    //             image: 'images/demo.jpg',
    //             props: {
    //                 btnOk: 'Lưu',
    //                 btnCancel: 'Huỷ bỏ',
    //                 btnOkEvent: 'bz:CropperAvatarOk', // hoặc function(){}
    //                 btnCancelEvent: 'bz:CroppperAvatarCancel' // hoặc function(){}
    //             }
    //         }
    //     });
    // }

    function setLocalStorage(key, data) {
      if (typeof (Storage) !== "undefined") {
        Storage.set(key, data, settingJs.storageExpireTime);
      } else {
        console.error('Sorry! The browser does not support Storage.');
      }
    }

    function getLocalStorage(key) {
      if (typeof (Storage) !== "undefined") {
        var data = Storage.get(key);
        return data;
      } else {
        console.error('Sorry! The browser does not support Storage.');
        return null;
      }
    }

    function removeLocalStorage(key) {
      if (typeof (Storage) !== "undefined") {
        Storage.remove(key);
      } else {
        console.error('Sorry! The browser does not support Storage.');
      };
    }

    function setInfoUser(data) {
      setLocalStorage(settingJs.appPrefix + '_infoUser', data);
    }

    function getInfoUser() {
      return getLocalStorage(settingJs.appPrefix + '_infoUser');
    }

    function removeInfoUser() {
      removeLocalStorage(settingJs.appPrefix + '_infoUser');
    }

    // Util intersection two array
    function intersection(a, b) {
      var t;
      if (b.length > a.length) t = b, b = a, a = t;
      return a.filter(function (e) {
        return b.indexOf(e) > -1;
      });
    }
  }