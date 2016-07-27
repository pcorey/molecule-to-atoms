import { expect } from "chai";
import { parseMolecule, molecule } from "../index";

describe("Molecule to Atoms", function() {

    it("it parses a molecule", () => {
        expect(parseMolecule("")).to.deep.equal({});
        expect(parseMolecule("H")).to.deep.equal({ H: 1 });
        expect(parseMolecule("HMg")).to.deep.equal({ H: 1, Mg: 1 });
        expect(parseMolecule("H2Mg")).to.deep.equal({ H: 2, Mg: 1 });
        expect(parseMolecule("H2MgH")).to.deep.equal({ H: 3, Mg: 1 });
        expect(parseMolecule("[H]Mg")).to.deep.equal({ H: 1, Mg: 1 });
        expect(parseMolecule("[HO]2Mg")).to.deep.equal({ H: 2, O: 2, Mg: 1 });
    });

    describe("molecule", () => {
        it("splits a formula into parts", () => {
            expect(molecule("HMg").parts()).to.deep.equal([
                { part: "H", count: 1 },
                { part: "Mg", count: 1 },
            ]);
            expect(molecule("[H]2O[H]").parts()).to.deep.equal([
                { part: "H", count: 2 },
                { part: "O", count: 1 },
                { part: "H", count: 1 }
            ]);
        });
        it("multiplies an object", () => {
            expect(molecule("H").multiply(2).parse()).to.deep.equal({ H: 2 });
        });
    });

});
