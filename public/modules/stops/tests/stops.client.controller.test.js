'use strict';

(function() {
	// Stops Controller Spec
	describe('Stops Controller Tests', function() {
		// Initialize global variables
		var StopsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Stops controller.
			StopsController = $controller('StopsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Stop object fetched from XHR', inject(function(Stops) {
			// Create sample Stop using the Stops service
			var sampleStop = new Stops({
				name: 'New Stop'
			});

			// Create a sample Stops array that includes the new Stop
			var sampleStops = [sampleStop];

			// Set GET response
			$httpBackend.expectGET('stops').respond(sampleStops);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stops).toEqualData(sampleStops);
		}));

		it('$scope.findOne() should create an array with one Stop object fetched from XHR using a stopId URL parameter', inject(function(Stops) {
			// Define a sample Stop object
			var sampleStop = new Stops({
				name: 'New Stop'
			});

			// Set the URL parameter
			$stateParams.stopId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/stops\/([0-9a-fA-F]{24})$/).respond(sampleStop);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stop).toEqualData(sampleStop);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Stops) {
			// Create a sample Stop object
			var sampleStopPostData = new Stops({
				name: 'New Stop'
			});

			// Create a sample Stop response
			var sampleStopResponse = new Stops({
				_id: '525cf20451979dea2c000001',
				name: 'New Stop'
			});

			// Fixture mock form input values
			scope.name = 'New Stop';

			// Set POST response
			$httpBackend.expectPOST('stops', sampleStopPostData).respond(sampleStopResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Stop was created
			expect($location.path()).toBe('/stops/' + sampleStopResponse._id);
		}));

		it('$scope.update() should update a valid Stop', inject(function(Stops) {
			// Define a sample Stop put data
			var sampleStopPutData = new Stops({
				_id: '525cf20451979dea2c000001',
				name: 'New Stop'
			});

			// Mock Stop in scope
			scope.stop = sampleStopPutData;

			// Set PUT response
			$httpBackend.expectPUT(/stops\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/stops/' + sampleStopPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid stopId and remove the Stop from the scope', inject(function(Stops) {
			// Create new Stop object
			var sampleStop = new Stops({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Stops array and include the Stop
			scope.stops = [sampleStop];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/stops\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStop);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.stops.length).toBe(0);
		}));
	});
}());