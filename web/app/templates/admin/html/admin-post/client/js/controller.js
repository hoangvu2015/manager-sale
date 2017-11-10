'use strict';

angular.module('posts').controller('PostController', PostController);

function PostController (
  $stateParams, $location, $state,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, Categories, PostSvc, GeneralSvc, UploadSvc, bzUtilsSvc
  ) {

  var vmPost = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmPost, 'post');
  Categories.query({notPaginate:true},function(resp){
    vmPost.categorys = resp.data;
  });
  vmPost.features = Option.getFeatures();
  vmPost.queryParams = $stateParams;
  vmPost.gotoList = gotoList;
  vmPost.checkSlug = checkSlug;

  function gotoList() {
    $state.go('listPost');
  }

  function checkSlug(text) {
    vmPost.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  /*Start Upload Image*/
  vmPost.fieldImages = [
  'thumb',
  'image',
  'gallery'
  ];
  
  vmPost.uploadFile = uploadFile;
  vmPost.removeImage = removeImage;
  vmPost.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmPost, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmPost, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmPost, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "post.filterData";

  vmPost.find = find;
  vmPost.reset = reset;
  vmPost.pageChanged = pageChanged;
  vmPost.sellectAll = sellectAll;
  vmPost.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmPost.changeStatus = changeStatus;
  vmPost.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmPost.openPopupDeleteMulti = openPopupDeleteMulti;
  vmPost.confirmMoveToTrash = confirmMoveToTrash;
  vmPost.confirmDelete = confirmDelete;
  vmPost.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmPost);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(PostSvc, vmPost, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmPost.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmPost.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmPost.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmPost.currentPage,
      filter: vmPost.search.filter,
      status: vmPost.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmPost.search.filter = "";
    vmPost.search.status = "";
    vmPost.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmPost, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmPost, page);
    GeneralSvc.setFilterToLocalStorage(vmPost, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmPost, vmPost.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(PostSvc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(PostSvc, vmPost, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(PostSvc, vmPost);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(PostSvc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(PostSvc, vmPost);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(PostSvc, vmPost, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(PostSvc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmPost.create = create;
  /*khai báo default field*/
  vmPost.formData = {
    // status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmPost.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmPost);
    /*Create new object*/
    GeneralSvc.save(PostSvc, vmPost, type, 'editPost');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmPost.findOne = findOne;
  vmPost.update = update;

  /*Find existing*/
  function findOne() {
    if(!vmPost.queryParams.id) return;
    
    GeneralSvc.showLoading(vmPost);
    PostSvc.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vmPost.formData = {
        _id: data._id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        feature: data.feature,
        teaser: data.teaser,
        category: data.category,
        status: data.status,
        attrs: (data.attrs) ? data.attrs : {}
      }
      
      /*Gán giá trị image tại đây*/
      _.map(vmPost.fieldImages, function( value, key) {
        vmPost.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vmPost);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmPost.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmPost);
    /*Update doc*/
    GeneralSvc.updateDoc(PostSvc, vmPost, type);
  };
  /*================================END UPDATE========================================*/
}