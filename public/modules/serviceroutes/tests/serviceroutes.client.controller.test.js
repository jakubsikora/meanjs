'use strict';

(function() {
	// Serviceroutes Controller Spec
	describe('Serviceroutes Controller Tests', function() {
		// Initialize global variables
		var ServiceroutesController,
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

			// Initialize the Serviceroutes controller.
			ServiceroutesController = $controller('ServiceroutesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Serviceroute object fetched from XHR', inject(function(Serviceroutes) {
			// Create sample Serviceroute using the Serviceroutes service
			var sampleServiceroute = new Serviceroutes({
				name: 'New Serviceroute'
			});

			// Create a sample Serviceroutes array that includes the new Serviceroute
			var sampleServiceroutes = [sampleServiceroute];

			// Set GET response
			$httpBackend.expectGET('serviceroutes').respond(sampleServiceroutes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.serviceroutes).toEqualData(sampleServiceroutes);
		}));

		it('$scope.findOne() should create an array with one Serviceroute object fetched from XHR using a servicerouteId URL parameter', inject(function(Serviceroutes) {
			// Define a sample Serviceroute object
			var sampleServiceroute = new Serviceroutes({
				name: 'New Serviceroute'
			});

			// Set the URL parameter
			$stateParams.servicerouteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/serviceroutes\/([0-9a-fA-F]{24})$/).respond(sampleServiceroute);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.serviceroute).toEqualData(sampleServiceroute);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Serviceroutes) {
			// Create a sample Serviceroute object
			var sampleServiceroutePostData = new Serviceroutes({
				name: 'New Serviceroute'
			});

			// Create a sample Serviceroute response
			var sampleServicerouteResponse = new Serviceroutes({
				_id: '525cf20451979dea2c000001',
				name: 'New Serviceroute'
			});

			// Fixture mock form input values
			scope.name = 'New Serviceroute';

			// Set POST response
			$httpBackend.expectPOST('serviceroutes', sampleServiceroutePostData).respond(sampleServicerouteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Serviceroute was created
			expect($location.path()).toBe('/serviceroutes/' + sampleServicerouteResponse._id);
		}));

		it('$scope.update() should update a valid Serviceroute', inject(function(Serviceroutes) {
			// Define a sample Serviceroute put data
			var sampleServiceroutePutData = new Serviceroutes({
				_id: '525cf20451979dea2c000001',
				name: 'New Serviceroute'
			});

			// Mock Serviceroute in scope
			scope.serviceroute = sampleServiceroutePutData;

			// Set PUT response
			$httpBackend.expectPUT(/serviceroutes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/serviceroutes/' + sampleServiceroutePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid servicerouteId and remove the Serviceroute from the scope', inject(function(Serviceroutes) {
			// Create new Serviceroute object
			var sampleServiceroute = new Serviceroutes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Serviceroutes array and include the Serviceroute
			scope.serviceroutes = [sampleServiceroute];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/serviceroutes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleServiceroute);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.serviceroutes.length).toBe(0);
		}));
	});
}());