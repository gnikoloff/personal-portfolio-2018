export class CircleGeometry {
    constructor (props) {
        const {
            radius,
            vertexDetail
        } = props

        this.vertices = this.makeVertices(radius, vertexDetail)
    }

    makeVertices (radius, detail) {
        const theta = Math.PI * 2
        const aspect = window.innerWidth / window.innerHeight
        const step = theta / detail
        const verticesArr = []  
        for (let i = 0; i < detail; i += 1) {
            const posx = Math.sin(i * step) * radius
            const posy = Math.cos(i * step) * radius * aspect
            verticesArr.push(posx, posy)
        }
        return new Float32Array(verticesArr)
    }

}