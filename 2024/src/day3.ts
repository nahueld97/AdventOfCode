import { AocClient, transforms } from 'advent-of-code-client';

function solution1(input: string[]): number {
    const mulRegex = /mul\((\d+),(\d+)\)/g;
    let suma = 0;

    // Usamos forEach o map para iterar sobre las líneas
    input.forEach((line) => {
        const match = line.match(mulRegex);
        if (match) {
            suma += match
                .map((mul) => {
                    const regex = /mul\((\d+),(\d+)\)/;
                    const numMatch = mul.match(regex);
                    if (numMatch) {
                        const num1 = Number(numMatch[1]);
                        const num2 = Number(numMatch[2]);
                        return num1 * num2;
                    }
                    return 0;
                })
                .reduce((acc, current) => acc + current, 0);
        }
    });

    return suma;
}


function solution2(input:string[]): number {
    const regex = /mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/g;
    const mulRegex = /mul\((\d+),(\d+)\)/;
    let canMul = true;
    let suma = 0;
    const result: string[] = [];

    input.forEach((line) => {
        const matches = line.match(regex);

        if (matches) {
            result.push(...matches);
        }
    });

    result.forEach(element => {
        switch (element) {
            case "do()":
                canMul = true;
                break;
            case "don't()":
                canMul = false;
                break;
            default:
                if (canMul) {
                    const numMatch = element.match(mulRegex);
                    if (numMatch) {
                        const num1 = Number(numMatch[1]);
                        const num2 = Number(numMatch[2]);
                        suma += num1 * num2;
                    }
                }
                break;
        } 
    });

    return suma;
}

const client = new AocClient({
    year: 2024, // the year of the challenge
    day: 3, // the day of the challenge
    token: '53616c7465645f5f360927472669651a3196347d0b09b8fc5c6dd1cd558d9758c6d26a60ee6dd219ceaef510bf2143f30e06495b38be24e8e4c18ba41ebe23eb' // the session cookie from adventofcode.com
});

client.setInputTransform(transforms.lines);

client.getInput().then( data => {
    const input = data as string[];
    console.log(`solution1: ${solution1(input)}`);
    console.log(`solution2: ${solution2(input)}`);
}).catch((error : any) => {
    console.log(error);
}).finally()