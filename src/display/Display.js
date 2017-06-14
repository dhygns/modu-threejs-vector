import THREE from "n3d-threejs"
import Brush from "./Brush.js"

class Display {

  constructor() {
    this.renderer = new THREE.WebGLRenderer({alpha : true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.brush = new Brush();

    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();

    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({ map : this.brush.texture })
    ));

  }


  update() {
    if(this.oldt == undefined) this.nowt = this.oldt = new Date() * 0.001;
    this.nowt = new Date() * 0.001;
    this.delt = this.nowt - this.oldt;
    this.oldt = this.nowt;


    this.brush.update(this.delt);
  }

  render() {
    this.brush.render(this.renderer);
    this.renderer.render(this.scene, this.camera);
  }

}

export default Display;
