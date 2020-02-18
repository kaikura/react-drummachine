import * as P5 from "p5"

export interface P5Sketch {
    setup(p5: P5, canvasParentRef: "centralSquare"): void
    draw(p5: P5, canvasParentRef: "centralSquare"): void
}

class MainSketchClass implements P5Sketch {
    private comboBox = 0
    private canvasWidth = 800
    private canvasHeight = 600
    private instrumentMode: number = 0
    private layerNumber: number = 1
    private kindOfShape: number = 0
    private selectedShape: number = 0
    private selectedShape2: number = 0
    private maxNumShapes = 0
    private maxNumShape2 = 1
    private numCustShapes = 0
    private circleLandW = 500
    private clockCircleScaleSize = 1.05
    private currentGrain = 0
    private currentGrain2 = 0
    private nGrain = 5
    private nGrain2 = 10
    private firstLayerLandW = 500

    private rot1 = new Array(this.maxNumShapes)
    private shp1 = new Array(this.maxNumShapes)
    private rot2 = new Array(this.maxNumShape2)
    private shp2 = new Array(this.maxNumShape2)

    private polygon_array = new Array(this.nGrain - 1)
    private polygon_array_c = new Array() // custom polygon array
    private polygon_array2 = new Array(this.nGrain2 - 1)
    private myTimeout

    constructor() {
        this.initializeArrays()
        this.initializePolygonArrays()
    }

    private initializePolygonArrays() {
        //LOOP TO GENERATE DIFFERENT SHAPES
        for (let i = 2; i <= this.nGrain; i++) {
            //starts from 2 since we need a line as the simplest shape possible
            this.polygon_array[i - 2] = new Array(i)
            for (let h = 0; h < this.polygon_array[i - 2].length; h++) {
                this.polygon_array[i - 2][h] = Math.round(
                    (this.nGrain * h) / this.polygon_array[i - 2].length
                )
            }
        }

        for (let i = 2; i <= this.nGrain2; i++) {
            //starts from 2 p5.since we need a line as the simplest shape possible
            this.polygon_array2[i - 2] = new Array(i)
            for (let h = 0; h < this.polygon_array2[i - 2].length; h++) {
                this.polygon_array2[i - 2][h] = Math.round(
                    (this.nGrain2 * h) / this.polygon_array2[i - 2].length
                )
            }
        }
    }

    private initializeArrays() {
        for (let i = 0; i < this.rot1.length; i++) {
            this.rot1[i] = 0
        }

        for (let i = 0; i < this.rot2.length; i++) {
            this.rot2[i] = 0
        }

        for (let i = 0; i < this.shp1.length; i++) {
            this.shp1[i] = i
        }

        for (let i = 0; i < this.shp2.length; i++) {
            this.shp2[i] = i
        }
    }

    //UPDATE ARRAYS
    public updateArrays() {
        // this is the rotation array, containing all the rotation indexes for just the FIRST layer. Its length is equal to the maximum number of shapes created in the related layer.
        if (this.layerNumber === 1) {
            this.rot1.push(0)
            console.log("updateArraysL1")
        }

        if (this.layerNumber === 2) {
            this.rot2.push(0)
            console.log("updateArraysL2")
        }

        //kind of shape index array relative to the first layer. here are stored the kind of shape of tracks. i set up this number to be 1,2,3...maxNumofShapes just to make the user distinguish between and avoid graphic overlap.

        if (this.instrumentMode === 2 && this.layerNumber === 1) {
            this.shp1.push(this.maxNumShapes - 1)
            this.selectedShape = this.maxNumShapes
        }

        if (this.instrumentMode === 2 && this.layerNumber === 2) {
            this.shp2.push(this.maxNumShape2 - 1)
            this.selectedShape2 = this.maxNumShape2
            console.log("updatearray2")
        }
    }

