'use strict';

angular.module('users').controller('UserController', UserController);

function UserController (
  $stateParams, $location, $state,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, Categories, UserSvc, GeneralSvc, UploadSvc, bzUtilsSvc
  ) {

  var vmUser = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmUser, 'user');
  vmUser.userRoles = Option.getRoles();
  vmUser.mapVN = Option.mapVN();
  vmUser.provinces = UserSvc.provinces();
  vmUser.queryParams = $stateParams;
  vmUser.districts = [];
  vmUser.gotoList = gotoList;
  vmUser.checkSlug = checkSlug;
  vmUser.changeProvince = changeProvince;

  function gotoList() {
    $state.go('listUser');
  }

  function checkSlug(text) {
    vmUser.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  function changeProvince() {
    if(vmUser.formData.province){
      _.map( vmUser.provinces.items, function( value, key) {
        if(value._id == vmUser.formData.province){
          vmUser.districts = value.districts;
        }
      })
    }
  }

  /*Start Upload Image*/
  vmUser.fieldImages = [
  // 'thumb',
  // 'gallery'
  ];
  
  vmUser.uploadFile = uploadFile;
  vmUser.removeImage = removeImage;
  vmUser.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmUser, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmUser, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmUser, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "user.filterData";

  vmUser.find = find;
  vmUser.reset = reset;
  vmUser.pageChanged = pageChanged;
  vmUser.sellectAll = sellectAll;
  vmUser.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmUser.changeStatus = changeStatus;
  vmUser.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmUser.openPopupDeleteMulti = openPopupDeleteMulti;
  vmUser.confirmMoveToTrash = confirmMoveToTrash;
  vmUser.confirmDelete = confirmDelete;
  vmUser.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmUser);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(UserSvc, vmUser, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmUser.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmUser.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmUser.search.role = filterData.search.role ? filterData.search.role : null;
        vmUser.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmUser.currentPage,
      filter: vmUser.search.filter,
      role: vmUser.search.role,
      status: vmUser.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmUser.search.filter = "";
    vmUser.search.status = "";
    vmUser.search.role = "";
    vmUser.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmUser, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmUser, page);
    GeneralSvc.setFilterToLocalStorage(vmUser, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmUser, vmUser.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(UserSvc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(UserSvc, vmUser, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(UserSvc, vmUser);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(UserSvc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(UserSvc, vmUser);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(UserSvc, vmUser, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(UserSvc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmUser.create = create;
  /*khai báo default field*/
  vmUser.formData = {
    // status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmUser.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmUser);
    /*Create new object*/
    GeneralSvc.save(UserSvc, vmUser, type, 'editUser');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmUser.findOne = findOne;
  vmUser.update = update;

  /*Find existing*/
  function findOne() {
    if(!vmUser.queryParams.id) return;
    
    GeneralSvc.showLoading(vmUser);
    UserSvc.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vmUser.formData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        roles: data.roles,
        address: data.address,
        province: data.province,
        district: data.district,
        status: data.status
      }

      /*Get district of province*/
      UserSvc.provinces(function(resp){
        _.map( vmUser.provinces.items, function( value, key) {
          if(value._id == vmUser.formData.province)
            vmUser.districts = value.districts;
        })
      });

      /*Gán giá trị image tại đây*/
      _.map(vmUser.fieldImages, function( value, key) {
        vmUser.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vmUser);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmUser.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmUser);
    /*Update doc*/
    GeneralSvc.updateDoc(UserSvc, vmUser, type);
  };
  /*================================END UPDATE========================================*/
}