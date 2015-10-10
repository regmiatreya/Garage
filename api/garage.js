<script>	
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
						var slot =  vehiclePosition % slotsPerLevel ;
						var level = Math.floor( vehiclePosition / slotsPerLevel) ;
						return ([level, slot]);
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
			
				var garageItems = {};
				for (var i=0; i<nVehicles; i++) {
						var myVehicle = vehicleClass();
						// put it in while loop to create a license number that is unique. For now just using if loop.
						if (garageItems[myVehicle.license] === undefined){
								var status = myGarage.parkVehicle(myVehicle);
								var levelslot = myGarage.getLevelSlot(myVehicle);
								garageItems[myVehicle.license] = {'license':myVehicle.license, 'type': myVehicle.type, 'level': levelslot[0], 'slot': levelslot[1]};
						}
				}	
				return garageItems;
		}
		var nVehicles = 5;
		var nLevels = 4;
		var nslots = 10;	
var garageItems = simulateGarage(nVehicles, nLevels, nslots );

(function test_garage(){
var mygarage = garageClass(2,10);
	var myvehicle1 = vehicleClass();
	var myvehicle2 = vehicleClass();
	var myvehicle3 = vehicleClass();
	var myvehicle4 = vehicleClass();
	var myvehicle5 = vehicleClass();
	var myvehicle6 = vehicleClass();
	var myvehicle7 = vehicleClass();
	var myvehicle8 = vehicleClass();
	
console.log(myvehicle1,myvehicle2,myvehicle3,myvehicle4,myvehicle5,myvehicle6,myvehicle7,myvehicle8);
var status1 = mygarage.parkVehicle(myvehicle1);
var status2 = mygarage.parkVehicle(myvehicle2);
var status3 = mygarage.parkVehicle(myvehicle3);
var status4 = mygarage.parkVehicle(myvehicle4);
var status5 = mygarage.parkVehicle(myvehicle5);
var status6 = mygarage.parkVehicle(myvehicle6);
var status7 = mygarage.parkVehicle(myvehicle7);
var status8 = mygarage.parkVehicle(myvehicle8);
	
var status9 = mygarage.parkVehicle(myvehicle7);
var status10 = mygarage.parkVehicle(myvehicle8);
	
var status11 = mygarage.unParkVehicle(myvehicle3);
var status12 = mygarage.unParkVehicle(myvehicle4);
	
var status13 = mygarage.unParkVehicle(myvehicle3);
var status14 = mygarage.unParkVehicle(myvehicle4);	
console.log(status9,status10,status13,status14);	
console.log(myvehicle1,myvehicle2,myvehicle3,myvehicle4,myvehicle5,myvehicle6,myvehicle7,myvehicle8);

}());

</script>	
		
	
