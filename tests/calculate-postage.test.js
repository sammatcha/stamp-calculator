import { describe , it, expect } from "vitest";
import { calculatePostage } from "../app/utils/calculatePostage";

describe("calculatePostage", () =>{
    it("forever stamp for base stamp and when not machinable", () => {
        const result = calculatePostage(1, false);
        expect(result.total).toBe(0.78);
        expect(result.breakdown[0].type).toBe('forever');
    });

    it("uses nonmachinable rate when checked", () =>{
        const result = calculatePostage(1, true);
        expect(result.total).toBe(1.27);
        expect(result.breakdown[0].type).toBe("nonMachinable");
    });

    it("calculate nonmachinable with additional ounce", () => {
        const result = calculatePostage(2, true);
        expect(result.total).toBe(1.27 + 0.29);
    })

    it("calculate forever with additional ounce", () =>{
        const result = calculatePostage(2,false);
        expect(result.total).toBe(0.78 + 0.29);
    })
})