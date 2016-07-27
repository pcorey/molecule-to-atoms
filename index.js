export function molecule(formula) {
    let _parts = [];

    let matches;
    let stack = [];
    let regex = /((\[)|(\])|([A-Z][a-z]*))(\d*)/g;
    while (matches = regex.exec(formula)) {
        let [_, __, open, close, part, count] = matches;
        count = parseInt(count) || 1;
        if (open) {
            stack.push({
                formula: ""
            });
        }
        else if (close) {
            let nested = molecule(stack.pop().formula).multiply(count);
            _parts = _parts.concat(nested.parts());
        }
        else if (stack.length) {
            stack[stack.length - 1].formula += part + count;
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
