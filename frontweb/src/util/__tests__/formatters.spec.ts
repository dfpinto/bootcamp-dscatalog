import { formatPrice } from "util/fomatters"

describe("formatPrice for positive numbers", () => {
    test("fomatterPrice shoud format number pt-BR when given 10.1", () => {
        const result = formatPrice(10.1);
        expect(result).toEqual("10,10");
    })

    test("fomatterPrice shoud format number pt-BR when given 20.0", () => {
        const result = formatPrice(20.0);
        expect(result).toEqual("20,00");
    })
})

describe("formatPrice for non-positive numbers", () => {
    test("fomatterPrice shoud format number pt-BR when given 0", () => {
        const result = formatPrice(0);
        expect(result).toEqual("0,00");
    })

    test("fomatterPrice shoud format number pt-BR when given -5.1", () => {
        const result = formatPrice(-5.1);
        expect(result).toEqual("-5,10");
    })
})