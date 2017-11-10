'use strict';

angular.module('<%= moduleName %>s').controller('<%= modelName %>Controller', <%= modelName %>Controller);

function <%= modelName %>Controller (
  $stateParams, $location, $state, $timeout,
  localStorageService, dialogs, toastr, Upload,
  Option, Authentication, <%= modelName %>Svc, GeneralSvc, UploadSvc, bzUtilsSvc
  <%for(key in formInfo){-%><%if(formInfo[key].service && formInfo[key].service.name){-%>, <%=formInfo[key].service.name%><%}-%><%}-%>
  ) {

  var vm<%= modelName %> = this;
  /*================================START GENERAL========================================*/
  if (!Authentication.isAdmin()) {
    $location.path('signin');
  }

  GeneralSvc.initModule(vm<%= modelName %>, '<%= moduleName %>');
  vm<%= modelName %>.queryParams = $stateParams;

  /*Set option select*/
  <% for (key in formInfo) { -%>
  <% if (formInfo[key].type == 'select' || formInfo[key].type == 'multi_select') { -%>
  <% if (formInfo[key].service && formInfo[key].service.name) { %>
  <%= formInfo[key].service.name%>.query({notPaginate:true}, function(resp){
    vm<%= modelName %>.<%= key %>s = resp.data;
  });
  <% }else{ %>
  vm<%= modelName %>.<%= key %>s = [{key:'1',value:'option1'},{key:'2',value:'option2'},{key:'3',value:'option3'}];
  <% } -%>
  <% } -%>
  <% } %>
  /*Set option date time*/
  <%for(key in formInfo){%><%if(formInfo[key].type == 'date'){%>
  <%if(formInfo[key].timePicker == true){%>vm<%= modelName %>.dateOpt<%= key %> = {timePicker:true, locale: {format: 'HH:mm DD/MM/YYYY'}}<%}else{-%>vm<%= modelName %>.dateOpt<%= key %> = {}<%}-%>
  <%}-%>
  <%if(formInfo[key].type == 'date_range'){%>
  <%if(formInfo[key].timePicker == true){%>vm<%= modelName %>.dateOpt<%= key %> = {timePicker:true,singleDatePicker:false, locale: {format: 'HH:mm DD/MM/YYYY'}}<%}else{-%>vm<%= modelName %>.dateOpt<%= key %> = {singleDatePicker:false}<%}-%>
  <%}-%>
  <%}%>

  vm<%= modelName %>.gotoList = gotoList;
  vm<%= modelName %>.checkSlug = checkSlug;

  function gotoList() {
    $state.go('list<%= modelName %>');
  }

  function checkSlug(text) {
    vm<%= modelName %>.formData.slug = bzUtilsSvc.textToSlug(text);
  }

  /*Start Upload Image*/
  vm<%= modelName %>.fieldImages = [<%for(key in formInfo){%><%if(formInfo[key].type == 'image' || formInfo[key].type == 'images'){%>'<%=key%>',<%}-%><%}-%>];
  
  vm<%= modelName %>.uploadFile = uploadFile;
  vm<%= modelName %>.removeImage = removeImage;
  vm<%= modelName %>.cropImage = cropImage;

  function cropImage(type, fieldName, key){
    GeneralSvc.cropImage(vm<%= modelName %>, type, fieldName, key);
  }

  function removeImage(type, fieldName, key){
    GeneralSvc.removeImage(vm<%= modelName %>, type, fieldName, key);
  }

  function uploadFile(files, type, nameField){
    GeneralSvc.uploadFile(Upload, vm<%= modelName %>, files, type, nameField);
  }
  /*End Upload Image*/

  /*================================END GENERAL========================================*/

  /*================================START LIST========================================*/
  var localStorageName = "<%= moduleName %>.filterData";

  vm<%= modelName %>.find = find;
  vm<%= modelName %>.reset = reset;
  vm<%= modelName %>.pageChanged = pageChanged;
  vm<%= modelName %>.sellectAll = sellectAll;
  vm<%= modelName %>.openPopupChangeStatusMulti = openPopupChangeStatusMulti;
  vm<%= modelName %>.changeStatus = changeStatus;
  vm<%= modelName %>.openPopupMoveToTrashMulti = openPopupMoveToTrashMulti;
  vm<%= modelName %>.openPopupDeleteMulti = openPopupDeleteMulti;
  vm<%= modelName %>.confirmMoveToTrash = confirmMoveToTrash;
  vm<%= modelName %>.confirmDelete = confirmDelete;
  vm<%= modelName %>.putback = putback;

  /*Find a list of*/
  function find() {
    GeneralSvc.showLoading(vm<%= modelName %>);
    getListData();
  };

  /*get list*/
  function getListData() {
    getFilterToLocalStorage()
    var options = getOptionsQuery();
    GeneralSvc.getListData(<%= modelName %>Svc, vm<%= modelName %>, options);    
  }
  /*get filter from LocalStorage*/
  function getFilterToLocalStorage() {
    var filterData = localStorageService.get(localStorageName);
    if (!$.isEmptyObject(filterData)) {
      vm<%= modelName %>.currentPage = Number.isInteger(filterData.currentPage) ? Number(filterData.currentPage) : 1;
      if (!$.isEmptyObject(filterData.search)) {
        vm<%= modelName %>.search.filter = filterData.search.filter ? filterData.search.filter : "";
        vm<%= modelName %>.search.status = Number.isInteger(filterData.search.status) ? Number(filterData.search.status) : null;
      }
    }
  }
  /*get options*/
  function getOptionsQuery() {
    var options = {
      page: vm<%= modelName %>.currentPage,
      filter: vm<%= modelName %>.search.filter,
      status: vm<%= modelName %>.search.status,
    };
    return options;
  }
  /*reset*/
  function reset() {
    vm<%= modelName %>.search.filter = "";
    vm<%= modelName %>.search.status = "";
    vm<%= modelName %>.currentPage = 1;
    GeneralSvc.setFilterToLocalStorage(vm<%= modelName %>, localStorageName);
    getListData();
  };
  /*change page*/
  function pageChanged(page) {
    GeneralSvc.setPage(vm<%= modelName %>, page);
    GeneralSvc.setFilterToLocalStorage(vm<%= modelName %>, localStorageName);
    getListData();
  };
  /*sellectAll*/
  function sellectAll() {
    GeneralSvc.sellectAll(vm<%= modelName %>, vm<%= modelName %>.listItems);
  }
  /*Change status*/
  function changeStatus(id, status) {
    GeneralSvc.changeStatus(<%= modelName %>Svc, id, status);
  }
  /*change Multi status*/
  function openPopupChangeStatusMulti (status) {
    GeneralSvc.openPopupChangeStatusMulti(<%= modelName %>Svc, vm<%= modelName %>, status);
  }
  /*move to trash Multi*/
  function openPopupMoveToTrashMulti() {
    GeneralSvc.openPopupMoveToTrashMulti(<%= modelName %>Svc, vm<%= modelName %>);
  }
  /*move to trash*/
  function confirmMoveToTrash(id) {
    GeneralSvc.confirmMoveToTrash(<%= modelName %>Svc, id);
  }
  /*delete Multi*/
  function openPopupDeleteMulti() {
    GeneralSvc.openPopupDeleteMulti(<%= modelName %>Svc, vm<%= modelName %>);
  }
  /*delete*/
  function confirmDelete(id) {
    GeneralSvc.confirmDelete(<%= modelName %>Svc, vm<%= modelName %>, id);
  }
  /*putback*/
  function putback(id) {
    GeneralSvc.putback(<%= modelName %>Svc, id);
  };

  /*================================END LIST========================================*/

  /*================================START CREATE========================================*/
  vm<%= modelName %>.create = create;
  /*khai báo default field*/
  vm<%= modelName %>.formData = {
    // status: 1
  };

  /*Create new doc*/
  function create(isValid, type) {
    vm<%= modelName %>.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vm<%= modelName %>);
    /*Create new object*/
    GeneralSvc.save(<%= modelName %>Svc, vm<%= modelName %>, type, 'edit<%= modelName %>');
  };
  /*================================END CREATE========================================*/

  /*================================START UPDATE========================================*/
  vm<%= modelName %>.findOne = findOne;
  vm<%= modelName %>.update = update;

  /*Find existing*/
  function findOne() {
    if(!vm<%= modelName %>.queryParams.id) return;
    
    GeneralSvc.showLoading(vm<%= modelName %>);
    <%= modelName %>Svc.get({
      id: $stateParams.id
    }, function(data) {
      /*Nếu có field image thì add vào đây*/
      vm<%= modelName %>.formData = {
        _id: data._id,<%for(key in formInfo){%>
        <%if(formInfo[key].type != 'image' && formInfo[key].type != 'images'){%><%=key%>: data.<%=key%>,<%}-%>
        <%}%>
        status: data.status
      }

      /*Start: Datetime picker*/
      <%for(key in formInfo){%><%if(formInfo[key].type == 'date_range'){%>
      if(data.<%= key %>){
        vm<%= modelName %>.dateOpt<%= key %> = angular.extend(vm<%= modelName %>.dateOpt<%= key %>, {
          startDate: moment(data.<%= key %>.startDate).format('<%if(formInfo[key].timePicker == true){%>HH:mm<%}-%> DD/MM/YYYY'),
          endDate: moment(data.<%= key %>.endDate).format('<%if(formInfo[key].timePicker == true){%>HH:mm<%}-%> DD/MM/YYYY')
        });
        $timeout(function () {
          var textDateTime = vm<%= modelName %>.dateOpt<%= key %>.startDate + ' - ' + vm<%= modelName %>.dateOpt<%= key %>.endDate;
          angular.element('#<%= key %>').val(textDateTime);
        }, 10);
      }
      <%}-%>
      <%}%>
      /*End: Datetime picker*/

      /*Gán giá trị image tại đây*/
      _.map(vm<%= modelName %>.fieldImages, function( value, key) {
        vm<%= modelName %>.allFile[value] = data[value]
      })
      GeneralSvc.hideLoading(vm<%= modelName %>);
    });
  };

  /*Update existing*/      
  function update(isValid, type) {
    vm<%= modelName %>.submitted = true;
    if (!isValid) return;
    GeneralSvc.showLoading(vm<%= modelName %>);
    /*Update doc*/
    GeneralSvc.updateDoc(<%= modelName %>Svc, vm<%= modelName %>, type);
  };
  /*================================END UPDATE========================================*/
}