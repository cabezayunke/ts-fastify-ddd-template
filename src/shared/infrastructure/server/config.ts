import { ApiError } from './ApiError';

const getOptionalNumberEnvVar = (envVarName: string, defaultValue: number): number => {
  const value = process.env[envVarName];
  if (value && !isNaN(Number(value))) {
    return parseInt(value, 10);
  }
  return defaultValue;
};
const getOptionalStringEnvVar = (envVarName: string, defaultValue: string): string => {
  return process.env[envVarName] || defaultValue;
};

const getMandatoryStringEnvVar = (envVarName: string): string => {
  if (!process.env[envVarName]) {
    throw ApiError.internal(`Missing mandatory ${envVarName}`);
  }
  return process.env[envVarName] as string;
};

const getMandatoryNumberEnvVar = (envVarName: string): number => {
  const value = process.env[envVarName];
  if (value && !isNaN(Number(value))) {
    return parseInt(value, 10);
  }
  throw ApiError.internal(`Missing mandatory ${envVarName}`);
};

export {
  getOptionalNumberEnvVar,
  getOptionalStringEnvVar,
  getMandatoryStringEnvVar,
  getMandatoryNumberEnvVar
};
