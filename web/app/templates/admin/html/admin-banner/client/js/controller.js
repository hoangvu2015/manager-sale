'use strict';

angular.module('banners').controller('BannerController', BannerController);

function BannerController (
  $stateParams, $location, $state,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, Categories, BannerSvc, GeneralSvc, UploadSvc, bzUtilsSvc
  ) {

  var vmBanner = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmBanner, 'banner');
  Categories.query({notPaginate:true},function(resp){
    vmBanner.categorys = resp.data;
  });
  vmBanner.positions = Option.getPositions();
  vmBanner.queryParams = $stateParams;

  vmBanner.gotoList = gotoList;
  vmBanner.checkSlug = checkSlug;

  function gotoList() {
    $state.go('listBanner');
  }

  function checkSlug(text) {
    vmBanner.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  /*Start Upload Image*/
  vmBanner.fieldImages = [
  'image',
  ];
  
  vmBanner.uploadFile = uploadFile;
  vmBanner.removeImage = removeImage;
  vmBanner.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmBanner, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmBanner, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmBanner, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "banner.filterData";

  vmBanner.find = find;
  vmBanner.reset = reset;
  vmBanner.pageChanged = pageChanged;
  vmBanner.sellectAll = sellectAll;
  vmBanner.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmBanner.changeStatus = changeStatus;
  vmBanner.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmBanner.openPopupDeleteMulti = openPopupDeleteMulti;
  vmBanner.confirmMoveToTrash = confirmMoveToTrash;
  vmBanner.confirmDelete = confirmDelete;
  vmBanner.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmBanner);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(BannerSvc, vmBanner, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmBanner.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmBanner.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmBanner.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmBanner.currentPage,
      filter: vmBanner.search.filter,
      status: vmBanner.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmBanner.search.filter = "";
    vmBanner.search.status = "";
    vmBanner.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmBanner, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmBanner, page);
    GeneralSvc.setFilterToLocalStorage(vmBanner, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmBanner, vmBanner.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(BannerSvc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(BannerSvc, vmBanner, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(BannerSvc, vmBanner);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(BannerSvc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(BannerSvc, vmBanner);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(BannerSvc, vmBanner, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(BannerSvc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmBanner.create = create;
  /*khai báo defaul field*/
  vmBanner.formData = {
    title: '',
    category: [],
    status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmBanner.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmBanner);
    /*Create new object*/
    GeneralSvc.save(BannerSvc, vmBanner, type, 'editBanner');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmBanner.findOne = findOne;
  vmBanner.update = update;

  /*Find existing*/
  function findOne() {
    if(!vmBanner.queryParams.id) return;

    GeneralSvc.showLoading(vmBanner);
    BannerSvc.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vmBanner.formData = {
        _id: data._id,
        title: data.title,
        subtitle: data.subtitle,
        link: data.link,
        description: data.description,
        position: data.position,
        category: data.category,
        status: data.status
      }
      /*Gán giá trị image tại đây*/
      _.map(vmBanner.fieldImages, function( value, key) {
        vmBanner.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vmBanner);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmBanner.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmBanner);
    /*Update doc*/
    GeneralSvc.updateDoc(BannerSvc, vmBanner, type);
  };
  /*================================END UPDATE========================================*/
}