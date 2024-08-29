const randomBuffer = crypto.getRandomValues(new Uint8Array(512))
let randomBufferPointer = 0
export const getRandomValues = (buffer: Uint8Array) => {
  if (buffer.length + randomBufferPointer >= randomBuffer.length) {
    crypto.getRandomValues(randomBuffer)
    randomBufferPointer = 0
  }

  for (let index = 0; index < buffer.length; index++) {
    buffer[index] = randomBuffer[randomBufferPointer++]!
  }
}
