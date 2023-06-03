function extractProjectNumber(url) {
  const regex = /projects\/(\d+)/
  const match = url.match(regex)
  if (match && match[1]) {
    return match[1]
  }
  return url
}

export default extractProjectNumber
