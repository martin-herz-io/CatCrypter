export const stringGenerator = (length: number, chars: { numbers?: boolean, lowerCase?: boolean, upperCase?: boolean, special?: boolean }) => {

    // Characters that are allowed
    let characters = '';

    // Check which characters are allowed
    if (chars.numbers) {
        characters += '0123456789';
    }

    if (chars.lowerCase) {
        characters += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (chars.upperCase) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (chars.special) {
        characters += '.!?§$%&-_#+*~';
    }

    // Generate the string
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Return the result
    return result;

}