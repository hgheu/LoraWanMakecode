/*
* pxt-iot-lora node, Micro:Bit library for IoTLoRaNode
* Copyright (C) 2018-2020  Pi Supply
* Changes for Calliope mini 8.5.2020 M. Klein
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
* Last Updated 2020-02-13-1520
*/

enum Channels {
    //% block="One"    
    One = 1,
    //% block="Two"
    Two = 2,
    //% block="Three"
    Three = 3,
    //% block="Four"
    Four = 4,
    //% block="Five"
    Five = 5,
    //% block="Six"
    Six = 6,
    //% block="Seven"
    Seven = 7,
    //% block="Eight"
    Eight = 8,
    //% block="Nine"
    Nine = 9,
    //% block="Ten"
    Ten = 10,
    //% block="Eleven"
    Eleven = 11,
    //% block="Twelve"
    Twelve = 12,
    //% block="Thirteen"
    Thirteen = 13,
    //% block="Fourteen"
    Fourteen = 14,
    //% block="fifteen"
    Fifteen = 15,
    //% block="Sixteen"
    Sixteen = 16,
    //% block="Seventeen"
    Seventeen = 17,
    //% block="Eighteen"
    Eighteen = 18,
    //% block="Nineteen"
    Nineteen = 19,
    //% block="Twenty"
    Twenty = 20

}
enum SpreadingFactors {
    //% block="Seven"
    Seven = 5,
    //% block="Eight"
    Eight = 4,
    //% block="Nine"
    Nine = 3,
    //% block="Ten"
    Ten = 2,
    //% block="Eleven"
    Eleven = 1,
    //% block="Twelve"
    Twelve = 0

}

enum CodingRates {
    //% block="4/5"
    FourFive = 5,
    //% block="4/6"
    FourSix = 6,
    //% block="4/7"
    FourSeven = 7,
    //% block="4/8"
    FourEight = 8

}

enum region {
    //% block="EU868"
    EU868 = 0,
    //% block="US915"
    US915 = 1,
    //% block="AU915"
    AU915 = 2,
    //% block="AS92X"
    AS92X = 3
}

enum euFreqs {
    //% block="868.1"
    EU8681 = 1,
    //% block="868.3"
    EU8683 = 2,
    //% block="868.5"
    EU8685 = 4,
    //% block="ALL"
    EUALL = 7

}

enum GPIOPins {
    //% block="PA15"
    PA15 = 14,
    //% block="PB3"
    PB3 = 15,
    //% block="PB5"
    PB5 = 16,
    //% block="PB8"
    PB8 = 18,
    //% block="PB9"
    PB9 = 19,
    //% block="PA2"
    PA2 = 20

}

enum ADCPins {
    //% block="PA2"
    PA2 = 20

}


//% weight=10 color=#8bc34a icon="\uf1eb"


namespace IotLoRaNode {
    serial.redirect(SerialPin.C17, SerialPin.C16, BaudRate.BaudRate9600); // C16/C17
    let payload = ""
    let regionsList: string[] = ["EU868", "US915", "AU915", "AS920"]

    //%blockId="IotLoRaNode_InitialiseRadioABP" block="Initialise LoRa Radio via ABP:|Device Address %deviceaddress|Network Session Key %netswk|App Session Key %appswk|SF %datarate"
    //% blockGap=8
    export function InitialiseRadio(devaddress: string, netswk: string, appswk: string, datarate: SpreadingFactors): void {
        /**
        * First we need to configure the serial port to use the pins and reset the radio
        */
        serial.writeString("Test Serial\r\n");
        pins.digitalWritePin(DigitalPin.P0, 1) //P16 changed to P0
        basic.pause(300)
        pins.digitalWritePin(DigitalPin.P0, 0)
        //serial.readLine()
        //serial.readLine()
        //serial.readLine()

        //basic.showNumber(0)

        /**
         * For this we are only going to use ABP & LoRa WAN Modes for now
         */

        //basic.showNumber(1)
        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+set_config=lora:join_mode:0\r\n");
        serial.readLine()

        //basic.showNumber(2)
        basic.pause(75)
        //Set Device Address
        serial.writeString("at+set_config=dev_addr:" + devaddress + "\r\n");
        serial.readLine()

        //basic.showNumber(3)
        basic.pause(75)
        //Set the network session key
        serial.writeString("at+set_config=nwks_key:" + netswk + "\r\n");
        serial.readLine()

        //basic.showNumber(4)
        basic.pause(75)
        //Set the application session key
        serial.writeString("at+set_config=apps_key:" + appswk + "\r\n");
        serial.readLine()

        //basic.showNumber(5)
        basic.pause(75)
        //Set the data rate
        serial.writeString("at+set_config=dr:" + datarate + "\r\n");
        serial.readLine()

        //basic.showNumber(6)
        basic.pause(75)
        //"Join" the LoRaWAN Network in ABP Mode
        serial.writeString("at+join=abp\r\n");
        serial.readLine()

        //Display on the screen that LoRa is ready.
        basic.showString("LoRa Ready")


    }

