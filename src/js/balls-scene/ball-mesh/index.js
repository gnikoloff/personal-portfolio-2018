import { makeShader } from '../../utils/make-shader'
import { makeProgram } from '../../utils/make-program'
import { makeVAO } from '../../utils/make-vao'

import vertexShaderBallsSrc from './vertex-shader.glsl'
import fragmentShaderBallsSrc from './fragment-shader.glsl'

export class BallMesh {
    constructor (gl, props) {
        this.gl = gl
        const {
            geometry,
            vertexCount,
            transformMatrix,
            color
        } = props
        this.vertexCount = vertexCount
        this.transformMatrix = transformMatrix

        this.drawMode = 6
        
        const vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderBallsSrc)
        const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderBallsSrc)
        this.program = makeProgram(gl, vertexShader, fragmentShader)

        const a_position = gl.getAttribLocation(this.program, 'a_position')

        this.u_translateMatrix = gl.getUniformLocation(this.program, 'u_translateMatrix')
        this.u_color = gl.getUniformLocation(this.program, 'u_color')

        gl.useProgram(this.program)
        gl.uniformMatrix4fv(this.u_translateMatrix, false, this.transformMatrix)
        gl.uniform4f(this.u_color, ...color)
        gl.useProgram(null)
        
        const attribs = [
            {
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_position,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.vertices,
                drawType: gl.STATIC_DRAW
            }
        ]

        this.rtn = makeVAO(gl, attribs)

    }

    translate () {
        this.gl.useProgram(this.program)
        this.gl.uniformMatrix4fv(this.u_translateMatrix, false, this.transformMatrix)
        this.gl.useProgram(null)
    }

    renderFrame (gl, dt, now) {
        gl.useProgram(this.program)
        if (this.rtn.vaoExtension) {
            this.rtn.vaoExtension.bindVertexArrayOES(this.rtn.vao)
        }
        gl.drawArrays(this.drawMode, 0, this.vertexCount)
        if (this.rtn.vaoExtension) {
            this.rtn.vaoExtension.bindVertexArrayOES(null)
        }
        gl.useProgram(null)
    }

}