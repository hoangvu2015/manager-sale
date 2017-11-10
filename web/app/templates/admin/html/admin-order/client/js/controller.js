'use strict';

angular.module('orders').controller('OrderController', OrderController);

function OrderController (
  $stateParams, $location, $state, $timeout,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, OrderSvc, GeneralSvc, UploadSvc, bzUtilsSvc
  , UserSvc  ) {

  var vmOrder = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmOrder, 'order');
  vmOrder.queryParams = $stateParams;

  /*Set option select*/
  vmOrder.mapVN = Option.mapVN();
      
  /*Set option date time*/
                                      
  vmOrder.dateOptdate_order = {}          

  vmOrder.gotoList = gotoList;
  vmOrder.checkSlug = checkSlug;

  function gotoList() {
    $state.go('listOrder');
  }

  function checkSlug(text) {
    vmOrder.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  /*Start Upload Image*/
  vmOrder.fieldImages = [];
  
  vmOrder.uploadFile = uploadFile;
  vmOrder.removeImage = removeImage;
  vmOrder.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmOrder, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmOrder, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmOrder, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "order.filterData";

  vmOrder.find = find;
  vmOrder.reset = reset;
  vmOrder.pageChanged = pageChanged;
  vmOrder.sellectAll = sellectAll;
  vmOrder.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmOrder.changeStatus = changeStatus;
  vmOrder.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmOrder.openPopupDeleteMulti = openPopupDeleteMulti;
  vmOrder.confirmMoveToTrash = confirmMoveToTrash;
  vmOrder.confirmDelete = confirmDelete;
  vmOrder.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmOrder);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(OrderSvc, vmOrder, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmOrder.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmOrder.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmOrder.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmOrder.currentPage,
      filter: vmOrder.search.filter,
      status: vmOrder.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmOrder.search.filter = "";
    vmOrder.search.status = "";
    vmOrder.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmOrder, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmOrder, page);
    GeneralSvc.setFilterToLocalStorage(vmOrder, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmOrder, vmOrder.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(OrderSvc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(OrderSvc, vmOrder, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(OrderSvc, vmOrder);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(OrderSvc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(OrderSvc, vmOrder);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(OrderSvc, vmOrder, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(OrderSvc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmOrder.create = create;
  /*khai báo default field*/
  vmOrder.formData = {
    // status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmOrder.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmOrder);
    /*Create new object*/
    GeneralSvc.save(OrderSvc, vmOrder, type, 'editOrder');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmOrder.findOne = findOne;
  vmOrder.update = update;

  /*Find existing*/
  function findOne() {
    if(!vmOrder.queryParams.id) return;
    
    GeneralSvc.showLoading(vmOrder);
    OrderSvc.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vmOrder.formData = {
        _id: data._id,
        name: data.name,        
        link_facebook: data.link_facebook,        
        phone: data.phone,        
        address: data.address,        
        total: data.total,        
        ship_fee: data.ship_fee,        
        id_ship: data.id_ship,        
        content: data.content,        
        date_order: data.date_order,        
        province: data.province,        
        status: data.status
      }

      /*Start: Datetime picker*/
                                                                        
      /*End: Datetime picker*/

      /*Gán giá trị image tại đây*/
      _.map(vmOrder.fieldImages, function( value, key) {
        vmOrder.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vmOrder);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmOrder.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmOrder);
    /*Update doc*/
    GeneralSvc.updateDoc(OrderSvc, vmOrder, type);
  };
  /*================================END UPDATE========================================*/
}