import axios from "axios"


const api = 'https://api.redseam.redberryinternship.ge/api/products'

export async function getPage( page: number, min: number, max: number, sort: string ) {
  
  const params = new URLSearchParams({
    page: page.toString(),
    'filter[price_from]': min.toString(),
    'filter[price_to]': max.toString(),
    sort: sort
  })
  
  console.log(params.toString())
  const url = api + '?' + params.toString()

  console.log(url)
  const query = await axios.get(url, {
    headers: {
      'Accept': 'application/json'
    }
  })

  console.log(query)
}

export async function getItem(id: number) {
  const url = api + `/`+ id

  const request = await axios.get(url, {
    headers: {
      Accept: 'applicatin/json'
    }
  })
  console.log(request
    
  )
  console.log(request.data)
  return request
}

