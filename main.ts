function Very_Cold () {
    while (Exercise_Setup == 0) {
        basic.showLeds(`
            # . # . #
            . # # # .
            . . # . .
            . # . # .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            # . # . #
            . # . # .
            `)
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    // If the temperature is below 0*C, a jumping exercise will be shown
    // If the temperature is between 0*C and 14*C, it will show an exercise that focuses on moving your arms
    // If the temperature is between 15*C and 29*C, it will show a person running
    // If the temperature is above 29*C, it will scroll through an image showing two people playing catch with a ball
    if (receivedNumber == -300) {
        radio.sendNumber(input.temperature())
    } else if (receivedNumber == -301) {
        radio.sendNumber(input.temperature() * 1.8 + 32)
    } else if (receivedNumber == -302) {
        radio.sendNumber(input.temperature() + 273.15)
    } else if (receivedNumber == -303) {
        if (input.temperature() < 0) {
            radio.sendNumber(-700)
        } else if (input.temperature() >= 0 && input.temperature() < 15) {
            radio.sendNumber(-800)
        } else if (input.temperature() >= 15 && input.temperature() < 30) {
            radio.sendNumber(-900)
        } else {
            radio.sendNumber(-1000)
        }
    } else if (receivedNumber == -700) {
        Very_Cold()
    } else if (receivedNumber == -800) {
        Cold()
    } else if (receivedNumber == -900) {
        Warm()
    } else if (receivedNumber == -1000) {
        Hot()
    } else {
        basic.showNumber(receivedNumber)
    }
})
// When A, B, or A+B is pressed, the micro:bit will send a signal to the other micro:bit, which will check the temperature, and send it back to the first micro:bit. A is for Celsius, B is for Fahrenheit, and A+B is for Kelvins.
input.onButtonPressed(Button.A, function () {
    Exercise_Setup = 1
    radio.sendNumber(-300)
})
function Cold () {
    while (Exercise_Setup == 0) {
        basic.showLeds(`
            # . # . .
            . # # # .
            . . # . #
            . # . # .
            # . . . #
            `)
        basic.showLeds(`
            . . # . #
            . # # # .
            # . # . .
            . # . # .
            # . . . #
            `)
    }
}
function Warm () {
    basic.showLeds(`
        . . # . .
        . # # # .
        . . # . .
        . # . # .
        . # . # .
        `)
    while (Exercise_Setup == 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . . # . .
            . # . # .
            . # . . .
            `)
        basic.showLeds(`
            . . # . .
            . # # # .
            . . # . .
            . # . # .
            . . . # .
            `)
    }
}
input.onButtonPressed(Button.AB, function () {
    Exercise_Setup = 1
    radio.sendNumber(-302)
})
input.onButtonPressed(Button.B, function () {
    Exercise_Setup = 1
    radio.sendNumber(-301)
})
// When the micro:bit is shaken, it will have the other micro:bit check the temperature, and the first micro:bit will show a different exercise depending on what the temperature is.
input.onGesture(Gesture.Shake, function () {
    Exercise_Setup = 0
    radio.sendNumber(-303)
})
function Hot () {
    while (Exercise_Setup == 0) {
        basic.clearScreen()
        Playing_Ball.scrollImage(1, 500)
        basic.pause(1000)
    }
}
let Playing_Ball: Image = null
let Exercise_Setup = 0
radio.setGroup(1)
Exercise_Setup = 0
// Setting up the big image used in the playing ball exercise 
Playing_Ball = images.createBigImage(`
    . # . # . . . . # .
    # # # . . # . # # #
    . # . . . . # . # .
    # . # . . . . # . #
    # . # . . . . # . #
    `)
