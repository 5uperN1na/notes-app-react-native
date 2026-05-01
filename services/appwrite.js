import { Platform } from 'react-native';
import { Account, Client, Databases } from 'react-native-appwrite';

const readEnv = (value, fallback) => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }

  return fallback;
};

const config = {
  endpoint: readEnv(
    process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    'https://nyc.cloud.appwrite.io/v1'
  ),
  projectId: readEnv(
    process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    'notes-project-rn0426'
  ),
  db: readEnv(
    process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    'notes-app-db'
  ),
  col: {
    notes: readEnv(
      process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID,
      'notes'
    ),
  },
};

const missingConfig = [];

if (!config.endpoint) missingConfig.push('EXPO_PUBLIC_APPWRITE_ENDPOINT');
if (!config.projectId) missingConfig.push('EXPO_PUBLIC_APPWRITE_PROJECT_ID');
if (!config.db) missingConfig.push('EXPO_PUBLIC_APPWRITE_DB_ID');
if (!config.col.notes) missingConfig.push('EXPO_PUBLIC_APPWRITE_COL_NOTES_ID');

const appwriteConfigError = missingConfig.length
  ? `Missing Appwrite config: ${missingConfig.join(', ')}`
  : null;

let client = null;
let database = null;
let account = null;

if (!appwriteConfigError) {
  client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

  const platformId =
    Platform.OS === 'ios'
      ? readEnv(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID, 'notes-app-ios')
      : Platform.OS === 'android'
      ? readEnv(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME, 'notes-app-android')
      : null;

  if (platformId) {
    client.setPlatform(platformId);
  }

  database = new Databases(client);
  account = new Account(client);
}

console.log('Appwrite config:', config);
console.log('Appwrite config error:', appwriteConfigError);

export { account, appwriteConfigError, client, config, database };
