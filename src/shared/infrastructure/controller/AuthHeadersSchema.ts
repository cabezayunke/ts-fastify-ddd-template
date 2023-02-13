export const AuthHeadersSchema = {
    $id: "AuthHeadersSchema",
    type: "object",
    properties: {
      authorization: { type: "string" },
    },
    required: ["authorization"],
  } as const;