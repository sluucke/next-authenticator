import axios from 'axios'

const api = axios.create({
  baseURL: 'http://132.226.245.108:3333',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
})

export { api }