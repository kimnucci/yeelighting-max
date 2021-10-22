const Max = require('max-api')

/** Require the `Bulb` type from the yeelight package */
const { Bulb } = require('yeelight.io') 

let bulb = null

/**
 * Respond to the `connect` message from Max
 */
Max.addHandler('connect', (ip) => {
	/** If bulb hasn'e been instantiated */
	if (!bulb) {

		bulb = new Bulb(ip)

		/** Attach listener to the `connected` event */
		bulb.on('connected', (light) => {
			Max.post(`Connected to bulb @${light.ip}`)
		})

		/** Attach listener to the `disconnected` event */
		bulb.on('disconnected', (light) => {
			Max.post(`Disconnected from bulb @${light.ip}`)
		})

		/** Attach listener to the `error` event */
		bulb.on('error', (light, err) => {
			Max.post(`Error "${err.message}" from bulb @${light.ip}`)
		})

		/** Instantiate bulb */
		bulb.connect()
	}
})

/**
 * Respond to the `disconnect` message from Max
 */
Max.addHandler('disconnect', () => {
	/** If there is a bulb */
	if (bulb) {
		bulb.disconnect()
		bulb = null
	}
})

/**
 * Respond to the `on` message from Max
 */
Max.addHandler('on', () => {
		console.log("hi")
	if (bulb) {
		bulb.onn()
	}
})

/**
 * Respond to the `off` message from Max
 */
Max.addHandler('off', () => {
	if (bulb) {
		bulb.off()
	}
})

/**
 * Respond to the `toggle` message from Max
*/
Max.addHandler('toggle', () => {
	try{
		
	if (bulb) {
		bulb.toggle()
	}
	} catch(err){
		Max.post(err)
		}
})
/**

const { toggle } = require('yeelight.io');
 
toggle('192.168.86.209', (err) => {
  if (err) {
    console.error(`error [${err.message}] occured on 192.168.10.227`);
  } else {
    console.log('toggle 192.168.1.227 success');
  }
});

if (bulb){
	bulb.toggle()
	}
	*/


/**
 * Respond to the `brightness` message from Max
 */
Max.addHandler('brightness', (value) => {
	Max.post(value)
	if (bulb) {
		Max.post(value)
		bulb.brightness(value)
	}
})

/**
 * Respond to the `color` message from Max
 */
Max.addHandler('color', (r, g, b) => {
	Max.post('r:'+ r)
		Max.post('g:'+ g)
			Max.post('b:'+ b)
	Max.post(g)
	Max.post(b)
	if (bulb) {
		bulb.color(r, g, b)
	}
})