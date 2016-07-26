export function molecule(formula) {
    function parse() {
        return {};
    }

    return {
        parse
    };
}

export function parseMolecule(formula) {
    return molecule(formula).parse();
}
