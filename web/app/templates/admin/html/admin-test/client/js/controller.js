'use strict';

angular.module('tests').controller('TestController', TestController);

function TestController (
  $stateParams, $location, $state, $timeout,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, TestSvc, GeneralSvc, UploadSvc, bzUtilsSvc
  , Categories  ) {

  var vmTest = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vmTest, 'test');
  vmTest.queryParams = $stateParams;

  /*Set option select*/
                                      
  Categories.query({notPaginate:true}, function(resp){
    vmTest.categorys = resp.data;
  });
          
  vmTest.options = [{key:'1',value:'option1'},{key:'2',value:'option2'},{key:'3',value:'option3'}];
      
  /*Set option date time*/
                          
  vmTest.dateOptdate = {timePicker:true, locale: {format: 'HH:mm DD/MM/YYYY'}}        
  vmTest.dateOptdate_range = {singleDatePicker:false}            

  vmTest.gotoList = gotoList;
  vmTest.checkSlug = checkSlug;

  function gotoList() {
    $state.go('listTest');
  }

  function checkSlug(text) {
    vmTest.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  /*Start Upload Image*/
  vmTest.fieldImages = ['thumb','gallery',];
  
  vmTest.uploadFile = uploadFile;
  vmTest.removeImage = removeImage;
  vmTest.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vmTest, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vmTest, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vmTest, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "test.filterData";

  vmTest.find = find;
  vmTest.reset = reset;
  vmTest.pageChanged = pageChanged;
  vmTest.sellectAll = sellectAll;
  vmTest.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vmTest.changeStatus = changeStatus;
  vmTest.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vmTest.openPopupDeleteMulti = openPopupDeleteMulti;
  vmTest.confirmMoveToTrash = confirmMoveToTrash;
  vmTest.confirmDelete = confirmDelete;
  vmTest.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vmTest);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(TestSvc, vmTest, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vmTest.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vmTest.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vmTest.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vmTest.currentPage,
      filter: vmTest.search.filter,
      status: vmTest.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vmTest.search.filter = "";
    vmTest.search.status = "";
    vmTest.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vmTest, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vmTest, page);
    GeneralSvc.setFilterToLocalStorage(vmTest, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vmTest, vmTest.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(TestSvc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(TestSvc, vmTest, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(TestSvc, vmTest);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(TestSvc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(TestSvc, vmTest);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(TestSvc, vmTest, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(TestSvc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vmTest.create = create;
  /*khai báo default field*/
  vmTest.formData = {
    // status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vmTest.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmTest);
    /*Create new object*/
    GeneralSvc.save(TestSvc, vmTest, type, 'editTest');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vmTest.findOne = findOne;
  vmTest.update = update;

  /*Find existing*/
  function findOne() {
    if(!vmTest.queryParams.id) return;
    
    GeneralSvc.showLoading(vmTest);
    TestSvc.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vmTest.formData = {
        _id: data._id,
        title: data.title,        
        slug: data.slug,        
        num: data.num,        
        description: data.description,        
                
                
        date: data.date,        
        date_range: data.date_range,        
        category: data.category,        
        option: data.option,        
        status: data.status
      }

      /*Start: Datetime picker*/
                                                
      if(data.date_range){
        vmTest.dateOptdate_range = angular.extend(vmTest.dateOptdate_range, {
          startDate: moment(data.date_range.startDate).format(' DD/MM/YYYY'),
          endDate: moment(data.date_range.endDate).format(' DD/MM/YYYY')
        });
        $timeout(function () {
          var textDateTime = vmTest.dateOptdate_range.startDate + ' - ' + vmTest.dateOptdate_range.endDate;
          angular.element('#date_range').val(textDateTime);
        }, 10);
      }
                        
      /*End: Datetime picker*/

      /*Gán giá trị image tại đây*/
      _.map(vmTest.fieldImages, function( value, key) {
        vmTest.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vmTest);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vmTest.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vmTest);
    /*Update doc*/
    GeneralSvc.updateDoc(TestSvc, vmTest, type);
  };
  /*================================END UPDATE========================================*/
}