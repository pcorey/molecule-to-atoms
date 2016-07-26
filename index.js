export function molecule(formula) {
    function parse() {
        if (!formula) {
            return {};
        }
        return {
            [formula]: 1
        };
    }

    return {
        parse
    };
}

export function parseMolecule(formula) {
    return molecule(formula).parse();
}
