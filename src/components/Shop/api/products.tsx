import axios from "axios"


const api = 'https://api.redseam.redberryinternship.ge/api/products'

export async function getPage( page: number, min: number, max: number, sort: string ) {
  
  const params = new URLSearchParams({
    page: page.toString(),
    'filter[price_from]': min.toString(),
    'filter[price_to]': max.toString(),
    sort: sort
  })
  
  const url = api + '?' + params.toString()

  const query = await axios.get(url, {
    headers: {
      'Accept': 'application/json'
    }
  })

  return query
}

export async function getItem(id: number) {
  const url = api + `/`+ id

  const request = await axios.get(url, {
    headers: {
      Accept: 'applicatin/json'
    }
  })
    
  return request
}

