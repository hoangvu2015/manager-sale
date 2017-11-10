'use strict';

angular.module('contacts').controller('ContactController', ContactController);

function ContactController (
  $stateParams, $location, $state,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, Categories, ContactSvc, GeneralSvc, UploadSvc, bzUtilsSvc
  ) {

  var vmContact = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmContact, 'contact');
  vmContact.queryParams = $stateParams;
  vmContact.gotoList = gotoList;
  vmContact.checkSlug = checkSlug;

  function gotoList() {
    $state.go('listContact');
  }

  function checkSlug(text) {
    vmContact.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  /*Start Upload Image*/
  vmContact.fieldImages = [
  // 'thumb',
  // 'gallery'
  ];
  
  vmContact.uploadFile = uploadFile;
  vmContact.removeImage = removeImage;
  vmContact.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmContact, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmContact, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmContact, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "contact.filterData";

  vmContact.find = find;
  vmContact.reset = reset;
  vmContact.pageChanged = pageChanged;
  vmContact.sellectAll = sellectAll;
  vmContact.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmContact.changeStatus = changeStatus;
  vmContact.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmContact.openPopupDeleteMulti = openPopupDeleteMulti;
  vmContact.confirmMoveToTrash = confirmMoveToTrash;
  vmContact.confirmDelete = confirmDelete;
  vmContact.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmContact);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(ContactSvc, vmContact, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmContact.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmContact.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmContact.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmContact.currentPage,
      filter: vmContact.search.filter,
      status: vmContact.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmContact.search.filter = "";
    vmContact.search.status = "";
    vmContact.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmContact, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmContact, page);
    GeneralSvc.setFilterToLocalStorage(vmContact, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmContact, vmContact.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(ContactSvc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(ContactSvc, vmContact, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(ContactSvc, vmContact);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(ContactSvc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(ContactSvc, vmContact);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(ContactSvc, vmContact, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(ContactSvc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmContact.create = create;
  vmContact.formData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmContact.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmContact);
    /*Create new object*/
    GeneralSvc.save(ContactSvc, vmContact, type, 'editContact');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmContact.findOne = findOne;
  vmContact.update = update;

  /*Find existing*/
  function findOne() {
    if(!vmContact.queryParams.id) return;

    GeneralSvc.showLoading(vmContact);
    ContactSvc.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vmContact.formData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        message: data.message,
        status: data.status
      }
      /*Gán giá trị image tại đây*/
      _.map(vmContact.fieldImages, function( value, key) {
        vmContact.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vmContact);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmContact.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmContact);
    /*Update doc*/
    GeneralSvc.updateDoc(ContactSvc, vmContact, type);
  };
  /*================================END UPDATE========================================*/
}