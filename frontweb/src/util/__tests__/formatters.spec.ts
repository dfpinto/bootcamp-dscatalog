import { formatPrice } from "util/fomatters"

test("fomatterPrice shoud format number pt-BR when given 10.0", () => {
    const result = formatPrice(10.1);
    expect(result).toEqual("10,10");
})