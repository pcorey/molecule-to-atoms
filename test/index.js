import { expect } from "chai";
import { parseMolecule, molecule } from "../index";

describe("Molecule to Atoms", function() {

    it("it parses a molecule", () => {
        expect(parseMolecule("")).to.deep.equal({});
        expect(parseMolecule("H")).to.deep.equal({ H: 1 });
        expect(parseMolecule("HMg")).to.deep.equal({ H: 1, Mg: 1 });
    });

    describe("molecule", () => {
        it("splits a formula into parts", () => {
            expect(molecule("HMg").parts()).to.deep.equal(["H", "Mg"]);
        });
    });

});