    public setup(p5: P5, canvasParentRef: "centralSquare"): void {
        p5.createCanvas((p5.width = this.canvasWidth), (p5.height = this.canvasHeight)).parent(
            canvasParentRef
        ) // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    }

    public draw(p5: P5): void {
        console.log("draw")
        p5.fill(255)
        p5.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, this.firstLayerLandW, this.firstLayerLandW)
        //if (layerNumber === 2) {
        //  p5.stroke(195, 195, 195);
        //}
        //DRAW NODES
        let angle = (p5.TWO_PI / 4) * 3
        let step = p5.TWO_PI / this.nGrain
        p5.push()
        let grainX
        let grainY
        for (let i = 0; i < this.nGrain; i++) {
            grainX = this.canvasWidth / 2 + p5.cos(angle) * (this.firstLayerLandW / 2)
            grainY = this.canvasHeight / 2 + p5.sin(angle) * (this.firstLayerLandW / 2)
            //var grains = p5.createVector(grainX, grainY);
            //vertices.p5.push(grains);
            p5.strokeWeight(10)
            p5.stroke("purple")
            p5.point(grainX, grainY)
            angle += step
        }

        p5.pop()
        //END NODES

        //Custom Shape Mode
        if (this.instrumentMode === 7 && this.layerNumber === 1) {
            p5.push()
            let selGrainX =
                this.canvasWidth / 2 + p5.cos(angle + step * this.currentGrain) * (this.firstLayerLandW / 2)
            let selGrainY =
                this.canvasHeight / 2 + p5.sin(angle + step * this.currentGrain) * (this.firstLayerLandW / 2)
            let grains = p5.createVector(grainX, grainY)
            //vertices.p5.push(grains);
            p5.strokeWeight(10)
            p5.stroke("red")
            p5.point(selGrainX, selGrainY)
            p5.pop()
        }

        //vert is defined as vert=createVector(n1,n2,...,nn) with nn --number/id of the grain

        //POLYGON_SPEC, defining
        p5.push()

        const polygon_spec = (canvasWidth: any, canvasHeight: any, radius: any, vert: any) => {
            let angle = p5.TWO_PI / this.nGrain

            //draws first layer shapes
            p5.beginShape()
            p5.stroke("purple")
            for (let i = 0; i <= vert.length; i++) {
                let corr_node = vert[i]
                let count = 0

                for (let a = 0; a < p5.TWO_PI; a += angle) {
                    if (count === corr_node) {
                        let sx = canvasWidth + p5.cos(a - p5.TWO_PI / 4) * radius
                        let sy = canvasHeight + p5.sin(a - p5.TWO_PI / 4) * radius
                        p5.vertex(sx, sy)
                    }
                    count++
                }
            }
            p5.endShape(p5.CLOSE)
        }

        p5.pop()
        if (this.selectedShape > this.maxNumShapes) {
            this.selectedShape = 1
        }

        //it creates all the tracks

        for (let i = 1; i <= this.maxNumShapes; i++) {
            p5.push()
            p5.translate(p5.width * 0.5, p5.height * 0.5)
            p5.colorMode(p5.RGB)
            p5.fill(i * 50, i * 20, i * 10, 100)

            if (this.selectedShape === i) {
                p5.strokeWeight(3)
            }
            p5.rotate((p5.TWO_PI * this.rot1[i - 1]) / this.nGrain)
            // TO BE FIXED! the circular array is useless, we can use polygon_array_ALL as a database of all the possible shapes. Then, with shp1, shp2, etc. we point the shape we need. For now i set it to polygon_array_ALL[0];

            polygon_spec(0, 0, this.firstLayerLandW / 2, this.polygon_array[this.shp1[i - 1]])
            p5.pop()
        }
        // THIS IS EVERYTHING DRAWN IF LAYER NUMBER 2
        if (this.layerNumber === 2) {
            p5.fill(250, 250, 250, 70)
            p5.stroke(0)
            p5.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, this.circleLandW, this.circleLandW)
            let angle2 = (p5.TWO_PI / 4) * 3
            let step2 = p5.TWO_PI / this.nGrain2

            //Grains for Layer 2
            p5.push()
            for (let j = 0; j < this.nGrain2; j++) {
                let grainX2 = this.canvasWidth / 2 + p5.cos(angle2) * 250 //320 effects how much bigger the second circle is should be half the width and height of the elipse
                let grainY2 = this.canvasHeight / 2 + p5.sin(angle2) * 250
                //let grains2 = p5.createVector(grainX2, grainY2)
                p5.strokeWeight(10)
                p5.stroke("blue")
                p5.point(grainX2, grainY2)
                angle2 += step2
            }
            p5.pop()
            //Custom Shape Mode LAYER 2
            if (this.instrumentMode === 7 && this.layerNumber === 2) {
                p5.push()
                let selGrainX2 =
                    this.canvasWidth / 2 +
                    p5.cos(angle2 + step2 * this.currentGrain2) * (this.firstLayerLandW / 2)
                let selGrainY2 =
                    this.canvasHeight / 2 +
                    p5.sin(angle2 + step2 * this.currentGrain2) * (this.firstLayerLandW / 2)
                //let grains = p5.createVector(grainX2, grainY2)
                //vertices.p5.push(grains);
                p5.strokeWeight(10)
                p5.stroke("red")
                p5.point(selGrainX2, selGrainY2)
                p5.pop()
            }

            //POLYGON_SPEC2, defining SECOND LAYERRRRRR!
            p5.push()

            const polygon_spec2 = (windowWidth: any, windowHeight: any, radius: any, vert: any) => {
                let angle2 = p5.TWO_PI / this.nGrain2

                //draws second layer shapes
                p5.beginShape()
                p5.stroke("blue")
                for (let i = 0; i <= vert.length; i++) {
                    let corr_node = vert[i]
                    let count = 0
                    for (let a = 0; a < p5.TWO_PI; a += angle2) {
                        if (count === corr_node) {
                            let sx = windowWidth + p5.cos(a - p5.TWO_PI / 4) * radius
                            let sy = windowHeight + p5.sin(a - p5.TWO_PI / 4) * radius
                            p5.vertex(sx, sy)
                        }
                        count++
                    }
                }

                p5.endShape(p5.CLOSE)
            }

            p5.pop()
            if (this.selectedShape2 > this.maxNumShape2) {
                this.selectedShape2 = 1
            }

            //it creates all the tracks

            for (let i = 1; i <= this.maxNumShape2; i++) {
                p5.push()
                p5.translate(p5.width * 0.5, p5.height * 0.5)
                p5.colorMode(p5.RGB)
                p5.fill(i * 50, i * 20, i * 10, 100)

                if (this.selectedShape2 === i) {
                    p5.strokeWeight(3)
                }
                p5.rotate((p5.TWO_PI * this.rot2[i - 1]) / this.nGrain2)
                // TO BE FIXED! the circular array is useless, we can use polygon_array_ALL as a database of all the possible shapes. Then, with shp1, shp2, etc. we point the shape we need. For now i set it to polygon_array_ALL[0];

                polygon_spec2(0, 0, this.firstLayerLandW / 2, this.polygon_array2[this.shp2[i - 1]])
                p5.pop()
            }

            //CLOCK RING
            p5.push()
            p5.noFill()
            p5.strokeWeight(17)
            p5.stroke(250, 250, 250, 70)
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                550 * this.clockCircleScaleSize,
                550 * this.clockCircleScaleSize
            )
            p5.strokeWeight(1)

