import { CUIT } from "../../../src/domain/value-objects/CUIT";

describe("CUIT", () => {
  describe("new CUIT", () => {
    it("should create a valid CUIT", () => {
      const cuit = new CUIT("20123456789");

      expect(cuit.value).toBe("20123456789");
    });

    it("should throw with invalid CUIT", () => {
      expect(() => new CUIT("1234")).toThrow("CUIT inválido");
    });
  });

  describe("equals", () => {
    it("returns true when CUITs are equal", () => {
      const cuitA = new CUIT("20304050607");
      const cuitB = new CUIT("20304050607");

      expect(cuitA.equals(cuitB)).toBe(true);
    });

    it("returns false when CUITs are different", () => {
      const cuitA = new CUIT("20304050607");
      const cuitB = new CUIT("20987654321");

      expect(cuitA.equals(cuitB)).toBe(false);
    });
  });
});
