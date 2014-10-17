'use strict';

//Setting up route
angular.module('stops').config(['$stateProvider',
	function($stateProvider) {
		// Stops state routing
		$stateProvider.
		state('listStops', {
			url: '/stops',
			templateUrl: 'modules/stops/views/list-stops.client.view.html'
		}).
		state('createStop', {
			url: '/stops/create',
			templateUrl: 'modules/stops/views/create-stop.client.view.html'
		}).
		state('viewStop', {
			url: '/stops/:stopId',
			templateUrl: 'modules/stops/views/view-stop.client.view.html'
		}).
		state('editStop', {
			url: '/stops/:stopId/edit',
			templateUrl: 'modules/stops/views/edit-stop.client.view.html'
		});
	}
]);