            p5.stroke(0.5)
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                570 * this.clockCircleScaleSize,
                570 * this.clockCircleScaleSize
            )
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                560 * this.clockCircleScaleSize,
                560 * this.clockCircleScaleSize
            )
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                550 * this.clockCircleScaleSize,
                550 * this.clockCircleScaleSize
            )
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                540 * this.clockCircleScaleSize,
                540 * this.clockCircleScaleSize
            )
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                530 * this.clockCircleScaleSize,
                530 * this.clockCircleScaleSize
            )
            p5.pop()
            //CLOCK RING DIVISION
            p5.push()
            //this wont be ngrain 2 but probably whichever gain number is larger
            for (let j = 0; j < this.nGrain2; j++) {
                var grainX2 = this.canvasWidth / 2 + p5.cos(angle2) * 266 * this.clockCircleScaleSize //320 effects how much bigger the second circle is should be half the width and height of the elipse
                var grainY2 = this.canvasHeight / 2 + p5.sin(angle2) * 266 * this.clockCircleScaleSize
                p5.strokeWeight(3)
                p5.line(grainX2, grainY2, grainX2 + p5.cos(angle2) * 18, grainY2 + p5.sin(angle2) * 18)
                angle2 += step2
            }
            //Layer ONE INDICATER OF HOW MANY TIMES TO REPEAT (DEPENDED ON LAYER 2 SHAPE)
            for (let i = 0; i < this.nGrain2; i++) {
                var grainX2 = this.canvasWidth / 2 + p5.cos(angle2) * 266 * this.clockCircleScaleSize //320 effects how much bigger the second circle is should be half the width and height of the elipse
                var grainY2 = this.canvasHeight / 2 + p5.sin(angle2) * 266 * this.clockCircleScaleSize
                //var grains = p5.createVector(grainX, grainY);
                //vertices.p5.push(grains);
                p5.strokeWeight(10)
                p5.stroke("purple")
                p5.point(grainX2, grainY2)
                angle2 += step2
            }
            for (let k = 0; k < this.nGrain; k++) {
                var grainX2 = this.canvasWidth / 2 + p5.cos(angle) * 266 * this.clockCircleScaleSize * 1.05 //320 effects how much bigger the second circle is should be half the width and height of the elipse
                var grainY2 = this.canvasHeight / 2 + p5.sin(angle) * 266 * this.clockCircleScaleSize * 1.05
                //var grains = p5.createVector(grainX, grainY);
                //vertices.p5.push(grains);
                p5.strokeWeight(10)
                p5.stroke("blue")
                p5.point(grainX2, grainY2)
                angle += step
            }
            p5.pop()
        }
    }

    public encoderInc() {
        //INC LAYER SELECTION MODE
        if (this.instrumentMode === 1 && this.layerNumber === 1) {
            this.layerNumber = 2
        } else if (this.instrumentMode === 1 && this.layerNumber === 2) {
            this.layerNumber = 1
        }

        //INC TRACK SELECTION MODE
        if (this.instrumentMode === 2 && this.selectedShape !== 0 && this.layerNumber === 1) {
            //change track
            this.selectedShape++
            console.log("inc")
        }
        if (this.instrumentMode === 2 && this.layerNumber === 2) {
            this.selectedShape = 0
            this.selectedShape2++
        }

        //INC CHANGE SHAPE MODE
        if (
            this.layerNumber === 1 &&
            this.instrumentMode === 3 &&
            this.shp1[this.selectedShape - 1] !== this.polygon_array.length
        ) {
            //this.polygon_array_ALL[this.selectedShape-1][kindOfShape]=this.polygon_array_ALL[this.selectedShape-1][kindOfShape++];
            this.shp1[this.selectedShape - 1] = this.shp1[this.selectedShape - 1] + 1
        }
        if (
            this.layerNumber === 1 &&
            this.instrumentMode === 3 &&
            this.shp1[this.selectedShape - 1] === this.polygon_array.length
        ) {
            this.shp1[this.selectedShape - 1] = 0
        }

        if (
            this.layerNumber === 2 &&
            this.instrumentMode === 3 &&
            this.shp2[this.selectedShape2 - 1] !== this.polygon_array2.length
        ) {
            //this.polygon_array_ALL[this.selectedShape-1][kindOfShape]=this.polygon_array_ALL[this.selectedShape-1][kindOfShape++];
            this.shp2[this.selectedShape2 - 1] = this.shp2[this.selectedShape2 - 1] + 1
        }
        if (
            this.layerNumber === 2 &&
            this.instrumentMode === 3 &&
            this.shp2[this.selectedShape2 - 1] === this.polygon_array2.length
        ) {
            this.shp2[this.selectedShape2 - 1] = 0
        }

        //INC CUSTOM SHAPE MODE
        if (this.layerNumber === 1 && this.instrumentMode === 7) {
            if (this.currentGrain === this.nGrain - 1) {
                this.currentGrain = 0
            } else {
                this.currentGrain++
            }
        }
        if (this.layerNumber === 2 && this.instrumentMode === 7) {
            if (this.currentGrain2 === this.nGrain - 1) {
                this.currentGrain2 = 0
            } else {
                this.currentGrain2++
            }
        }

        //INC CHANGE ROTATION MODE
        if (this.layerNumber === 1 && this.instrumentMode === 4 && this.selectedShape !== 0) {
            //rotate the selected shape
            this.rot1[this.selectedShape - 1] = this.rot1[this.selectedShape - 1] + 1
        }
        if (this.layerNumber === 2 && this.instrumentMode === 4 && this.selectedShape !== 0) {
            //rotate the selected shape
            this.rot2[this.selectedShape2 - 1] = this.rot2[this.selectedShape2 - 1] + 1
        }
    }

    public encoderDec() {
        //LAYER SELECTION MODE
        if (this.instrumentMode === 1 && this.layerNumber === 1) {
            this.layerNumber = 2
        } else if (this.instrumentMode === 1 && this.layerNumber === 2) {
            this.layerNumber = 1
        }

        //TRACK SELECTION MODE
        if (this.layerNumber === 1 && this.instrumentMode === 2 && this.selectedShape !== (0 || 1)) {
            this.selectedShape--
        } else if (this.instrumentMode === 2 && this.selectedShape === 1) {
            this.selectedShape = this.maxNumShapes
        }
        if (this.layerNumber === 2 && this.instrumentMode === 2 && this.selectedShape2 !== (0 || 1)) {
            this.selectedShape2--
        } else if (this.instrumentMode === 2 && this.selectedShape2 === 1) {
            this.selectedShape2 = this.maxNumShape2
        }

        //then CHANGE SHAPE MODE
        if (this.layerNumber === 1 && this.instrumentMode === 3 && this.shp1[this.selectedShape - 1] !== 0) {
            this.shp1[this.selectedShape - 1] = this.shp1[this.selectedShape - 1] - 1
        } else if (this.instrumentMode === 3 && this.shp1[this.selectedShape - 1] === 0) {
            this.shp1[this.selectedShape - 1] = this.polygon_array.length - 1
        }
        if (this.layerNumber === 2 && this.instrumentMode === 3 && this.shp1[this.selectedShape - 1] !== 0) {
            this.shp2[this.selectedShape2 - 1] = this.shp2[this.selectedShape2 - 1] - 1
        } else if (this.instrumentMode === 3 && this.shp2[this.selectedShape2 - 1] === 0) {
            this.shp2[this.selectedShape2 - 1] = this.polygon_array2.length - 1
        }

        //CUSTOM SHAPE MODE
        if (this.layerNumber === 1 && this.instrumentMode === 7) {
            if (this.currentGrain === 0) {
                this.currentGrain = this.nGrain - 1
            } else {
                this.currentGrain--
            }
        }
        if (this.layerNumber === 2 && this.instrumentMode === 7) {
            if (this.currentGrain2 === 0) {
                this.currentGrain2 = this.nGrain2 - 1
            } else {
                this.currentGrain2--
            }
        }

        //the CHANGE ROTATION MODE
        if (this.layerNumber === 1 && this.instrumentMode === 4 && this.selectedShape !== 0) {
            this.rot1[this.selectedShape - 1] = this.rot1[this.selectedShape - 1] - 1
        }
        if (this.layerNumber === 2 && this.instrumentMode === 4 && this.selectedShape !== 0) {
            this.rot2[this.selectedShape2 - 1] = this.rot2[this.selectedShape2 - 1] - 1
        }
    }

    public encoderButt() {
        if (this.layerNumber === 1 && this.instrumentMode === 7) {
            if (this.polygon_array_c.includes(this.currentGrain)) {
                for (let i = 0; i < this.polygon_array_c.length; i++) {
                    if (this.polygon_array_c[i] === this.currentGrain) {
                        this.polygon_array_c.splice(i, 1)
                    }
                }
            } else {
                this.polygon_array_c.push(this.currentGrain)
            }
            this.polygon_array_c.sort(function(a, b) {
                return a - b
            })
        }
        if (this.layerNumber === 2 && this.instrumentMode === 7) {
            if (this.polygon_array_c.includes(this.currentGrain2)) {
                for (let i = 0; i < this.polygon_array_c.length; i++) {
                    if (this.polygon_array_c[i] === this.currentGrain2) {
                        this.polygon_array_c.splice(i, 1)
                    }
                }
            } else {
                this.polygon_array_c.push(this.currentGrain2)
            }
            this.polygon_array_c.sort(function(a, b) {
                return a - b
            })
        }
    }

    public deleteShape() {
        if (this.instrumentMode === 7) {
            this.instrumentMode = 2
        }
        if (this.layerNumber === 1) {
            this.shp1.splice(this.selectedShape - 1, 1)
            this.rot1.splice(this.selectedShape - 1, 1)
            this.maxNumShapes--
            //start from skratch
            if (this.maxNumShapes === 0) {
                this.instrumentMode = 0
            }
            this.selectedShape = this.maxNumShapes
        }
        if (this.layerNumber === 2) {
            this.shp2.splice(this.selectedShape2 - 1, 1)
            this.rot1.splice(this.selectedShape2 - 1, 1)
            this.maxNumShape2--
            //start from skratch
            if (this.maxNumShape2 === 0) {
                this.instrumentMode = 0
            }
            this.selectedShape2 = this.maxNumShape2
        }
    }

    //CREATE NEW LAYER FUNCTION
    public createNewLayer() {
        this.instrumentMode = 1

        this.myTimeout = setTimeout(() => {
            this.layerNumber++
        }, 2000)
    }

    //TRACK SELECTION/ADD TRACK FUNCTION
    public selectShape() {
        this.instrumentMode = 2 // we are in track_mode!
        if (this.layerNumber === 1) {
            this.selectedShape = this.maxNumShapes
        }
        if (this.layerNumber === 2) {
            this.selectedShape2 = this.maxNumShape2
        }
        //if you press for 2 seconds you create a new track
        // if (this.instrumentMode !== 0) {
        this.myTimeout = setTimeout(() => {
            if (this.layerNumber === 1) {
                this.maxNumShapes++
                this.updateArrays()
                console.log(this.maxNumShapes)
            }
            if (this.layerNumber === 2) {
                this.maxNumShape2++
                this.updateArrays()
                console.log(this.maxNumShape2)
            }
        }, 2000)
    }

    // clearTimeout(this.myTimeout)

    ///CHANGE SHAPE AND GO INTO CUSTOM SHAPE FUNCTION
    public changeShape() {
        this.instrumentMode = 3 // we are in change_shape_mode!
        this.myTimeout = setTimeout(() => {
            if (this.layerNumber === 1) {
                this.instrumentMode = 7
                this.maxNumShapes++
                this.numCustShapes++
                this.selectedShape = this.maxNumShapes

                if (this.numCustShapes > 0) {
                    //resets current grain to 0
                    this.currentGrain = 0
                }
                this.polygon_array_c = new Array()
                //splice(this.maxNumShapes, 0, this.polygon_array_c);
                this.polygon_array.push(this.polygon_array_c)
                this.shp1.push(this.polygon_array.length - 1)
                this.updateArrays()
            }
            if (this.layerNumber === 2) {
                this.instrumentMode = 7
                this.maxNumShape2++
                this.numCustShapes++
                this.selectedShape2 = this.maxNumShape2

                if (this.numCustShapes > 0) {
                    //resets current grain to 0
                    this.currentGrain = 0
                }
                this.polygon_array_c = new Array()
                //splice(maxNumShapes, 0, polygon_array_c)
                this.polygon_array2.push(this.polygon_array_c)
                this.shp2.push(this.polygon_array2.length - 1)
                this.updateArrays()
            }
        }, 2000)
    }

    //ROTATE SHAPE FUNCTION
    public rotateShape() {
        this.instrumentMode = 4 // we are in rotation_mode!
    }

    public mouseReleased() {
        clearTimeout(this.myTimeout)
    }

    public setNGrain(value: number) {
        this.nGrain = value

        return this
    }

    public setNGrain2(value: number) {
        this.nGrain2 = value

        return this
    }
}

export const MainSketch = new MainSketchClass()
