class Microphone {
    constructor() {
        this.initialized = false
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream => {
            this.audioContext = new AudioContext()
            this.microphone = this.audioContext.createMediaStreamSource(stream)
            this.analyser = this.audioContext.createAnalyser()
            this.analyser.fftSize = 512
            const bufferLength =this.analyser.frequencyBinCount
            this.dataArray = new Uint8Array(bufferLength)
            this.microphone.connect(this.analyser)
            this.initialized = true
        })
        .catch(error => {
            console.log(error);
            alert('error')
        })
    }
    getSamples = () => {
        this.analyser.getByteTimeDomainData(this.dataArray)
        return [ ... this.dataArray ].map(element => element/128 -1)
    }
    getVolume = () => {
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normalizedSamples = [ ... this.dataArray ].map(element => element/128 -1)
        let sum = 0
        for(let i=0; i<normalizedSamples.length; i++) {
            sum += normalizedSamples[i] * normalizedSamples[i]
        }
        return Math.sqrt(sum / normalizedSamples.length)
    }
}
