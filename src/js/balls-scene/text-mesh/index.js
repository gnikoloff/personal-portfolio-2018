import { makeShader } from '../../utils/make-shader'
import { makeProgram } from '../../utils/make-program'
import { makeVAO } from '../../utils/make-vao'
import { makeTexture } from '../../utils/make-texture'

import { canvasTexture } from '../../canvas-texture'

import vertexShaderTextSrc from './vertex-shader.glsl'
import fragmentShaderTextSrc from './fragment-shader.glsl'

export class TextMesh {
    constructor (gl, props) {
        this.gl = gl
        const {
            text,
            geometry,
            transformMatrix
        } = props

        const textureData = canvasTexture.drawText(text)
        this.texture = makeTexture(gl, {
            width: 400,
            height: 300,
            image: textureData
        })

        this.drawMode = 4
        this.transformMatrix = transformMatrix

        const vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderTextSrc)
        const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderTextSrc)
        this.program = makeProgram(gl, vertexShader, fragmentShader)

        const a_position = gl.getAttribLocation(this.program, 'a_position')
        const a_uv = gl.getAttribLocation(this.program, 'a_uv')

        gl.useProgram(this.program)
        this.u_translateMatrix = gl.getUniformLocation(this.program, 'u_translateMatrix')
        this.u_diffuse = gl.getUniformLocation(this.program, 'u_diffuse')
        gl.uniformMatrix4fv(this.u_translateMatrix, false, this.transformMatrix)
        gl.uniform1i(this.u_diffuse, 0)
        gl.useProgram(null)

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

    translate () {
        this.gl.useProgram(this.program)
        this.gl.uniformMatrix4fv(this.u_translateMatrix, false, this.transformMatrix)
        this.gl.useProgram(null)
    }

    renderFrame (gl, dt, now) {

        if (this.rtn.vaoExtension) {
            this.rtn.vaoExtension.bindVertexArrayOES(this.rtn.vao)
        }

        gl.useProgram(this.program)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this.texture)
        gl.drawElements(this.drawMode, this.vertexCount, gl.UNSIGNED_SHORT, 0)
        gl.bindTexture(gl.TEXTURE_2D, null)
        gl.disable(gl.BLEND)
        gl.useProgram(null)

        if (this.rtn.vaoExtension) {
            this.rtn.vaoExtension.bindVertexArrayOES(null)
        }
    }
    
}