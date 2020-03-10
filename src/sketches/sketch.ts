import * as P5 from "p5"
import { Transport } from "tone"
import { AppMode } from "../app/root.component"
import { Time } from "tone"
import { Engines } from "src/engines"

// SOCKETS
import openSocket from "socket.io-client"
const socket = openSocket("http://localhost:8000")

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
    private maxNumShape2 = 0
    private numCustShapes = 0
    private circleLandW = 400
    private clockCircleScaleSize = 0.95
    private currentGrain = 0
    private currentGrain2 = 0
    private nGrain = 1
    private nGrain2 = 1
    //private firstLayerLandW = 500
    private trig1: any[]
    private trig2: any[]
    private compact_shp1: any[]
    private compact_shp2: any[]
    private appMode: AppMode | null = null

    // private context = new AudioContext

    private rot1 = new Array(this.maxNumShapes)
    public shp1 = new Array(this.maxNumShapes)
    private rot2 = new Array(this.maxNumShape2)
    private shp2 = new Array(this.maxNumShape2)

    private polygon_array = new Array(this.nGrain - 1)
    private polygon_array_c = new Array() // custom polygon array
    private polygon_array2 = new Array(this.nGrain2 - 1)
    private myTimeout

    private secondLayer_activated = false

    private degree = 0
    private canvas
    private counter = -1
    private counter2 = -1
    private numMeasures
    private numMeasure2
    private numSides1 = new Array()
    private verRegular = false
    private ver = 0
    private active_seq = false
    private rotation_element = 0

    // TIME SIGNATURE _ Layer 1

    private TS_Num = 4
    private TS_Num_2 = 4
    private TS_Den = 4
    private TS_Den_2 = 4
    public Kit = new Engines()
    private drumKit: any = []
    private sounds1: any = []
    private sounds2: any = []
    private measure: String = ""
    private measure_2: String = ""
    private value_enc: String = ""

    constructor() {
        this.drumKit = this.Kit.drumKit
        this.trig1 = []
        this.trig2 = []
        this.compact_shp1 = []
        this.compact_shp2 = []
        this.initializeArrays()
        this.generateShapes()
        this.updateArrays()
        this.triggerer()
    }

    private initializeArrays() {
        for (let i = 0; i < this.rot1.length; i++) {
            this.rot1[i] = 0
        }

        for (let i = 0; i < this.shp1.length; i++) {
            this.shp1[i] = i
        }

        this.trig1.length = 0
        for (let i = 0; i < this.nGrain; i++) {
            this.trig1[i] = false
        }

        this.sounds1.length = 0
        for (let i = 0; i < this.shp1.length; i++) {
            this.sounds1[i] = i
        }

        //LAYER 2 ARRAYS
        if (this.secondLayer_activated === true) {
            for (let i = 0; i < this.rot2.length; i++) {
                this.rot2[i] = 0
            }

            for (let i = 0; i < this.shp2.length; i++) {
                this.shp2[i] = i
            }

            this.trig2.length = 0
            for (let i = 0; i < this.nGrain2; i++) {
                this.trig2[i] = false
            }

            this.sounds2.length = 0
            for (let i = 0; i < this.shp2.length; i++) {
                this.sounds2[i] = 0
            }
        }
    }
    public generateShapes() {
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
            //starts from 2 since we need a line as the simplest shape possible
            this.polygon_array2[i - 2] = new Array(i)
            for (let h = 0; h < this.polygon_array2[i - 2].length; h++) {
                this.polygon_array2[i - 2][h] = Math.round(
                    (this.nGrain2 * h) / this.polygon_array2[i - 2].length
                )
            }
        }
    }

    //UPDATE ARRAYS
    public updateArrays() {
        // this is the rotation array, containing all the rotation indexes for just the FIRST layer. Its length is equal to the maximum number of shapes created in the related layer.
        if (this.layerNumber === 1 && this.instrumentMode === 2) {
            this.rot1.push(0)
        }

        if (this.layerNumber === 2 && this.instrumentMode === 2) {
            this.rot2.push(0)
        }

        //kind of shape index array relative to the first layer. here are stored the kind of shape of tracks. i set up this number to be 1,2,3...maxNumofShapes just to make the user distinguish between and avoid graphic overlap.
        if (this.instrumentMode === 2 && this.layerNumber === 1) {
            this.shp1.push(this.maxNumShapes - 1)
            this.selectedShape = this.maxNumShapes
        }

        if (this.instrumentMode === 2 && this.layerNumber === 1) {
            this.sounds1.push(this.maxNumShapes - 1)
        }

        if (this.instrumentMode === 2 && this.layerNumber === 2) {
            this.shp2.push(this.maxNumShape2 - 1)
            this.selectedShape2 = this.maxNumShape2
        }

        if (this.instrumentMode === 2 && this.layerNumber === 2) {
            this.sounds2.push(this.maxNumShape2 - 1)
        }

        this.numSides1 = new Array()

        for (let i = 0; i <= this.shp1.length - 1; i++) {
            this.numSides1.push(this.shp1[i] + 2)
        }

        this.ver = 0
        for (let i = 0; i <= this.numSides1.length - 1; i++) {
            if (this.nGrain % this.numSides1[i] === 0) {
                this.ver++
            }
        }
    }

    //SETUP
    public setup(p5: P5, canvasParentRef: "centralSquare"): void {
        p5.createCanvas((p5.width = this.canvasWidth), (p5.height = this.canvasHeight)).parent(
            canvasParentRef
        ) // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    }

    public draw(p5: P5): void {
        if (this.appMode == AppMode.Learn) {
            p5.background("#17a2b8")
        } else if (this.appMode == AppMode.Play) {
            p5.background("#348781")
        }

        p5.fill(250, 250, 250, 70)
        p5.strokeWeight(2)
        p5.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, this.circleLandW, this.circleLandW)
        //if (layerNumber === 2) {
        //  p5.stroke(195, 195, 195);
        //}

        let angle = (p5.TWO_PI / 4) * 3
        let step = p5.TWO_PI / this.nGrain

        //First Layer Arc
        if (this.counter > 0) {
            p5.noFill()
            p5.push()
            if (this.appMode == AppMode.Learn) {
                p5.stroke("pink")
            } else if (this.appMode == AppMode.Play) {
                p5.stroke("#43BFC7")
            }
            p5.arc(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                this.circleLandW + 20,
                this.circleLandW + 20,
                3 * p5.HALF_PI,
                3 * p5.HALF_PI + (p5.TWO_PI / this.nGrain) * this.counter
            )
            p5.pop()
            //Second Layer Arc
            if (this.layerNumber === 2) {
                p5.push()
                p5.stroke("darkslategrey")
                if (this.TS_Num <= this.TS_Num_2) {
                    p5.arc(
                        this.canvasWidth / 2,
                        this.canvasHeight / 2,
                        this.circleLandW + 40,
                        this.circleLandW + 40,
                        3 * p5.HALF_PI,
                        3 * p5.HALF_PI + (p5.TWO_PI / this.nGrain2) * this.counter2
                    )
                } else {
                    p5.arc(
                        this.canvasWidth / 2,
                        this.canvasHeight / 2,
                        this.circleLandW + 40,
                        this.circleLandW + 40,
                        3 * p5.HALF_PI,
                        3 * p5.HALF_PI +
                            (p5.TWO_PI / this.nGrain2) *
                                Math.ceil(this.TS_Num / this.TS_Num_2) *
                                this.counter2
                    )
                }
                p5.pop()
            }
        }
        //draw ellipse on last connection first layer arc
        if (this.counter === this.nGrain) {
            p5.noFill()
            p5.push()
            if (this.appMode == AppMode.Learn) {
                p5.stroke("pink")
            } else if (this.appMode == AppMode.Play) {
                p5.stroke("#43BFC7")
            }
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                this.circleLandW + 20,
                this.circleLandW + 20
            )
            p5.pop()
        }

        //draw ellipse on last connection second layer arc
        if (this.layerNumber === 2 && this.counter2 === this.nGrain2) {
            p5.stroke("darkslategrey")
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                this.circleLandW + 40,
                this.circleLandW + 40
            )
        }

        //Clock Ring Arcs
        if (this.layerNumber === 2 && this.numMeasures > 0) {
            p5.noFill()
            p5.strokeWeight(4)
            p5.push()
            if (this.appMode == AppMode.Learn) {
                p5.stroke("pink")
            } else if (this.appMode == AppMode.Play) {
                p5.stroke("#43BFC7")
            }
            if (this.TS_Num <= this.TS_Num_2) {
                p5.arc(
                    this.canvasWidth / 2,
                    this.canvasHeight / 2,
                    530 * this.clockCircleScaleSize,
                    530 * this.clockCircleScaleSize,
                    3 * p5.HALF_PI,
                    3 * p5.HALF_PI + (p5.TWO_PI / this.TS_Num_2) * this.numMeasures
                )
            } else {
                p5.arc(
                    this.canvasWidth / 2,
                    this.canvasHeight / 2,
                    530 * this.clockCircleScaleSize,
                    530 * this.clockCircleScaleSize,
                    3 * p5.HALF_PI,
                    3 * p5.HALF_PI +
                        (p5.TWO_PI / this.TS_Num_2) *
                            Math.ceil(this.TS_Num / this.TS_Num_2) *
                            this.numMeasures
                )
            }
            p5.pop()
        }
        if (this.layerNumber === 2 && this.numMeasure2 > 0) {
            p5.noFill()
            p5.strokeWeight(4)
            p5.push()
            p5.stroke("darkslategrey")
            p5.arc(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                570 * this.clockCircleScaleSize,
                570 * this.clockCircleScaleSize,
                3 * p5.HALF_PI,
                3 * p5.HALF_PI + (p5.TWO_PI / this.TS_Num) * this.numMeasure2
            )
            p5.pop()
        }

        //draw ellipse for last connection clock ring arcs
        if (this.layerNumber === 2 && this.numMeasures === this.nGrain2) {
            p5.push()
            if (this.appMode == AppMode.Learn) {
                p5.stroke("pink")
            } else if (this.appMode == AppMode.Play) {
                p5.stroke("#43BFC7")
            }
            p5.strokeWeight(4)
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                530 * this.clockCircleScaleSize,
                530 * this.clockCircleScaleSize
            )
            p5.pop()
        }
        if (this.layerNumber === 2 && this.numMeasure2 === this.nGrain) {
            p5.push()
            p5.stroke("darkslategrey")
            p5.strokeWeight(4)
            p5.ellipse(
                this.canvasWidth / 2,
                this.canvasHeight / 2,
                570 * this.clockCircleScaleSize,
                570 * this.clockCircleScaleSize
            )
            p5.pop()
        }

        //Draws Layer 1 Grains
        p5.push()
        let grainX
        let grainY
        for (let i = 0; i < this.nGrain; i++) {
            grainX = this.canvasWidth / 2 + p5.cos(angle) * (this.circleLandW / 2)
            grainY = this.canvasHeight / 2 + p5.sin(angle) * (this.circleLandW / 2)
            p5.strokeWeight(10)
            if (this.appMode == AppMode.Learn) {
                p5.stroke("pink")
            } else if (this.appMode == AppMode.Play) {
                p5.stroke("#48CCCD")
            }
            p5.point(grainX, grainY)
            angle += step
        }
        p5.pop()

        //Custom Shape Mode
        if (this.instrumentMode === 7 && this.layerNumber === 1) {
            p5.push()
            let selGrainX =
                this.canvasWidth / 2 + p5.cos(angle + step * this.currentGrain) * (this.circleLandW / 2)
            let selGrainY =
                this.canvasHeight / 2 + p5.sin(angle + step * this.currentGrain) * (this.circleLandW / 2)
            //let grains = p5.createVector(grainX, grainY)
            p5.strokeWeight(10)
            p5.stroke("red")
            p5.point(selGrainX, selGrainY)
            p5.pop()
        }

        //defining POLYGON_SPEC drawing shapes
        p5.push()
        const polygon_spec = (canvasWidth: any, canvasHeight: any, radius: any, vert: any) => {
            let angle = p5.TWO_PI / this.nGrain

            //draws first layer shapes
            p5.beginShape()
            if (this.appMode == AppMode.Learn) {
                p5.stroke("pink")
            } else if (this.appMode == AppMode.Play) {
                p5.stroke("#43BFC7")
            }
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

            polygon_spec(0, 0, this.circleLandW / 2, this.polygon_array[this.shp1[i - 1]])
            p5.pop()
        }

        // THIS IS EVERYTHING DRAWN IF LAYER NUMBER 2
        if (this.layerNumber === 2) {
            p5.fill(250, 250, 250, 70)
            p5.stroke(0)
            p5.strokeWeight(2)
            p5.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, this.circleLandW, this.circleLandW)
            let angle2 = (p5.TWO_PI / 4) * 3
            let step2 = p5.TWO_PI / this.nGrain2

            //Grains for Layer 2
            p5.push()
            for (let j = 0; j < this.nGrain2; j++) {
                let grainX2 = this.canvasWidth / 2 + (p5.cos(angle2) * this.circleLandW) / 2 //320 effects how much bigger the second circle is should be half the width and height of the elipse
                let grainY2 = this.canvasHeight / 2 + (p5.sin(angle2) * this.circleLandW) / 2
                //let grains2 = p5.createVector(grainX2, grainY2)
                p5.strokeWeight(10)
                p5.stroke("darkslategrey")
                p5.point(grainX2, grainY2)
                angle2 += step2
            }
            p5.pop()

            //CLOCK RING
            p5.noFill()
            p5.strokeWeight(17)
            p5.stroke(250, 250, 250, 80)
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

            //CLOCK RING "GRAINS"
            p5.push()
            step2 = p5.TWO_PI / this.TS_Num_2
            step = p5.TWO_PI / this.TS_Num

            for (let j = 0; j < this.TS_Num_2; j++) {
                var grainX2 = this.canvasWidth / 2 + p5.cos(angle2) * 266 * this.clockCircleScaleSize //320 effects how much bigger the second circle is should be half the width and height of the elipse
                var grainY2 = this.canvasHeight / 2 + p5.sin(angle2) * 266 * this.clockCircleScaleSize
                p5.strokeWeight(3)
                if (this.appMode == AppMode.Learn) {
                    p5.stroke("pink")
                } else if (this.appMode == AppMode.Play) {
                    p5.stroke("#43BFC7")
                }
                p5.line(grainX2, grainY2, grainX2 + p5.cos(angle2) * 9, grainY2 + p5.sin(angle2) * 9)
                angle2 += step2
            }
            for (let j = 0; j < this.TS_Num; j++) {
                grainX2 = this.canvasWidth / 2 + p5.cos(angle) * 275 * this.clockCircleScaleSize //320 effects how much bigger the second circle is should be half the width and height of the elipse
                grainY2 = this.canvasHeight / 2 + p5.sin(angle) * 275 * this.clockCircleScaleSize
                p5.strokeWeight(3)
                p5.stroke("darkslategrey")
                p5.line(grainX2, grainY2, grainX2 + p5.cos(angle) * 9, grainY2 + p5.sin(angle) * 9)
                angle += step
            }
            p5.pop()

            //Custom Shape Mode LAYER 2
            if (this.instrumentMode === 7 && this.layerNumber === 2) {
                p5.push()
                let selGrainX2 =
                    this.canvasWidth / 2 +
                    p5.cos(angle2 + step2 * this.currentGrain2) * (this.circleLandW / 2)
                let selGrainY2 =
                    this.canvasHeight / 2 +
                    p5.sin(angle2 + step2 * this.currentGrain2) * (this.circleLandW / 2)
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
                p5.stroke("darkslategrey")
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

                polygon_spec2(0, 0, this.circleLandW / 2, this.polygon_array2[this.shp2[i - 1]])
                p5.pop()
            }
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
        if (this.layerNumber === 2 && this.instrumentMode === 4 && this.selectedShape2 !== 0) {
            //rotate the selected shape
            this.rot2[this.selectedShape2 - 1] = this.rot2[this.selectedShape2 - 1] + 1
        }
        if (this.layerNumber === 1 && this.instrumentMode === 6 && this.selectedShape !== 0) {
            this.sounds1[this.selectedShape - 1] =
                (this.sounds1[this.selectedShape - 1] + 1) % this.drumKit.length
        }

        if (this.layerNumber === 2 && this.instrumentMode === 6 && this.selectedShape2 !== 0) {
            this.sounds2[this.selectedShape2 - 1] =
                (this.sounds2[this.selectedShape2 - 1] + 1) % this.drumKit.length
        }

        this.triggerer()
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
        if (this.layerNumber === 2 && this.instrumentMode === 4 && this.selectedShape2 !== 0) {
            this.rot2[this.selectedShape2 - 1] = this.rot2[this.selectedShape2 - 1] - 1
        }
        if (this.layerNumber === 1 && this.instrumentMode === 6 && this.selectedShape !== 0) {
            this.sounds1[this.selectedShape - 1] =
                (this.sounds1[this.selectedShape - 1] - 1) % this.drumKit.length
        }

        if (this.layerNumber === 2 && this.instrumentMode === 6 && this.selectedShape2 !== 0) {
            this.sounds2[this.selectedShape2 - 1] =
                (this.sounds2[this.selectedShape2 - 1] - 1) % this.drumKit.length
        }
        this.triggerer()
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

    //CREATE NEW LAYER FUNCTION
    public createNewLayer() {
        this.instrumentMode = 1

        this.myTimeout = setTimeout(() => {
            this.layerNumber++
        }, 2000)
        this.triggerer()
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
                this.triggerer()
                console.log(this.maxNumShapes)
            }
            if (this.layerNumber === 2) {
                this.maxNumShape2++
                this.updateArrays()
                this.triggerer()
                console.log(this.maxNumShape2)
            }
        }, 2000)
        this.triggerer()
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
        this.triggerer()
    }

    //ROTATE SHAPE FUNCTION
    public rotateShape() {
        this.instrumentMode = 4 // we are in rotation_mode!
    }

    public deleteShape() {
        //This was to fix a bug if in custom shape mode
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
        this.updateArrays()
        this.triggerer()
    }

    public mouseReleased() {
        clearTimeout(this.myTimeout)
    }

    //To set the number of grains from the panel
    public setNGrain(value: number) {
        this.nGrain = value

        return this
    }

    public setNGrain2(value: number) {
        this.nGrain2 = value

        return this
    }

    public setTS1(value: String) {
        this.TS_Num = Number(value.substring(0, 1))
        this.TS_Den = Number(value.substring(2))
        let val = this.mapping(value)
        if (val !== undefined) this.measure = val

        return this
    }

    //managing Time Signature
    public setTS2(value: String) {
        console.log(value)
        this.TS_Num_2 = Number(value.substring(0, 1))
        this.TS_Den_2 = Number(value.substring(2))
        let val = this.mapping(value)
        if (val !== undefined) this.measure_2 = val

        return this
    }
    //any kind of time signature can be used, but it has to be mapped with respect to the master clock
    private mapping(val: String) {
        let num = Number(val.substring(0, 1))
        let den = Number(val.substring(2))
        if (den === 4) {
            if (num === 5) return "0:5"
            if (num === 3) return "0:3"
            if (num === 4) return "1:0"
        } else {
            if (den === 8) {
                if (num === 9) return "0:4:2"
                if (num === 7) return "0:3:14"
            }
        }
        return "1:2"
        //end
    }

    public setEncoder(value: String) {
        console.log(value)
        /*
        this.value_enc = value
        console.log(this.value_enc);

        socket.on('value', (data) => {
            console.log(data);
          })
          */

        if (value === "up") {
            this.encoderInc()
        } else if (value === "down") {
            this.encoderDec()
        } else if (value === "press") {
            this.encoderButt()
        }

        return this
    }

    public stop_sequencer() {
        //active_seq = false;
        this.counter = -1
        this.counter2 = -1
        this.numMeasures = 0
        this.numMeasure2 = 0
        Transport.stop()
        Transport.cancel()
    }

    public triggerer() {
        //clears all the previous trigs
        this.trig1 = new Array()
        this.trig2 = new Array()
        for (let j = 1; j <= this.shp1.length; j++) {
            this.trig1[j - 1] = []

            for (let l = 0; l < this.nGrain; l++) {
                this.trig1[j - 1][l] = false
            }
        }

        for (let i = 0; i < this.shp1.length; i++) {
            for (let k = 0; k < this.polygon_array[this.shp1[i]].length; k++) {
                this.trig1[i][this.polygon_array[this.shp1[i]][k]] = true
            }
        }

        for (let j = 1; j <= this.shp2.length; j++) {
            this.trig2[j - 1] = []

            for (let l = 0; l < this.nGrain2; l++) {
                this.trig2[j - 1][l] = false
            }
        }

        for (let i = 0; i < this.shp2.length; i++) {
            for (let k = 0; k < this.polygon_array2[this.shp2[i]].length; k++) {
                this.trig2[i][this.polygon_array2[this.shp2[i]][k]] = true
            }
        }

        //reading and shifting the trig1 array accorging to rot1
        for (let k = 0; k < this.rot1.length; k++) {
            if (this.rot1[k] !== 0) {
                if (this.rot1[k] > 0) {
                    for (let i = 0; i < this.rot1[k]; i++) {
                        this.compact_shp1 = this.trig1[k].pop()
                        this.trig1[k].unshift(this.compact_shp1)
                    }
                } else {
                    for (let i = 0; i < Math.abs(this.rot1[k]); i++) {
                        this.compact_shp1 = this.trig1[k].shift()
                        this.trig1[k].push(this.compact_shp1)
                    }
                }
            }
        }

        for (let k = 0; k < this.rot2.length; k++) {
            if (this.rot2[k] !== 0) {
                if (this.rot2[k] > 0) {
                    for (let i = 0; i < this.rot2[k]; i++) {
                        this.compact_shp2 = this.trig2[k].pop()
                        this.trig2[k].unshift(this.compact_shp2)
                    }
                } else {
                    for (let i = 0; i < Math.abs(this.rot2[k]); i++) {
                        this.compact_shp2 = this.trig2[k].shift()
                        this.trig2[k].push(this.compact_shp2)
                    }
                }
            }
        }
    }

    //read input for grains

    public chooseSound() {
        this.instrumentMode = 6
    }

    public updateGrains() {
        this.stop_sequencer()

        //"1:0" is one measure at 4/4 (8/8) will associated to the Time Signature, also 16th can be added "1:0:0"
        if (this.measure !== "") Transport.scheduleRepeat(this.repeat_l1, this.measure, "0")

        //Scond layer has another schedule, with adjustable duration indipendent from BPM
        if (this.measure_2 !== "") Transport.scheduleRepeat(this.repeat_l2, this.measure_2, "0")

        Transport.start()
    }

    public getnGrains() {
        return this.nGrain
    }

    // actual audio engine

    repeat_l1 = (time: number) => {
        for (let i = 1; i <= this.shp1.length; i++) {
            for (let stp = 0; stp < this.nGrain; stp++) {
                if (this.trig1[i - 1][stp] === true) {
                    this.drumKit[this.sounds1[i - 1]].start(
                        time + stp * (this.TS_Num / this.TS_Den) * Time(this.nGrain + "n").toSeconds()
                    )
                }
            }
        }
    }
    repeat_l2 = (time: number) => {
        for (let i = 1; i <= this.shp2.length; i++) {
            for (let stp = 0; stp < this.nGrain2; stp++) {
                if (this.trig2[i - 1][stp] === true) {
                    this.drumKit[this.sounds2[i - 1]].start(
                        time + stp * (this.TS_Num_2 / this.TS_Den_2) * Time(this.nGrain2 + "n").toSeconds()
                    )
                }
            }
        }
    }

    public setAppMode(mode: AppMode) {
        this.appMode = mode
        console.log(this.appMode)
        return this
    }
}

export const MainSketch = new MainSketchClass()
