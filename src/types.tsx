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
  min: number | '',
  max: number | '',
  sort: SortType
}

export type ProductObjType = {
  color: string,
  id: number,
  available_sizes: string[],
  available_colors: string[],
  cover_image: string,
  description?: null,
  images: string[],
  price: number,
  release_year: string,
  name: string
  
}
export type CartItemType = {
  color: string,
  id: number,
  available_sizes: string[],
  available_colors: string[],
  cover_image: string,
  description?: null,
  images: string[],
  price: number,
  release_year: string,
  name: string
  quantity: number
}

export type PageFetchDataType = {
  data: ProductObjType[],
  links: (string | null)[],
  meta: {
    current_page: number,
    from: number;
    last_page:number;
    per_page:number;
    to: number;
    total: number;
    path: string;
    links: string[];
  }
} | null

export type UseGetPageReturnType = {
  data: PageFetchDataType,
  loading: boolean,
  query: ProductListQueryType,
  setQuery: React.Dispatch<React.SetStateAction<ProductListQueryType>>
}


export type SortType =
 `price` |
 `-price` |
 `created_at` 


export type CartControlsHookType = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
  cartData: CartItemType[] | null
}

export type useCartPanelType = {
  cartElement: React.ReactElement, 
  controls: CartControlsHookType
}