    //%blockId="Initialisiere_LoRa" block="Initialisiere LoRa:|App Key %appkey"
    //% blockGap=8
    export function Initialisiere_LoRa(appkey: string): void {
          
        basic.pause(75)
        serial.writeString("AT+MODE=LWOTAA\r\n");
        serial.readLine()

        basic.pause(75)
        serial.writeString("AT+DR=EU868\r\n");
        serial.readLine()

        basic.pause(75)
        serial.writeString("AT+CH=NUM,0-2\r\n");
        serial.readLine()

        basic.pause(75)
        serial.writeString("AT+KEY=APPKEY," + appkey + "\r\n");
        serial.readLine()

        basic.pause(75)
        serial.writeString("AT+CLASS=C\r\n");
        serial.readLine()

        basic.pause(75)
        serial.writeString("AT+PORT=8\r\n");
        serial.readLine()

        basic.pause(75)
        serial.writeString("AT+JOIN\r\n");
        serial.readLine()

        basic.showString("LoRa Ready")
    }



    //%blockId="IotLoRaNode_DigitalValue"
    //%block="Add Digital Value: %value on channel: %chanNum"
    export function DigitalValue(value: boolean, chanNum: Channels): void {
        /**
         * Add digital value
         */
        let intVal = value ? 1 : 0;
        payload = payload + "0" + chanNum + "000" + intVal;

    }
    //%blockId="IotLoRaNode_AnalogueValue" block="Add Analogue Value: %value on channel: %chanNum"
    //% value.min=0 value.max=254
    export function AnalogueValue(value: number, chanNum: Channels): void {
        /**
         * Add analogue value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (value * 100))

        payload = payload + "0" + chanNum + "02" + bufr.toHex();


    }

   



    //%blockId="IotLoRaNode_GPS" block="Add GPS Value - Latitude: %latitude Longitude %longitude Altitude %altitude on channel: %chanNum"
    //% blockGap=8
    export function GPS(latitude: number, longitude: number, altitude: number, chanNum: Channels): void {
        /**
         * Add GPS value
         */
        let latBuf = pins.createBuffer(4);
        latBuf.setNumber(NumberFormat.Int32BE, 0, longitude * 10000)
        let latBuf2 = latBuf.slice(1, 4);

        let lonBuf = pins.createBuffer(4);
        lonBuf.setNumber(NumberFormat.Int32BE, 0, latitude * 10000)
        let lonBuf2 = lonBuf.slice(1, 4);
        let altBuf = pins.createBuffer(4);
        altBuf.setNumber(NumberFormat.Int32BE, 0, altitude * 100)
        let altBuf2 = altBuf.slice(1, 4);
        payload = "" + payload + "0" + chanNum + "88" + lonBuf2.toHex() + latBuf2.toHex() + altBuf2.toHex()




    }

    //%blockId="IotLoRaNode_TransmitMessage" block="Transmit LoRa Data"
    export function loraTransmitPayload(): void {
        /**
         * Transmit Message
         */

        serial.writeString("AT+CMSGHEX=" + payload + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        basic.pause(100)
        //serial.readUntil(serial.delimiters(Delimiters.NewLine))
        //basic.pause(100)
        payload = ""
    }
 
    //%blockId="IotLoRaNode_SleepMode" block="Sleep Mode" 
    export function loraSleepMode(): void {
        /**
         * Sleep Mode
         */

        serial.writeString("at+sleep\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }
    //%blockId="IotLoRaNode_WakeUp" block="Wake from Sleep"  
    export function loraWakeUp(): void {
        /**
         * Sleep Mode
         */

        //serial.writeString("");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }

 



    //End2





}
