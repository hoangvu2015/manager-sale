export default {
  tableFields: [
  {
    name: '__checkbox'
  },
  
  {
    name: 'id_order',
    title: 'id tăng tự động'
  },    
  
  {
    name: 'name',
    title: 'Tên khách hàng'
  },    
  
  {
    name: 'link_facebook',
    title: 'Link Facebook'
  },    
  
  {
    name: 'phone',
    title: 'Số điện thoại'
  },    
  
  {
    name: 'address',
    title: 'Địa chỉ'
  },    
  
  {
    name: 'total',
    title: 'Tổng tiền'
  },    
  
  {
    name: 'ship_fee',
    title: 'Tiền ship'
  },    
  
  {
    name: 'id_ship',
    title: 'Mã đơn của bưu điện'
  },    
    
  
  {
    name: 'date_order',
    title: 'Ngày đặt hàng',
    callback: 'formatDate|D/MM/Y'
  },    
        
  {
    name: 'status',
    sortField: 'status',
    callback: 'status',
  },
  {
    name: 'createdAt',
    title: 'createdAt',
    callback: 'formatDate|D/MM/Y'
  },
  '__slot:actions'
  ],
  sortFunctions: {
    'title': function (item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    'status': function (item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
}
