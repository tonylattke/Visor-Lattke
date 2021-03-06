// create the particle variables
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 50 - 25,
      pY = Math.random() * 50 - 25,
      pZ = Math.random() * 50 - 25,
      particle = new THREE.Vector3(
        pX, pY, pZ
      );

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

// add it to the scene
scene.add(particleSystem);

https://aerotwist.com/tutorials/creating-particles-with-three-js/