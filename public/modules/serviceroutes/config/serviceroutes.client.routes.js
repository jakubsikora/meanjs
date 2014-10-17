'use strict';

//Setting up route
angular.module('serviceroutes').config(['$stateProvider',
	function($stateProvider) {
		// Serviceroutes state routing
		$stateProvider.
		state('listServiceroutes', {
			url: '/serviceroutes',
			templateUrl: 'modules/serviceroutes/views/list-serviceroutes.client.view.html'
		}).
		state('createServiceroute', {
			url: '/serviceroutes/create',
			templateUrl: 'modules/serviceroutes/views/create-serviceroute.client.view.html'
		}).
		state('viewServiceroute', {
			url: '/serviceroutes/:servicerouteId',
			templateUrl: 'modules/serviceroutes/views/view-serviceroute.client.view.html'
		}).
		state('editServiceroute', {
			url: '/serviceroutes/:servicerouteId/edit',
			templateUrl: 'modules/serviceroutes/views/edit-serviceroute.client.view.html'
		});
	}
]);