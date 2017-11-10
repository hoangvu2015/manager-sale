'use strict';

angular.module('core')
.controller('HeaderController', HeaderController)

function HeaderController($scope, Authentication, Menus) {
	$scope.authentication = Authentication;
	$scope.isCollapsed = false;
	$scope.menu = Menus.getMenu('topbar');
	$scope.cmsprefix = window.cmsprefix;
}
