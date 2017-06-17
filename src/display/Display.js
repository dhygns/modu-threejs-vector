import THREE from "n3d-threejs"
class Display {

  constructor() {
    this.renderer = new THREE.WebGLRenderer({alpha : true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    //Create Camera
    this.camera = new THREE.PerspectiveCamera(
      45, //Field Of View (45도)
      window.innerWidth / window.innerHeight, //Ratio oF ViewPort (화면 비율)
      1.0, //Near Plane (표현가능 최소 거리)
      1000.0 //Far Plane (표현가능 최대 거리)
    );
    this.camera.position.z = 50.0;

    //Create Scene
    this.scene = new THREE.Scene();

    this._initObject();
  }

  //private Function
  _initObject() {
    this.object = new THREE.Object3D();
    this.object.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({ color : "red" })
    ));

    this.object.velocity = {x : (Math.random() - 0.5) * 1.00 , y: (Math.random() - 0.5) * 1.00 };
    this.object.accelate = {x : (Math.random() - 0.5) * 0.01 , y: (Math.random() - 0.5) * 0.01 };

    this.scene.add(this.object);
  }

  _updateTime() {
    if(this.oldt == undefined) this.nowt = this.oldt = new Date() * 0.001;
    this.nowt = new Date() * 0.001;
    this.delt = this.nowt - this.oldt;
    return this.delt;
  }


  //public Function
  update() {
    var dt = this._updateTime(); //deltaTime Update

    this.object.velocity.x += this.object.accelate.x * dt;
    this.object.velocity.y += this.object.accelate.y * dt;

    this.object.position.x += this.object.velocity.x * dt;
    this.object.position.y += this.object.velocity.y * dt;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}

export default Display;
