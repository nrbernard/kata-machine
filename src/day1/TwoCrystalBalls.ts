export default function two_crystal_balls(breaks: boolean[]): number {
    let inc = Math.floor(Math.sqrt(breaks.length));

    let i = inc;

    for (; i < breaks.length; i += inc) {
        if (breaks[i]) {
            break;
        }
    }

    i -= inc;

    for (let j = 0; j <= inc && i < breaks.length; ++j, ++i) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}
