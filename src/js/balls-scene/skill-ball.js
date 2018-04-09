import { BallMesh } from './ball-mesh'
import { TextMesh } from './text-mesh'

export class SkillBall {
    constructor (gl, props) {
        const {
            skill,
            circleGeometry,
            planeGeometry,
            vertexCount,
            color,
            position,
            velocity
        } = props
        
        this.position = position
        this.velocity = velocity

        const transformMatrix = this.transformMatrix = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ])

        this.ballMesh = new BallMesh(gl, {
            geometry: circleGeometry,
            vertexCount,
            transformMatrix,
            color
        })
        this.textMesh = new TextMesh(gl, {
            text: skill,
            geometry: planeGeometry,
            transformMatrix
        })
        this.translate(this.position.x, this.position.y)
    }

    translate (x = 0, y = 0) {
        this.position.x = this.transformMatrix[12] = x
        this.position.y = this.transformMatrix[13] = y
        this.ballMesh.translate()
        this.textMesh.translate()
    }

    renderFrame (gl, dt, now) {
        this.ballMesh.renderFrame(gl, dt, now)
        this.textMesh.renderFrame(gl, dt, now)
    }

}