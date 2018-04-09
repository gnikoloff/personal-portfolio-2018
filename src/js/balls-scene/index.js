import { CircleGeometry } from '../geometry/circle'
import { PlaneGeometry } from '../geometry/plane'
import { SkillBall } from './skill-ball'

export class BallsScene {
    constructor (gl, props) {
        const {
            skills
        } = props

        this.balls = []
        this.count = skills.length
        this.sceneGravity = {
            x: -0.1, y: 0.1
        }

        this.radius = 0.125
        const vertexDetail = 25

        // reuse geometry for balls meshes
        const circleGeometry = new CircleGeometry({
            radius: this.radius, 
            vertexDetail
        })
        const planeGeometry = new PlaneGeometry({
            width:  0.2,
            height: 0.2,
            widthSegments:  3,
            heightSegments: 3
        })

        const colors = [
            [ 0.219, 0, 0.894, 1 ],
            [ 0.968, 0.56, 0.701, 1 ],
            [ 0.341, 0.294, 0.564, 1 ],
            [ 0.901, 0.403, 0.403, 1 ],
        ]
        let colorPicker = 0
        
        for (let i = 0; i < this.count; i += 1) {
            const skill = skills[i]
            const x = (Math.random() * 2 - 1) * 2 * 0.5
            const y = (Math.random() * 2 - 1) * 2 * 0.5
            const color = colors[colorPicker]
            
            colorPicker += 1
            if (colorPicker === colors.length) colorPicker = 0

            const skillBall = new SkillBall(gl, {
                skill,
                vertexCount: vertexDetail,
                circleGeometry,
                planeGeometry,
                color,
                position: { x, y },
                velocity: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 } 
            })

            this.balls.push(skillBall)

        }

        let gravityCount = 0
        const gravityInterval = setInterval(() => {
            if (gravityCount % 2 === 0) {
                this.sceneGravity.y *= -1
            } else {
                this.sceneGravity.x *= -1
            }
            gravityCount += 1
        }, 2000)

    }

    onMouseMove (props) {
        
    }

    renderFrame (gl, dt, now) {
        const spring = 0.3
        this.balls.forEach((ball, i) => {
            for (let j = 0; j < this.balls.length; j += 1) {
                if (i === j) return

                const ball2 = this.balls[j]
                const dx = ball2.position.x - ball.position.x
                const dy = ball2.position.y - ball.position.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const minDist = Math.sqrt(this.radius)

                if (dist < minDist) {
                    const angle = Math.atan2(dy, dx)
                    const tx = ball.position.x + Math.cos(angle) * minDist
                    const ty = ball.position.y + Math.sin(angle) * minDist
                    const ax = (tx - ball.position.x) * spring * 0.5
                    const ay = (ty - ball.position.y) * spring * 0.5

                    ball.velocity.x  -= ax * 10
                    ball.velocity.y  -= ay * 10
                    ball2.velocity.x += ax * 10
                    ball2.velocity.y += ay * 10

                }

            }
        })

        this.balls.forEach(ball => {
            const bounce = 0.6

            if (ball.position.x + this.radius > 1) {
                ball.position.x = 1 - this.radius
                ball.velocity.x *= -1
                ball.velocity.x *= bounce
            } else if (ball.position.x - this.radius < -1) {
                ball.position.x = -1 + this.radius
                ball.velocity.x *= -1
            } else if (ball.position.y + this.radius * 2 > 1) {
                ball.position.y = 1 - this.radius * 2
                ball.velocity.y *= -1
                ball.velocity.x *= bounce
            } else if (ball.position.y - this.radius * 2 < -1) {
                ball.position.y = -1 + this.radius * 2
                ball.velocity.y *= -1
                ball.velocity.y *= bounce
            }


            ball.velocity.x += this.sceneGravity.x
            ball.velocity.y += this.sceneGravity.y

            ball.position.x += ball.velocity.x * (dt * 0.1)
            ball.position.y += ball.velocity.y * (dt * 0.1)
            
            ball.translate(ball.position.x, ball.position.y)
            ball.renderFrame(gl, dt, now)
        })

    }

}