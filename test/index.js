import { expect } from "chai";
import { parseMolecule } from "../index";

describe("Molecule to Atoms", function() {

    it("it parses a molecule", () => {
        expect(parseMolecule("")).to.deep.equal({});
    });

});
