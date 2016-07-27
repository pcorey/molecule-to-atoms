export function molecule(formula) {
    let _parts = [];

    formula = formula.replace(/[{(]/g, "[").replace(/[})]/g, "]");

    let matches;
    let stack = [];
    let regex = /((\[)|(\])|([A-Z][a-z]*))(\d*)/g;
    while (matches = regex.exec(formula)) {
        let [_, __, open, close, part, count] = matches;
        count = parseInt(count) || 1;
        if (open) {
            stack.push({
                formula: "",
                molecules: []
            });
        }
        else if (close) {
            let popped = stack.pop();
            popped.molecules.push(molecule(popped.formula));
            popped.molecules.forEach((molecule) => {
                molecule.multiply(count);
            });
            if (!stack.length) {
                popped.molecules.forEach((molecule) => {
                    _parts = _parts.concat(molecule.parts());
                });
            }
            else {
                let last = stack[stack.length - 1];
                last.molecules = last.molecules.concat(popped.molecules);
            }
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
