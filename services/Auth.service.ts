import { TUserLoginData } from '@models/TUserLoginData';

export default class ServiceAuth {
  static logins: string[] = ['gavrilov', 'fedorov'];

  static passwords: string[] = ['111aaa', '222bbb'];

  static isAuth = false;

  static login({ login, password }: TUserLoginData) {
    const isValidUserData =
      this.logins.includes(login) && this.passwords.includes(password);

    if (isValidUserData) {
      this.isAuth = true;
    }
  }

  static checkAuth() {
    return this.isAuth;
  }
}
