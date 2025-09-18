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

export type ProductObjType = {
  color: string,
  id: number,
  size: string,
  
}


export type SortType = 
 `price` |
 `-price` |
 `created_at` |
 `-created_at`