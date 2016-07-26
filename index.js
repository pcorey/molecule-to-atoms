export function molecule(formula) {
    let _parts = [];

    let matches;
    let regex = /(\[(.*)\]|([A-Z][a-z]*))(\d*)/g;
    while (matches = regex.exec(formula)) {
        let [_, __, square, part, count] = matches;
        if (square) {
            let nested = molecule(square).parts();
            _parts = _parts.concat(nested);
        }
        else {
            _parts.push({
                part,
                count: parseInt(count) || 1
            });
        }
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
        parts
    };
}

export function parseMolecule(formula) {
    return molecule(formula).parse();
}
