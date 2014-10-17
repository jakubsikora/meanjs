'use strict';

(function() {
	// Livestops Controller Spec
	describe('Livestops Controller Tests', function() {
		// Initialize global variables
		var LivestopsController,
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

			// Initialize the Livestops controller.
			LivestopsController = $controller('LivestopsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Livestop object fetched from XHR', inject(function(Livestops) {
			// Create sample Livestop using the Livestops service
			var sampleLivestop = new Livestops({
				name: 'New Livestop'
			});

			// Create a sample Livestops array that includes the new Livestop
			var sampleLivestops = [sampleLivestop];

			// Set GET response
			$httpBackend.expectGET('livestops').respond(sampleLivestops);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.livestops).toEqualData(sampleLivestops);
		}));

		it('$scope.findOne() should create an array with one Livestop object fetched from XHR using a livestopId URL parameter', inject(function(Livestops) {
			// Define a sample Livestop object
			var sampleLivestop = new Livestops({
				name: 'New Livestop'
			});

			// Set the URL parameter
			$stateParams.livestopId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/livestops\/([0-9a-fA-F]{24})$/).respond(sampleLivestop);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.livestop).toEqualData(sampleLivestop);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Livestops) {
			// Create a sample Livestop object
			var sampleLivestopPostData = new Livestops({
				name: 'New Livestop'
			});

			// Create a sample Livestop response
			var sampleLivestopResponse = new Livestops({
				_id: '525cf20451979dea2c000001',
				name: 'New Livestop'
			});

			// Fixture mock form input values
			scope.name = 'New Livestop';

			// Set POST response
			$httpBackend.expectPOST('livestops', sampleLivestopPostData).respond(sampleLivestopResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Livestop was created
			expect($location.path()).toBe('/livestops/' + sampleLivestopResponse._id);
		}));

		it('$scope.update() should update a valid Livestop', inject(function(Livestops) {
			// Define a sample Livestop put data
			var sampleLivestopPutData = new Livestops({
				_id: '525cf20451979dea2c000001',
				name: 'New Livestop'
			});

			// Mock Livestop in scope
			scope.livestop = sampleLivestopPutData;

			// Set PUT response
			$httpBackend.expectPUT(/livestops\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/livestops/' + sampleLivestopPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid livestopId and remove the Livestop from the scope', inject(function(Livestops) {
			// Create new Livestop object
			var sampleLivestop = new Livestops({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Livestops array and include the Livestop
			scope.livestops = [sampleLivestop];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/livestops\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLivestop);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.livestops.length).toBe(0);
		}));
	});
}());