import { addDays, isAfter } from 'date-fns';

export function removeAuthToken() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_token_expiration');
}

export function setAuthToken(token) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_token_expiration', addDays(new Date(), 30).toString());
}

export function isAuthenticated() {
  const expirationDate = localStorage.getItem('auth_token_expiration');
  return !!expirationDate && isAfter(expirationDate, new Date());
}

export function setUserId(userId) {
  localStorage.setItem('user_id', userId);
}

export function getUserId() {
  const userId = localStorage.getItem('user_id');
  return userId;
}

export function removeUserId() {
  localStorage.removeItem('user_id');
}

export function logOut() {
  removeAuthToken();
  removeUserId();
}
