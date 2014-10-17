'use strict';

// Livestops controller
angular.module('livestops').controller('LivestopsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Livestops',
	function($scope, $stateParams, $location, Authentication, Livestops ) {
		$scope.authentication = Authentication;

		// Create new Livestop
		$scope.create = function() {
			// Create new Livestop object
			var livestop = new Livestops ({
				name: this.name
			});

			// Redirect after save
			livestop.$save(function(response) {
				$location.path('livestops/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Livestop
		$scope.remove = function( livestop ) {
			if ( livestop ) { livestop.$remove();

				for (var i in $scope.livestops ) {
					if ($scope.livestops [i] === livestop ) {
						$scope.livestops.splice(i, 1);
					}
				}
			} else {
				$scope.livestop.$remove(function() {
					$location.path('livestops');
				});
			}
		};

		// Update existing Livestop
		$scope.update = function() {
			var livestop = $scope.livestop ;

			livestop.$update(function() {
				$location.path('livestops/' + livestop._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Livestops
		$scope.find = function() {
			$scope.livestops = Livestops.query();
		};

		// Find existing Livestop
		$scope.findOne = function() {
			$scope.livestop = Livestops.get({ 
				livestopId: $stateParams.livestopId
			});
		};
	}
]);