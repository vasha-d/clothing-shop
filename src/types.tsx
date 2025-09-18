export type RegistrationObjType = {
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
  avatar: File | null,
}

export type SignInObjType = {
  email: string,
  password: string
}
export type ProductListQueryType = {
  page: number,
  min: number,
  max: number,
  sort: SortType
}

export type ProductObjType = {
  color: string,
  id: number,
  available_sizes?: string[],
  available_colors: string[],
  cover_image: string,
  description?: null,
  images: string[],
  price: number,
  release_year: string,
  name: string
  
}

export type PageFetchReturnType = {
  data: ProductObjType[],
  links: (string | null)[]
}


export type SortType =
 `price` |
 `-price` |
 `created_at` 