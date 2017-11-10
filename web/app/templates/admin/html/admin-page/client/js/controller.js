'use strict';

angular.module('pages').controller('PageController', PageController);

function PageController (
  $stateParams, $location, $state,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, Categories, PageSvc, GeneralSvc, UploadSvc, bzUtilsSvc
  ) {

  var vmPage = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmPage, 'page');
  vmPage.queryParams = $stateParams;
  vmPage.gotoList = gotoList;
  vmPage.checkSlug = checkSlug;

  function gotoList() {
    $state.go('listPage');
  }

  function checkSlug(text) {
    vmPage.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  /*Start Upload Image*/
  vmPage.fieldImages = [
  // 'thumb',
  // 'gallery'
  ];
  
  vmPage.uploadFile = uploadFile;
  vmPage.removeImage = removeImage;
  vmPage.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmPage, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmPage, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmPage, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "page.filterData";

  vmPage.find = find;
  vmPage.reset = reset;
  vmPage.pageChanged = pageChanged;
  vmPage.sellectAll = sellectAll;
  vmPage.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmPage.changeStatus = changeStatus;
  vmPage.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmPage.openPopupDeleteMulti = openPopupDeleteMulti;
  vmPage.confirmMoveToTrash = confirmMoveToTrash;
  vmPage.confirmDelete = confirmDelete;
  vmPage.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmPage);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(PageSvc, vmPage, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmPage.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmPage.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmPage.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmPage.currentPage,
      filter: vmPage.search.filter,
      status: vmPage.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmPage.search.filter = "";
    vmPage.search.status = "";
    vmPage.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmPage, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmPage, page);
    GeneralSvc.setFilterToLocalStorage(vmPage, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmPage, vmPage.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(PageSvc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(PageSvc, vmPage, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(PageSvc, vmPage);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(PageSvc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(PageSvc, vmPage);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(PageSvc, vmPage, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(PageSvc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmPage.create = create;
  vmPage.formData = {
    title: '',
    slug: '',
    description: '',
    thumb: '',
    gallery: [],
    categories: [],
    status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmPage.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmPage);
    /*Create new object*/
    GeneralSvc.save(PageSvc, vmPage, type, 'editPage');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmPage.findOne = findOne;
  vmPage.update = update;

  /*Find existing*/
  function findOne() {
    if(!vmPage.queryParams.id) return;
    
    GeneralSvc.showLoading(vmPage);
    PageSvc.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vmPage.formData = {
        _id: data._id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status
      }
      /*Gán giá trị image tại đây*/
      _.map(vmPage.fieldImages, function( value, key) {
        vmPage.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vmPage);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmPage.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmPage);
    /*Update doc*/
    GeneralSvc.updateDoc(PageSvc, vmPage, type);
  };
  /*================================END UPDATE========================================*/
}