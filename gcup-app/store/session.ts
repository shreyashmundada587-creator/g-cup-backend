import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "gcup_token";
const USER_KEY = "gcup_user";

async function setItem(key: string, value: string) {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function getItem(key: string) {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  } else {
    return SecureStore.getItemAsync(key);
  }
}

async function deleteItem(key: string) {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export async function saveSession(token: string, user: any) {
  await setItem(TOKEN_KEY, token);
  await setItem(USER_KEY, JSON.stringify(user));
}

export async function clearSession() {
  await deleteItem(TOKEN_KEY);
  await deleteItem(USER_KEY);
}

export async function getToken() {
  return getItem(TOKEN_KEY);
}

export async function getUser() {
  const s = await getItem(USER_KEY);
  return s ? JSON.parse(s) : null;
}