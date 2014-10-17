'use strict';

//Livestops service used to communicate Livestops REST endpoints
angular.module('livestops').factory('Livestops', ['$resource',
	function($resource) {
		return $resource('livestops/:livestopId', { livestopId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);