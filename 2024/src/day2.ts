import { AocClient, transforms } from 'advent-of-code-client';

const part1Transform = (data: string) => transforms.lines(data).map((value:string) => value.trim().split(' ').map(Number))

function isSafe(line: number[]){
    let safe = true;
        const isAscending = line.every((val, i, arr) => i === 0 || val > arr[i - 1]);
        const isDescending = line.every((val, i, arr) => i === 0 || val < arr[i - 1]);

        if (!isAscending && !isDescending) {
            safe = !safe;
        }

        for (let i = 0; i < line.length-1 && safe; i++) {
            
            if (Math.abs(line[i+1] - line[i]) < 1 || Math.abs(line[i+1] - line[i]) > 3) 
                safe = !safe;
        }

        return safe;
}

function solution1(input: number[][]): number {
    let suma = 0;
    input.forEach(line => {
        if (isSafe(line)) suma++;
    })
    return suma;
}

function solution2(input:number[][]): number {
    let suma = 0;
    input.forEach(line => {
        if (isSafe(line)) {
            suma++;
        }else{
            for (let i = 0; i < line.length; i++) {
                const trimmedReport = line.slice();
                trimmedReport.splice(i, 1);
        
                if (isSafe(trimmedReport)) {
                    suma++;
                    break;
                }
            }
        }
    })
    return suma;
}

const client = new AocClient({
    year: 2024, // the year of the challenge
    day: 2, // the day of the challenge
    token: '53616c7465645f5f360927472669651a3196347d0b09b8fc5c6dd1cd558d9758c6d26a60ee6dd219ceaef510bf2143f30e06495b38be24e8e4c18ba41ebe23eb' // the session cookie from adventofcode.com
});

client.setInputTransform(part1Transform);

client.getInput().then( data => {
    const input = data as number[][];
    console.log(input);
    console.log(`solution1: ${solution1(input)}`);
    console.log(`solution2: ${solution2(input)}`);
}).catch((error : any) => {
    console.log(error);
}).finally()