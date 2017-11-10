const items = state => state.app.items;
const sidebarOpened = state => state.app.sidebar.opened;
const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation;
const config = state => state.app.config;
const palette = state => state.app.config.palette;
const isLoading = state => state.app.isLoading;
const isReloadTable = state => state.app.isReloadTable;
const alertMessage = state => state.app.alertMessage;
const selectItem = state => {
	var selectItem = state.app.selectItem;
	return {... selectItem}
};
const allUsers = state => {
	let items = state.user.items;
	let emails = [];
	for (let index = 0; index < items.length; index++) {
		let a = items[index]['email'];
		emails.push(a);
	}
	return emails;
};

// Menu
const menuItems = state => state.menu.items;

// Category
const categoryItems = state => state.category.categoryitems;

// Auth
const authUser = state => state.auth.authUser;
const authResult = state => state.auth.authResult;

export {
	toggleWithoutAnimation,
	sidebarOpened,
	config,
	palette,
	isLoading,
	isReloadTable,
	alertMessage,
	selectItem,
	items,
	allUsers,
	// Menu
	menuItems,
	
	// Category
	categoryItems,
	
	// Auth
	authUser,
	authResult
}