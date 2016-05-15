// Init Lights
function initLightsScene(){
	var ambient = new THREE.AmbientLight( 0x101010 );
	scene.add( ambient );

	for(j=0;j < MAX_LIGHTS;j++){
		var luzNew = new THREE.SpotLight( 0xffffff );
		luzNew.castShadow = true;
		luzNew.shadowCameraNear = 50;
		luzNew.shadowCameraFar = 1000;
		luzNew.shadowCameraFov = 50;
		luzNew.shadowDarkness = 0.5;
		luzNew.shadowMapWidth = 1024;
		luzNew.shadowMapHeight = 1024;
		luzNew.visible = false;
		lightList.push(luzNew);
		scene.add(luzNew);
	}
}

// Add Light to Scene
function addLight(){
	for(var co = 0; co < MAX_LIGHTS; co++){
		if(!lightList[co].visible){
			lightList[co].visible = true;
			lightList[co].position.set( camera.position.x, camera.position.y,camera.position.z );
			lightList[co].target.position.set(0,0,0);
			if(shadows){
				lightList[co].castShadow = true;
			}
			return;
		}
	}
}

