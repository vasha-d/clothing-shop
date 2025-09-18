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