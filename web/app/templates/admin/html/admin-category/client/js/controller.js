'use strict';

angular.module('categories').controller('CategoryController', CategoryController);

function CategoryController (
  $stateParams, $location, $state,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, Categories, GeneralSvc, UploadSvc, bzUtilsSvc
  ) {

  var vmCategory = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmCategory, 'category');
  vmCategory.types = Option.getTypes();
  vmCategory.queryParams = $stateParams;
  vmCategory.gotoList = gotoList;
  vmCategory.checkSlug = checkSlug;

  function gotoList() {
    $state.go('listCategory');
  }

  function checkSlug(text) {
    vmCategory.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  /*Start Upload Image*/
  vmCategory.fieldImages = [
  // 'thumb',
  // 'gallery'
  ];
  
  vmCategory.uploadFile = uploadFile;
  vmCategory.removeImage = removeImage;
  vmCategory.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmCategory, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmCategory, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmCategory, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "category.filterData";

  vmCategory.find = find;
  vmCategory.reset = reset;
  vmCategory.pageChanged = pageChanged;
  vmCategory.sellectAll = sellectAll;
  vmCategory.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmCategory.changeStatus = changeStatus;
  vmCategory.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmCategory.openPopupDeleteMulti = openPopupDeleteMulti;
  vmCategory.confirmMoveToTrash = confirmMoveToTrash;
  vmCategory.confirmDelete = confirmDelete;
  vmCategory.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmCategory);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(Categories, vmCategory, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmCategory.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmCategory.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmCategory.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmCategory.currentPage,
      filter: vmCategory.search.filter,
      status: vmCategory.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmCategory.search.filter = "";
    vmCategory.search.status = "";
    vmCategory.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmCategory, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmCategory, page);
    GeneralSvc.setFilterToLocalStorage(vmCategory, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmCategory, vmCategory.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(Categories, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(Categories, vmCategory, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(Categories, vmCategory);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(Categories, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(Categories, vmCategory);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(Categories, vmCategory, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(Categories, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmCategory.create = create;
  vmCategory.formData = {
    name: '',
    slug: '',
    description: '',
    type: 'post',
    status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmCategory.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmCategory);
    /*Create new object*/
    GeneralSvc.save(Categories, vmCategory, type, 'editCategory');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmCategory.findOne = findOne;
  vmCategory.update = update;

  /*Find existing*/
  function findOne() {
    if(!vmCategory.queryParams.id) return;
    
    GeneralSvc.showLoading(vmCategory);
    Categories.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vmCategory.formData = {
        _id: data._id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        type: data.type,
        status: data.status
      }
      /*Gán giá trị image tại đây*/
      _.map(vmCategory.fieldImages, function( value, key) {
        vmCategory.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vmCategory);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmCategory.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmCategory);
    /*Update doc*/
    GeneralSvc.updateDoc(Categories, vmCategory, type);
  };
  /*================================END UPDATE========================================*/
}