const api = {
  'localhost:8080': 'http://dev-api'
}

export function getAppBaseUrl () {
  console.log(location.host)
  return api[location.host] || 'http://localhost:8080'
}
