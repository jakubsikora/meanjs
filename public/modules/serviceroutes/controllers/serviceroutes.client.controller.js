'use strict';

// Serviceroutes controller
angular.module('serviceroutes').controller('ServiceroutesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Serviceroutes',
	function($scope, $stateParams, $location, Authentication, Serviceroutes ) {
		$scope.authentication = Authentication;

		// Create new Serviceroute
		$scope.create = function() {
			// Create new Serviceroute object
			var serviceroute = new Serviceroutes ({
				name: this.name
			});

			// Redirect after save
			serviceroute.$save(function(response) {
				$location.path('serviceroutes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Serviceroute
		$scope.remove = function( serviceroute ) {
			if ( serviceroute ) { serviceroute.$remove();

				for (var i in $scope.serviceroutes ) {
					if ($scope.serviceroutes [i] === serviceroute ) {
						$scope.serviceroutes.splice(i, 1);
					}
				}
			} else {
				$scope.serviceroute.$remove(function() {
					$location.path('serviceroutes');
				});
			}
		};

		// Update existing Serviceroute
		$scope.update = function() {
			var serviceroute = $scope.serviceroute ;

			serviceroute.$update(function() {
				$location.path('serviceroutes/' + serviceroute._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Serviceroutes
		$scope.find = function() {
			$scope.serviceroutes = Serviceroutes.query();
		};

		// Find existing Serviceroute
		$scope.findOne = function() {
			$scope.serviceroute = Serviceroutes.get({ 
				servicerouteId: $stateParams.servicerouteId
			});
		};
	}
]);