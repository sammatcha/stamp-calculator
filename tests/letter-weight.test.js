import {describe, it, expect} from 'vitest'
import { validateInput } from '../lib/validation'

describe("validateLetterWeight", () => {
    it("returns null when weight is valid", () =>{
       expect(validateInput(1, 3.5)).toBe(null)
       expect(validateInput(3.5, 3.5)).toBe(null)
    });

    it("returns error when weight is over limit", () =>{
        expect(validateInput(3.6,3.5)).toBe("Weight exceeds maximum limit of 3.5 oz")
    });

    it("returns error when weight is zero or negative", ()=>{
        expect(validateInput(0,3.5)).toBe("Please enter valid weight")
    });
})