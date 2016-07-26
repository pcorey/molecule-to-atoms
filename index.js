export function molecule(formula) {
    let _parts = [];

    let matches;
    let regex = /(\[(.*)\]|([A-Z][a-z]*))(\d*)/g;
    while (matches = regex.exec(formula)) {
        let [_, __, square, part, count] = matches;
        count = parseInt(count) || 1;
        if (square) {
            let nested = molecule(square).multiply(count);
            _parts = _parts.concat(nested.parts());
        }
        else {
            _parts.push({
                part,
                count
            });
        }
    }

    function multiply(count) {
        _parts.forEach((part) => {
            part.count *= count;
        });
        return this;
    }

    function parts() {
        return _parts;
    }

    function parse() {
        return parts().reduce((result, {part, count}) => {
            result[part] = ~~result[part] + count;
            return result;
        }, {});
    }

    return {
        parse,
        parts,
        multiply
    };
}

export function parseMolecule(formula) {
    return molecule(formula).parse();
}
