import { AocClient, transforms } from 'advent-of-code-client';

const part1Transform = (data: string) => {
    let transformed :number[][] = [[],[]];
    transforms.lines(data).map((value:string) => {
        transformed[0].push(+value.split("   ")[0]);
        transformed[1].push(+value.split("   ")[1]);
    });
    transformed[0].sort();
    transformed[1].sort();
    return transformed;
}

function solution1(input: number[][]): number {
    let suma = 0;
    for (let i = 0; i < input[0].length; i++) {
        suma += Math.abs(input[0][i] - input[1][i]);
    }
    return suma;
}

function solution2(input:number[][]): number {
    let suma = 0;
    let map = new Map<number, number>();
    input[1].forEach(leftNum => {
        input[0].forEach(rightNum =>{
            if(rightNum == leftNum){
                if (!map.has(leftNum)) {
                    map.set(leftNum, 1);
                }else{
                    map.set(leftNum, (map.get(leftNum) as number) + 1);
                }
            }
        })
    }); 

    for (let e of map.entries()){
        suma += e[0]*e[1];
    }

    return suma;
}

const client = new AocClient({
    year: 2024, // the year of the challenge
    day: 1, // the day of the challenge
    token: '53616c7465645f5f360927472669651a3196347d0b09b8fc5c6dd1cd558d9758c6d26a60ee6dd219ceaef510bf2143f30e06495b38be24e8e4c18ba41ebe23eb' // the session cookie from adventofcode.com
});

client.setInputTransform(part1Transform);

client.getInput().then( data => {
    const input = data as number[][];
    console.log(`solution1: ${solution1(input)}`);
    console.log(`solution2: ${solution2(input)}`);
}).catch((error : any) => {
    console.log(error);
}).finally()