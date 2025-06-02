import { RazonSocial } from "../../../src/domain/value-objects/RazonSocial";

describe("Razon Social", () => {
  describe("new RazonSocial", () => {

    it("should create a valid razon social", () => {
      const razonSocial = new RazonSocial("Mi Empresa S.A.");
      expect(razonSocial.value).toBe("Mi Empresa S.A.");
    });
  
    it("should throw with empty razón social", () => {
      expect(() => new RazonSocial("")).toThrow(
        "Razón social no puede estar vacía.",
      );
    });
  });
  describe("equals", () => {
      it("returns true when values are equal", () => {
        const razonSocialA = new RazonSocial("Innovar SRL");
        const razonSocialB = new RazonSocial("Innovar SRL");
  
        expect(razonSocialA.equals(razonSocialB)).toBe(true);
      });
  
      it("returns false when values are different", () => {
        const razonSocialA = new RazonSocial("CloudCorp");
        const razonSocialB = new RazonSocial("ACME Solutions");
  
        expect(razonSocialA.equals(razonSocialB)).toBe(false);
      });
    });
});
