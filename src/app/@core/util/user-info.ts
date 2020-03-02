import { GlobalConstants } from '../constant/GlobalConstants';
import { UserModel } from '../../routes/user/user.model';

/**
 * 获取localStorage中的token信息
 */
export function getToken(): string {
  return localStorage.getItem(GlobalConstants.getInstance().TOKEN);
}

/**
 * 记录token信息到localStorage
 *
 * @param token
 */
export function setToken(token: string): void {
  localStorage.setItem(GlobalConstants.getInstance().TOKEN, token);
}

/**
 * 删除localStorage中的token信息
 */
export function removeToken(): void {
  localStorage.removeItem(GlobalConstants.getInstance().TOKEN);
}

/**
 * 获取localStorage中的用户信息
 */
export function getUserInfo(): UserModel {
  return JSON.parse(localStorage.getItem(GlobalConstants.getInstance().CURRENT_USER));
}

/**
 * 记录当前用户信息到localStorage
 *
 * @param user 当前用户信息
 */
export function setUserInfo(user: UserModel): void {
  localStorage.setItem(GlobalConstants.getInstance().CURRENT_USER, JSON.stringify(user));
}

/**
 * 删除localStorage中的用户信息
 */
export function removeUserInfo(): void {
  localStorage.removeItem(GlobalConstants.getInstance().CURRENT_USER);
}
