var miApp = angular.module('visorApp', []);

/******************************** Controller *********************************/

miApp.controller('AttributesControl', function ($scope) {

	// Vars
	$scope.controlsInterface = {
		'position' 	: {'x':0,'y':0,'z':0},
		'rotation' 	: {'x':0,'y':0,'z':0},
		'scale' 	: {'x':1,'y':1,'z':1}
	}
	$scope.logMsg = "";
	$scope.sceneObjects = [];
	$scope.objModelRute = 'http://threejs.org/examples/obj/male02/male02.obj';

	/******************************** Controls *******************************/

	// Position Controls
	$scope.positionXUpdate = function () {
		$scope.controlsInterface.position.x = checkValue($scope.controlsInterface.position.x);
		$scope.selectedObjectUpdate();
	};

	$scope.positionYUpdate = function () {
		$scope.controlsInterface.position.y = checkValue($scope.controlsInterface.position.y);
		$scope.selectedObjectUpdate();
	};

	$scope.positionZUpdate = function () {
		$scope.controlsInterface.position.z = checkValue($scope.controlsInterface.position.z);
		$scope.selectedObjectUpdate();
	};

	// Rotation Controls
	$scope.rotationXUpdate = function () {
		$scope.controlsInterface.rotation.x = checkValue($scope.controlsInterface.rotation.x);
		$scope.selectedObjectUpdate();
	};

	$scope.rotationYUpdate = function () {
		$scope.controlsInterface.rotation.y = checkValue($scope.controlsInterface.rotation.y);
		$scope.selectedObjectUpdate();
	};

	$scope.rotationZUpdate = function () {
		$scope.controlsInterface.rotation.z = checkValue($scope.controlsInterface.rotation.z);
		$scope.selectedObjectUpdate();
	};

	// Scale Controls
	$scope.scaleXUpdate = function () {
		$scope.controlsInterface.scale.x = checkValue($scope.controlsInterface.scale.x);
		$scope.selectedObjectUpdate();
	};

	$scope.scaleYUpdate = function () {
		$scope.controlsInterface.scale.y = checkValue($scope.controlsInterface.scale.y);
		$scope.selectedObjectUpdate();
	};

	$scope.scaleZUpdate = function () {
		$scope.controlsInterface.scale.z = checkValue($scope.controlsInterface.scale.z);
		$scope.selectedObjectUpdate();
	};

	/*************************************************************************/

	// Add message in Log Box
	$scope.logBoxUpdate = function (msg) {	
		$scope.logMsg += msg + "\n";
		$("#logBox").scrollTop(120);
	};

	/***************************** Create Objects ****************************/

	// Sphere
	$scope.createSphere = function () {
		unselect();

		// Create default Sphere
		var radius = 1, segments = 16, rings = 16;
		var geometry = new THREE.SphereGeometry(radius,segments,rings);
		var object = createObject (geometry, "sphere_" + sphereCounter);
		
		// Update Log
		$scope.logBoxUpdate("Added: " + object.name);

		// Update Counter
		sphereCounter ++;
		
		// Selected Object connect with UI and Add Sphere to Scene
		$scope.selectObjectAndAddScene(object);	
	};

	// Cube
	$scope.createCube = function () {
		unselect();

		// Create default Cube
		var width = 2, height = 2, deep = 2;
		var geometry = new THREE.BoxGeometry( width, height, deep );
		var object = createObject (geometry, "cube_" + cubeCounter);
		
		// Update Log
		$scope.logBoxUpdate("Added: " + object.name);

		// Update Counter
		cubeCounter ++;
		
		// Selected Object connect with UI and Add Sphere to Scene
		$scope.selectObjectAndAddScene(object);	
	};

	// Cylinder
	$scope.createCylinder = function () {
		unselect();

		// Create default Cylinder
		var radius = 1, segments = 16, height = 1;
		var geometry = new THREE.CylinderGeometry( radius, radius, height, segments );
		var object = createObject (geometry, "cylinder_" + cylinderCounter);
		
		// Update Log
		$scope.logBoxUpdate("Added: " + object.name);

		// Update Counter
		cylinderCounter ++;
		
		// Selected Object connect with UI and Add Sphere to Scene
		$scope.selectObjectAndAddScene(object);	
	};

	// Plane
	$scope.createPlane = function () {
		unselect();

		// Create default Plane
		var width = 2, height = 2;
		var geometry = new THREE.PlaneGeometry( width, height, 16 );
		var object = createObject (geometry, "plane_" + planeCounter);
		
		// Update Log
		$scope.logBoxUpdate("Added: " + object.name);

		// Update Counter
		planeCounter ++;
		
		// Selected Object connect with UI and Add Sphere to Scene
		$scope.selectObjectAndAddScene(object);	
	};

	// Update interface selected object
	$scope.selectedObjectUpdate = function () {
		if (selectedObject) {
			// Position
			selectedObject.position.x = $scope.controlsInterface.position.x;
			selectedObject.position.y = $scope.controlsInterface.position.y;
			selectedObject.position.z = $scope.controlsInterface.position.z;
			// Rotation
			selectedObject.rotation.x = $scope.controlsInterface.rotation.x;
			selectedObject.rotation.y = $scope.controlsInterface.rotation.y;
			selectedObject.rotation.z = $scope.controlsInterface.rotation.z;
			// Scale
			selectedObject.scale.x = $scope.controlsInterface.scale.x;
			selectedObject.scale.y = $scope.controlsInterface.scale.y;
			selectedObject.scale.z = $scope.controlsInterface.scale.z;
		}
	};

	// Select object and add Scene
	$scope.selectObjectAndAddScene = function (object) {
		selectedObject = object;
		$scope.controlsInterface.position = selectedObject.position;
		$scope.controlsInterface.rotation = selectedObject.rotation;
		$scope.controlsInterface.scale = selectedObject.scale;

		// Add Sphere to Scene
		scene.add(object);
		$scope.sceneObjects.push(selectedObject);
	};

	// Select with click
	$scope.clickOnObject = function(e){
		mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
		
		raycaster.setFromCamera( mouse, camera );

		var intersects = raycaster.intersectObjects( $scope.sceneObjects );
		if(intersects.length > 0){
			if (selectedObject && selectedObject.material) {
				selectedObject.material.opacity = 1;
			}
			selectedObject = intersects[0].object;
			selectedObject.material.opacity = selectedOpacity;
			$scope.controlsInterface.position = selectedObject.position;
			$scope.controlsInterface.rotation = selectedObject.rotation;
			$scope.controlsInterface.scale = selectedObject.scale;
		} else {
			if (selectedObject && selectedObject.material) {
				selectedObject.material.opacity = 1;
				selectedObject = null;
			}
		}
	};

	// Select Object In Outliner
	$scope.selectObjectInOutliner = function(o) {
		if (selectedObject) {
			selectedObject.material.opacity = 1;
		}
		
		selectedObject = o;
		selectedObject.material.opacity = selectedOpacity;

		$scope.controlsInterface.position = selectedObject.position;
		$scope.controlsInterface.rotation = selectedObject.rotation;
		$scope.controlsInterface.scale = selectedObject.scale;		
	};

	// Delete Object
	$scope.deleteObject = function(o) {
		$scope.logBoxUpdate("Deleted: " + o.name);
		//var objectAux = scene.getObjectByName( o.name );
		for (var i = 0; i < $scope.sceneObjects.length; i++) {
			if ($scope.sceneObjects[i].name == o.name) {
				$scope.sceneObjects.splice(i, 1);
				scene.remove(o);
				break;
			};
		};
	};

	// Generate Screenshot
	$scope.generateScreenshot = function() {
		// Generate State for render
		// Unselect
		if (selectedObject && selectedObject.material) {
			selectedObject.material.opacity = 1;
		}
		// Hide grid
		gridHelper.visible = false;
		axesOrigin.visible = false;

		// Generate Screenshot
		perspectiveWidth = $("#perspective").width();
		renderer.setSize(perspectiveWidth, perspectiveWidth*(9/16));
		renderer.render(scene, camera);
		var imageAux = renderer.domElement.toDataURL( 'image/png' );

		// Recover State for render
		// Select
		if (selectedObject && selectedObject.material) {
			selectedObject.material.opacity = selectedOpacity;
		}
		// Show grid
		gridHelper.visible = true;
		axesOrigin.visible = true;

		// Open image
		window.open( imageAux, 'screenshot' );
	};

	// Load Obj file with texture
	$scope.loadObjAndTexture = function(texture_rute, obj_rute) {
		
		// Manager
		var manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {
			console.log( item, loaded, total );
		};

		// texture
		var texture = new THREE.Texture();
		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};
		var onError = function ( xhr ) {
		};
		// var loader = new THREE.ImageLoader( manager );
		// loader.load( texture_rute, function ( image ) {
		// 	texture.image = image;
		// 	texture.needsUpdate = true;
		// } );
		THREE.ImageUtils.crossOrigin = '';
		var texture = THREE.ImageUtils.loadTexture(texture_rute);
		var material = new THREE.MeshPhongMaterial({
			ambient: 0x808080,
			map: texture,
			specular: 0xFFFFFF,
			shininess: 30,
			shading: THREE.FlatShading,
		});

		//OBJ
		var loader = new THREE.OBJLoader( manager );
		loader.load( obj_rute, function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.map = texture;
				}
			} );
			scene.add( object );
			selectedObject = object;
			selectedObject.name = "obj_" + objCounter;
			selectedObject.material = { 'opacity' : selectedOpacity };
			$scope.sceneObjects.push(selectedObject);

			objCounter++;

			$scope.controlsInterface.position = selectedObject.position;
			$scope.controlsInterface.rotation = selectedObject.rotation;
			$scope.controlsInterface.scale = selectedObject.scale;

		}, onProgress, onError );
	};

	// Import Obj file
	$scope.importOBJ = function() {
		$scope.loadObjAndTexture('http://threejs.org/examples/textures/UV_Grid_Sm.jpg',$scope.objModelRute);
	};

	// Reset camera position
	$scope.resetCamera = function (argument) {
		controls.reset();
	};

	// Render loop
	$scope.render = function () {
		requestAnimationFrame($scope.render);
		
		perspectiveWidth = $("#perspective").width();
		renderer.setSize(perspectiveWidth, perspectiveWidth*(9/16));

		renderer.render(scene, camera);
		controls.update();
	};

	///////////////////////////////////////////////////////////////////////////
	////////////////////////////////// Main ///////////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	// Scene and camera
	cnvs = $("#scene");
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(3, cnvs.get(0).width / cnvs.get(0).height , 1, 10000);
	camera.position.set(200,200,zoom);
	camera.lookAt( scene.position );

	// Events
	document.addEventListener("mousemove",updateMouse,false);
	cnvs.get(0).addEventListener("click",$scope.clickOnObject,false);
	
	// Lights
	initLightsScene();
	addLight();

	// Grid
	var sizeGrid = 12;
	var stepGrid = 1;
	gridHelper = new THREE.GridHelper( sizeGrid, stepGrid );
	scene.add( gridHelper );

	// Axes
	axesOrigin = buildAxes(5);
	scene.add(axesOrigin);

	// renderer
	renderer = new THREE.WebGLRenderer({canvas: cnvs.get(0), preserveDrawingBuffer: true});
	renderer.setClearColor( 0x111);
	perspectiveWidth = $("#perspective").width();
	renderer.setSize(perspectiveWidth, perspectiveWidth*(9/16));
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFShadowMap;

	// Control camera
	controls = new THREE.TrackballControls( camera, cnvs.get(0));
	
	// Initiate render loop
	$scope.render();

});