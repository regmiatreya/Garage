	var garageControllers = angular.module("garageControllers",[]);

	garageControllers.controller('listController',['$scope', 
			function($scope){				
				

					var nVehicles = 100;
					var nLevels = 6;
					var slotsPerLevel = 20;
					// ** Function to Simualte Vehicles ** //
					$scope.garageItems = simulateGarage(nVehicles, nLevels, slotsPerLevel);
				  $scope.filterOption = {'type' : {'car': false, 'motorbike': false}, 'level' : {}};
					for (var i=1; i<=nLevels ; i++ ) {
							$scope.filterOption['level']['level' + i.toString()] = false;
					}
					$scope.isFilterSet = {'type': 0, 'level': 0};
					$scope.curPage = 0;
 					$scope.itemsPerPage = 10;					
	
					$scope.numberOfPages = function() {
							return Math.ceil($scope.garageItems.length / $scope.itemsPerPage);
					};
				
					$scope.addOption = function(property, pvalue){
						  if ( $scope.filterOption[property][pvalue] === false) { 
									$scope.filterOption[property][pvalue] = true;
									$scope.isFilterSet[property] = $scope.isFilterSet[property] + 1;
							}
					};
					$scope.removeOption = function(property, pvalue){
						 if ( $scope.filterOption[property][pvalue] === true) {
								$scope.filterOption[property][pvalue] = false;
								$scope.isFilterSet[property] = $scope.isFilterSet[property] - 1;
						 }
					};			
					$scope.filterVehicle = function(vehicle){
						  var isType = false;
							var isLevel = false;
							if ( $scope.isFilterSet.type == 0 ) {
									var isType = true;
							} else {
									if ( $scope.filterOption.type[vehicle.type] === true ) {
											var isType = true;
									}
							}
							if ( $scope.isFilterSet.level == 0 ) {
									var isLevel = true;
							} else {
									if ( $scope.filterOption.level["level" + vehicle.level] === true ) {
											var isLevel = true;
									}
							}
							if (isType === true && isLevel === true ){
								return true;
							}	
							return false;
				};
			}
	]);

garageControllers.filter('pagination', function(){
 			return function(input, start){
  				start = +start;
  				return input.slice(start);
 			};
});

// ******* Task1 below here ******* //

	
		var vehicleClass = function(){
				this.type = '';
				this.license = '';
			  this.isParked = '';
			
				var generateRandom = function(n) {
						return Math.floor( Math.random()*n);
				}
				var generateType =  function(){
						var types = ['car','motorbike'];
						var i = generateRandom(2);
						this.type = types[i];
				}
				var generateLicense = function(){
						var allstring = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;
						var preFix = allstring[generateRandom(26)] + allstring[generateRandom(26)];
						this.license = preFix + "-" + generateRandom(10000);
				}
				var unPark  = function(){
							this.isParked = false;
				}
				var park = function() {
							this.isParked = true;
				}
				generateLicense();
				generateType();
				unPark();
				return {
								park : park,
								unPark : unPark,
								license : license,
								type : type,
								isParked : isParked
				};
		}
		var garageClass = function(noOfLevels,slotsPerLevel){
				this.noOfLevels = noOfLevels;
				this.slotsPerLevel = slotsPerLevel;
				this.totalSlots = this.noOfLevels * this.slotsPerLevel;
				this.freeSlots = [];
				this.vehicles = {};
				this.errorMessage = '';
			
				if ( this.noOfLevels <= 0 ) {
						this.errorMessage = "Number of levels must be 1 or higher";
						return this.errorMessage;
				}
				if ( this.slotsPerLevel <= 0 ) {
						this.errorMessage = "Number of Slots in one level must be 1 or higher";
						return this.errorMessage;
				}
				var init_garage = function(){
						for(var i=0 ; i < this.totalSlots ; i++ ){
							this.freeSlots[i] = i;
						}
				}
				var parkVehicle = function(myVehicle){
						if (myVehicle.isParked === true) {
								this.errorMessage = myVehicle.license + ' is already parked';
								return this.errorMessage;
						}	
						if ( this.freeSlots.length <= 0) {
								this.errorMessage = 'Garage is Full';
								return this.errorMessage;
						} 
						this.vehicles[myVehicle.license] = this.freeSlots.shift();
					 	myVehicle.park();
						return true;
				}
				var unParkVehicle = function(myVehicle){
						if (myVehicle.isParked === false) {
								this.errorMessage = myVehicle.license + ' is already unParked';
								return this.errorMessage;
						}
						this.freeSlots.unshift(this.vehicles[myVehicle.license]);
						delete this.vehicles[myVehicle.license];
						myVehicle.unPark();
						return true;
				}
				var getLevelSlot = function(myVehicle) {	
						if (myVehicle.isParked === false) {
								this.errorMessage = myVehicle.license + ' is unParked';
								return this.errorMessage;
						}
						var vehiclePosition = this.vehicles[myVehicle.license]
						var slot =  vehiclePosition % slotsPerLevel + 1;
						var level = Math.floor( vehiclePosition / slotsPerLevel) + 1 ;
						return ([level.toString(), slot.toString()]);
				}
				init_garage();
				return {
							vehicles : vehicles,
							freeSlots : freeSlots,
							parkVehicle : parkVehicle,
							unParkVehicle : unParkVehicle,
							getLevelSlot : getLevelSlot
				};
		}

		var simulateGarage = function(nVehicles, nLevels, nslots ) {
				// On error do something. error on park as well
				// randomly park and unpark vehicles
				var myGarage = garageClass(nLevels,nslots);
				if ( myGarage.length !== undefined) {
						console.log(myGarage);
						return myGarage;
				} 
				var garageItems = [];
				for (var i=0; i<nVehicles; i++) {
						var myVehicle = vehicleClass();
						// put it in while loop to create a license number that is unique. For now just using if loop.

						var status = myGarage.parkVehicle(myVehicle);
						
						var levelslot = myGarage.getLevelSlot(myVehicle);
						garageItems[i] = {'license': myVehicle.license, 'type': myVehicle.type, 'level': levelslot[0], 'slot': levelslot[1]};
				}	
				return garageItems;
		}


	
		
	





 



