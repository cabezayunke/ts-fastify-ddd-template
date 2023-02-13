import {FromSchema} from 'json-schema-to-ts';

export const UserResponseSchema = {
    $id: "UserResponse",
    type: "object",
    description: 'User object',
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
    },
    required: ["id", "email"],
  } as const;

export type UserResponseType = FromSchema<typeof UserResponseSchema>