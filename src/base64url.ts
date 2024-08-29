export const toBase64url = (uuid: Uint8Array): string => {
  return btoa(String.fromCharCode(...uuid))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '')
}

export const fromBase64url = (string: string): Uint8Array => {
  return new Uint8Array(
    atob(string.replaceAll('-', '+').replaceAll('_', '/'))
      .split('')
      .map((char) => char.charCodeAt(0))
  )
}
