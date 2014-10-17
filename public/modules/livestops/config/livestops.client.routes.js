'use strict';

//Setting up route
angular.module('livestops').config(['$stateProvider',
	function($stateProvider) {
		// Livestops state routing
		$stateProvider.
		state('listLivestops', {
			url: '/livestops',
			templateUrl: 'modules/livestops/views/list-livestops.client.view.html'
		}).
		state('createLivestop', {
			url: '/livestops/create',
			templateUrl: 'modules/livestops/views/create-livestop.client.view.html'
		}).
		state('viewLivestop', {
			url: '/livestops/:livestopId',
			templateUrl: 'modules/livestops/views/view-livestop.client.view.html'
		}).
		state('editLivestop', {
			url: '/livestops/:livestopId/edit',
			templateUrl: 'modules/livestops/views/edit-livestop.client.view.html'
		});
	}
]);