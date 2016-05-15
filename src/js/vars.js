// Main
var gl;
var cnvs;
var camera, scene, renderer, controls;
var mouseX = 0, mouseY = 0;
var windowHalfX;
var windowHalfY;
var zoom = 150;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster(); 
var perspectiveWidth;
var selectedObject = null;

// Default Values
var coordinatesZero = {'x':0,'y':0,'z':0};
var coordinatesOne = {'x':1,'y':1,'z':1};
var selectedOpacity = 0.7;

// Axes & Grid
var gridHelper;
var axesOrigin;

// Lights
var lightList = [];
var MAX_LIGHTS = 5;
var memLL = [];
var shadows = true;

// Counters
var sphereCounter = 0;
var cubeCounter = 0;
var cylinderCounter = 0;
var planeCounter = 0;
var objCounter = 0;