'use strict';

angular.module('auth')

.factory('Authentication', function($window) {
	return {
		user: $window.user,
		isAdmin: isAdmin,
		exist: exist
	};

	/*ROLES*/
	function isAdmin() {

		if (_.intersection($window.user.scope, ['admin']).length === 0)
			return false;
		return true;
	}

	function exist(roles) {
		return _.intersection($window.user.scope, roles).length > 0;
	}
});
