'use strict';

//Stops service used to communicate Stops REST endpoints
angular.module('stops').factory('Stops', ['$resource',
	function($resource) {
		return $resource('stops/:stopId', { stopId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);