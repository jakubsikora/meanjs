'use strict';

// Stops controller
angular.module('stops').controller('StopsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stops',
	function($scope, $stateParams, $location, Authentication, Stops ) {
		$scope.authentication = Authentication;

		// Create new Stop
		$scope.create = function() {
			// Create new Stop object
			var stop = new Stops ({
				name: this.name
			});

			// Redirect after save
			stop.$save(function(response) {
				$location.path('stops/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Stop
		$scope.remove = function( stop ) {
			if ( stop ) { stop.$remove();

				for (var i in $scope.stops ) {
					if ($scope.stops [i] === stop ) {
						$scope.stops.splice(i, 1);
					}
				}
			} else {
				$scope.stop.$remove(function() {
					$location.path('stops');
				});
			}
		};

		// Update existing Stop
		$scope.update = function() {
			var stop = $scope.stop ;

			stop.$update(function() {
				$location.path('stops/' + stop._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Stops
		$scope.find = function() {
			$scope.stops = Stops.query();
		};

		// Find existing Stop
		$scope.findOne = function() {
			$scope.stop = Stops.get({ 
				stopId: $stateParams.stopId
			});
		};
	}
]);