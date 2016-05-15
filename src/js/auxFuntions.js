// Update Mouse position
function updateMouse(e){
	var elem = renderer.domElement; 
	var boundingRect = elem.getBoundingClientRect();
	var x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width);
	var y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
	mouse[0] =  ( x / 750) * 2 - 1;
	mouse[1] = - ( y / 580 ) * 2 + 1;
}

// Unselect current object
function unselect () {
	if (selectedObject && selectedObject.material) {
		selectedObject.material.opacity = 1;
	}
}

// Create Object
function createObject (geometry,name) {
	var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
	material.transparent = true;
	material.opacity = selectedOpacity;

	var o = new THREE.Mesh(geometry,material);
	o.name = name;
	
	return o;
}

//loadObjAndTexture('http://threejs.org/examples/textures/UV_Grid_Sm.jpg','http://threejs.org/examples/obj/male02/male02.obj');
function loadObjAndTexture (texture_rute, obj_rute) {
	
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

	}, onProgress, onError );
}

// Draw Axis
function buildAxis(src, dst, colorHex) {
	var geom = new THREE.Geometry(), mat; 

	mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });

	geom.vertices.push( src.clone() );
	geom.vertices.push( dst.clone() );
	geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

	var axis = new THREE.Line( geom, mat, THREE.LinePieces );

	return axis;
}

// Draw all the axis
function buildAxes( length ) {
	var axes = new THREE.Object3D();
	axes.add( buildAxis( new THREE.Vector3( -length, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000 ) ); // X
	axes.add( buildAxis( new THREE.Vector3( 0, -length, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00 ) ); // Y
	axes.add( buildAxis( new THREE.Vector3( 0, 0, -length ), new THREE.Vector3( 0, 0, length ), 0x0000FF ) ); // Z
	return axes;
}