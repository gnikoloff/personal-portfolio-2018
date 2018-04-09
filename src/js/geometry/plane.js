export class PlaneGeometry {
    constructor (props) {
        const {
            width,
            height,
            widthSegments,
            heightSegments
        } = props

        this.vertices = this.makeVertices(widthSegments, heightSegments, width, height)
        this.uvs = this.makeUvs(widthSegments, heightSegments)
        this.indices = this.makeIndices(widthSegments, heightSegments)   
    }

    makeVertices (widthSegments, heightSegments, width, height) {
        const verticesArr = []
        const ratex = 1 / widthSegments
        const ratey = 1 / heightSegments

        for (let y = 0; y <= heightSegments; y += 1) {
            const posy = (-0.5 + ratey * y) * height

            for (let x = 0; x <= widthSegments; x += 1) {
                const posx = (-0.5 + ratex * x) * width

                verticesArr.push(posx, posy)
            }
        }
        return new Float32Array(verticesArr)
    }

    makeUvs (widthSegments, heightSegments) {
        const uvsArr = []
        const ratex = 1 / widthSegments
        const ratey = 1 / heightSegments
        for (let y = 0; y <= heightSegments; y += 1) {
            const uvy = 1.0 - ratey * y
            for (let x = 0; x <= widthSegments; x += 1) {
                const uvx = 1.0 - ratex * x
                uvsArr.push(uvx, uvy)
            }
        }
        return new Float32Array(uvsArr)
    }

    makeIndices (widthSegments, heightSegments) {
        const widthSegment = widthSegments
        const heightSegment = heightSegments
        let indices = [];

		for (let yy = 0; yy < heightSegment; yy++) {
			for (let xx = 0; xx < widthSegment; xx++) {
				let rowStartNum = yy * (widthSegment + 1);
				let nextRowStartNum = (yy + 1) * (widthSegment + 1);

				indices.push(rowStartNum + xx);
				indices.push(rowStartNum + xx + 1);
				indices.push(nextRowStartNum + xx);

				indices.push(rowStartNum + xx + 1);
				indices.push(nextRowStartNum + xx + 1);
				indices.push(nextRowStartNum + xx);
			}
		}

		indices = new Uint16Array(indices);

		return indices;
    }

}