export default {
  tableFields: [
  {
    name: '__checkbox'
  },
  
  {
    name: 'title',
    title: 'Tiêu đề'
  },    
  
  {
    name: 'slug',
    title: 'Slug'
  },    
  
  {
    name: 'num',
    title: 'Số'
  },    
    
  
  {
    name: 'thumb',
    title: 'Hình Thumb',
    callback: 'image'
  },    
  
  {
    name: 'gallery',
    title: 'Thư viện ảnh',
    callback: 'gallery'
  },    
  
  {
    name: 'date',
    title: 'Ngày',
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
