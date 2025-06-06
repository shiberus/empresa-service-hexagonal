export const components = {
  schemas: {
    EmpresaInput: {
      type: "object",
      required: ["cuit", "razonSocial"],
      properties: {
        cuit: {
          type: "string",
          example: "20304050603",
        },
        razonSocial: {
          type: "string",
          example: "Empresa S.A.",
        },
        fechaAdhesion: {
          type: "string",
          format: "date",
          example: "2025-06-01",
          description: "Opcional. Si no se envía, se usa la fecha actual.",
        },
      },
    },
    EmpresaOutput: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "b81c13c6-4605-43c4-bd46-4f20bb7b6e6b",
        },
        cuit: {
          type: "number",
          example: 20234567890,
        },
        razonSocial: {
          type: "string",
          example: "Tres Estrellas SRL",
        },
        fechaAdhesion: {
          type: "string",
          format: "date-time",
          example: "2022-12-18T14:55:00.000Z",
        },
      },
    },
  },
};
