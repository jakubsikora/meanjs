'use strict';

//Serviceroutes service used to communicate Serviceroutes REST endpoints
angular.module('serviceroutes').factory('Serviceroutes', ['$resource',
	function($resource) {
		return $resource('serviceroutes/:servicerouteId', { servicerouteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);