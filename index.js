export function molecule(formula) {
    function parts() {
        let parts, results = [];
        let regex = /([A-Z][a-z]*)(\d*)/g;
        while (parts = regex.exec(formula)) {
            let [_, part, count] = parts;
            results.push({
                part,
                count: parseInt(count) || 1
            });
        }
        return results;
    }

    function parse() {
        return parts().reduce((result, {part, count}) => {
            result[part] = count;
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
