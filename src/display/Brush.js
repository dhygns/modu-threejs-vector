
import THREE from "n3d-threejs"

const particle_count = 10;

class Particle extends THREE.Object3D {

  constructor() {
    super();
    this.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        transparent : true,
        vertexShader : ` // vertex.count
        varying vec2 vtex;

        void main(void) {
          vtex = uv;
          gl_Position = vec4(position, 1.0);
        }
        `,
        fragmentShader : `  //texture.width * texture.height
        varying vec2 vtex;

        void main(void) {
          float alpha = smoothstep(0.4, 0.5, vtex.x);
          gl_FragColor = vec4(1.0, 1.0, 0.0, alpha);
        }
        `
      })
    ));
    //
    //
    //

  }
}




class Brush {
  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 10.0;

    this._texture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter : THREE.LinearFilter, magFilter : THREE.LinearFilter
    });

    for(var i = 0 ; i < 1 ; i ++) this.scene.add(new Particle());
  }

  update(dt) {
    this.scene.children.forEach((obj)=>{
      if(obj.update) obj.update(dt);
    });
    // this.brush.update(dt);
  }

  render(rdrr) {
    // rdrr.autoClear = false;
    rdrr.render(this.scene, this.camera, this._texture);
    // rdrr.autoClear = true;
  }

  get texture() { return this._texture; }
}

export default Brush
