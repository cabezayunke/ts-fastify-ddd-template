export const ErrorResponseSchema = {
    $id: "ErrorResponseSchema",
    type: "object",
    description: 'Error response',
    properties: {
      statusCode: { type: "number" },
      extra: { type: "object" },
      message: { type: "string" },
    },
    required: ["message"],
  } as const;