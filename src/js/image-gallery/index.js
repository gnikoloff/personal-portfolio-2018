import { makeShader } from '../utils/make-shader'
import { makeProgram } from '../utils/make-program'
import { makeVAO } from '../utils/make-vao'
import { makeTexture } from '../utils/make-texture'
import { PlaneGeometry } from '../geometry/plane'

import vertexShaderGallerySrc from './vertex-shader.glsl'
import fragmentShaderGallerySrc from './fragment-shader.glsl'

export class ImageGallery {
    constructor (gl, props) {
        this.gl = gl

        const { 
            images,
            width,
            height,
            widthSegments,
            heightSegments
        } = props

        this.drawMode = gl.TRIANGLES
        this.mousePos = { x: 0, y: 0 }
        this.mousePosTarget = { x: 0, y: 0 }

        this.ballsSimMixFactor = 1
        this.ballsSimMixFactorTarget = this.ballsSimMixFactor
        this.hoverOffsetFactor = 0
        this.hoverOffsetFactorTarget = this.hoverOffsetFactor

        const vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderGallerySrc)
        const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderGallerySrc)
        this.program = makeProgram(gl, vertexShader, fragmentShader)

        const a_position = gl.getAttribLocation(this.program, 'a_position')
        const a_uv = gl.getAttribLocation(this.program, 'a_uv')

        this.u_texture = gl.getUniformLocation(this.program, 'u_textures[0]');
        this.u_ballsTexture = gl.getUniformLocation(this.program, 'u_ballsTexture')
        this.u_time = gl.getUniformLocation(this.program, 'u_time')
        this.u_texMixFactor = gl.getUniformLocation(this.program, 'u_texMixFactor')
        this.u_ballsSimMixFactor = gl.getUniformLocation(this.program, 'u_ballsSimMixFactor')
        this.u_hoverOffset = gl.getUniformLocation(this.program, 'u_hoverOffset')
        this.u_mousePos = gl.getUniformLocation(this.program, 'u_mousePos')
        
        this.textures = images.map(img => {
            return makeTexture(gl, {
                width: img.width,
                heigth: img.height,
                image: img
            })
        })
        this.textureMixFactor = 0
        this.textureMixFactorTarget = this.textureMixFactor
        
        gl.useProgram(this.program)
        gl.uniform1iv(this.u_texture, images.map((a, i) => i))
        gl.uniform1i(this.u_ballsTexture, images.length)
        gl.uniform1f(this.u_ballsSimMixFactor, this.ballsSimMixFactor)
        gl.uniform1f(this.u_hoverOffset, this.hoverOffsetFactor)
        gl.useProgram(null)

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

    onMouseMove (mousePos) {
        const x = mousePos.x - 0.5
        const y = mousePos.y - 0.5
        this.mousePosTarget.x = x
        this.mousePosTarget.y = y
        
        if (x < -0.4) {
            this.hoverOffsetFactorTarget = 1.2
        }
    }

    setTextureIndex (idx) {
        this.textureMixFactorTarget = (1 / this.textures.length) * (idx)
    }

    hover () {
        // this.drawMode = this.gl.TRIANGLES
        this.ballsSimMixFactorTarget = 0
    }

    unHover () {
        // this.drawMode = this.gl.POINTS
        this.ballsSimMixFactorTarget = 1
    }

    renderFrame (gl, dt, now, ballsTexture) {
        if (this.rtn.vaoExtension) {
            this.rtn.vaoExtension.bindVertexArrayOES(this.rtn.vao)
        }

        gl.useProgram(this.program)

        gl.uniform1f(this.u_time, now)
        gl.uniform1f(this.u_texMixFactor, this.textureMixFactor)
        gl.uniform1f(this.u_ballsSimMixFactor, this.ballsSimMixFactor)
        gl.uniform1f(this.u_hoverOffset, this.hoverOffsetFactor)

        const { x, y } = this.mousePos
        this.gl.uniform2f(this.u_mousePos, x + 0.5, 1 - y)
        this.textures.forEach((texture, i) => {
            gl.activeTexture(gl[`TEXTURE${i}`])
            gl.bindTexture(gl.TEXTURE_2D, texture)
        })
        
        gl.activeTexture(gl[`TEXTURE${this.textures.length}`])
        gl.bindTexture(gl.TEXTURE_2D, ballsTexture)
        gl.drawElements(this.drawMode, this.vertexCount, gl.UNSIGNED_SHORT, 0)
        gl.useProgram(null)

        if (this.rtn.vaoExtension) {
            this.rtn.vaoExtension.bindVertexArrayOES(null)
        }

        const mixTime = dt * 5
        
        this.textureMixFactor += (this.textureMixFactorTarget - this.textureMixFactor) * mixTime
        this.hoverOffsetFactor += (this.hoverOffsetFactorTarget - this.hoverOffsetFactor) * mixTime

        this.ballsSimMixFactor += (this.ballsSimMixFactorTarget - this.ballsSimMixFactor) * (dt * 3)
        
        this.mousePos.x += (this.mousePosTarget.x - this.mousePos.x) * mixTime
        this.mousePos.y += (this.mousePosTarget.y - this.mousePos.y) * mixTime

    }

}