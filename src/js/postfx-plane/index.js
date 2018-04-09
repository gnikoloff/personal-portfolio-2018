import { makeShader } from '../utils/make-shader'
import { makeProgram } from '../utils/make-program'
import { makeVAO } from '../utils/make-vao'
import { PlaneGeometry } from '../geometry/plane'

export class PostFX {
    constructor (gl, props) {
        const {
            width,
            height,
            shaderBits
        } = props

        this.drawMode = gl.TRIANGLES
        this.mixFactor = 0
        this.mixFactorTarget = this.mixFactor
        
        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec2 a_uv;

            varying vec2 v_uv;

            ${
                (shaderBits.vertexShader && shaderBits.vertexShader.head) ? 
                    shaderBits.vertexShader.head : ''
            }

            void main () {
                vec2 newPosition = a_position;

                ${
                    (shaderBits.vertexShader && shaderBits.vertexShader.body) ? 
                        shaderBits.vertexShader.body : 
                        ''
                }

                vec4 position = vec4(newPosition, 0.0, 1.0);                

                gl_Position = position;
                v_uv = a_uv;
            }
        `
        const fragmentShaderSource = `
            precision highp float;
            
            uniform sampler2D u_diffuse;
            uniform vec2 u_resolution;
            uniform float u_mixFactor;

            ${
                (shaderBits.fragmentShader && shaderBits.fragmentShader.head) ? 
                    shaderBits.fragmentShader.head : 
                    ''
            }        

            varying vec2 v_uv;

            void main () {
                vec2 uv = v_uv;

                ${
                    (shaderBits.fragmentShader && shaderBits.fragmentShader.body) ? 
                        shaderBits.fragmentShader.body : 
                        ''
                }            
            }
        `
        const vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
        this.program = makeProgram(gl, vertexShader, fragmentShader);

        const a_position = gl.getAttribLocation(this.program, 'a_position')
        const a_uv = gl.getAttribLocation(this.program, 'a_uv')

        this.u_diffuse = gl.getUniformLocation(this.program, 'u_diffuse')
        this.u_resolution = gl.getUniformLocation(this.program, 'u_resolution')
        this.u_mixFactor = gl.getUniformLocation(this.program, 'u_mixFactor')

        gl.useProgram(this.program)
        gl.uniform1i(this.u_diffuse, 0)
        gl.uniform2f(this.u_resolution, window.innerWidth, window.innerHeight)
        gl.uniform1f(this.u_mixFactor, this.mixFactor)
        gl.useProgram(null)

        const widthSegments  = 1
        const heightSegments = 1
        const geometry = new PlaneGeometry({ width, height, widthSegments, heightSegments })
        const attribs = [
            {
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_position,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.vertices,
                drawType: gl.STATIC_DRAW
            },
            {
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_uv,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.uvs,
                drawType: gl.STATIC_DRAW
            },
            {
                bufferType: gl.ELEMENT_ARRAY_BUFFER,
                typedArray: geometry.indices,
                drawType: gl.STATIC_DRAW
            }
        ]
        this.rtn = makeVAO(gl, attribs)

        this.vertexCount = geometry.indices.length
    }

    hover () {
        this.mixFactorTarget = 1
    }

    unHover () {
        this.mixFactorTarget = 0.25
    }

    renderFrame (gl, dt, now, texture) {
        if (this.rtn.vaoExtension) {
            this.rtn.vaoExtension.bindVertexArrayOES(this.rtn.vao)
        }

        gl.useProgram(this.program)
        gl.uniform1f(this.u_mixFactor, this.mixFactor)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.drawElements(this.drawMode, this.vertexCount, gl.UNSIGNED_SHORT, 0)
        gl.bindTexture(gl.TEXTURE_2D, null)
        gl.useProgram(null)

        if (this.rtn.vaoExtension) {
            this.rtn.vaoExtension.bindVertexArrayOES(null)
        }

        this.mixFactor += (this.mixFactorTarget - this.mixFactor) * (dt * 3)

    }

}