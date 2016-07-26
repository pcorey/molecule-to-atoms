export function molecule(formula) {
    function parts() {
        return formula.match(/[A-Z][a-z]*/g) || [];
    }

    function parse() {
        return parts().reduce((result, part) => {
            result[part] = 1;
            return result;
        }, {});
    }

    return {
        parse,
        parts
    };
}

export function parseMolecule(formula) {
    return molecule(formula).parse();
}
