
import THREE from "n3d-threejs"

class BrushFur extends THREE.Object3D {

  randomcolor() {
    // var seed = Math.random();
    //
    // if(seed < 0.2) return [0.9, 0.3, 0.1];
    // else if(seed < 0.5) return [0.05, 0.7, 0.1];
    // else if(seed < 0.9) return [0.06, 0.9, 0.1];
    // else return [0.7, 0.2, 0.3];

    return [
      0.5 + Math.random() * 0.5,
      0.5 + Math.random() * 0.5,
      0.5 + Math.random() * 0.5];
  }
  constructor() {
    super();

    this.color = { type : "3f", value : this.randomcolor()};
    this.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        transparent : true,
        uniforms : {
          unif_color : this.color
        },
        fragmentShader : `
        uniform vec3 unif_color;
        varying vec2 vtex;
        void main(void) {
          float alpha = 0.01 * smoothstep(0.15, 0.14, length(vtex));
          gl_FragColor = vec4(unif_color, alpha);
        }
        `,
        vertexShader : `
        varying vec2 vtex;
        void main(void) {
          vtex = uv * 2.0 - 1.0;
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
        `
      })
    ));
    this.position.x = Math.random() * 20.0 - 10.0;
    this.position.y = Math.random() * 20.0 - 10.0;
    this.speed = Math.sign(Math.random() - 0.5) * (2.0 + 10.0 * Math.random());
    this.radius = Math.random() * Math.PI * 2.0;
  }

  update(dt) {
    var targetspeed = Math.sign(Math.random() - 0.5) * (2.0 + 10.0 * Math.random());
    var targetradius =  Math.random() * Math.PI * 4.0;

    this.radius += (targetradius - this.radius) * dt * 10.0;
    if(this.radius > Math.PI * 2.0) this.radius -= Math.PI * 2.0;

    this.speed += (targetspeed - this.speed) * dt * 10.0;

    this.position.x += this.speed * dt * Math.sin(this.radius) ;
    this.position.y += this.speed * dt * Math.cos(this.radius);

  }
}

class Brush {
  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 40.0;

    this._texture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter : THREE.LinearFilter, magFilter : THREE.LinearFilter
    });

    for(var i = 0 ; i < 100 ; i ++) this.scene.add(new BrushFur());
  }

  update(dt) {
    this.scene.children.forEach((obj)=>{
      if(obj.update) obj.update(dt);
    });
    // this.brush.update(dt);
  }

  render(rdrr) {
    rdrr.autoClear = false;
    rdrr.render(this.scene, this.camera, this._texture);
    rdrr.autoClear = true;
  }

  get texture() { return this._texture; }
}

export default Brush
