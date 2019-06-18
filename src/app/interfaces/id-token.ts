export interface IdToken {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
}
