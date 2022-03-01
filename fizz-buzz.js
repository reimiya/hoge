/**
 *  メイン処理
 *  lines: Array<string> 入力された行(末尾は必ず改行)分の配列
 */
const main = () => {
    const N = lines[0]
    for(let i = 1; i <= N; i++) {
        if ( i % 15 === 0 ) {
            console.log('Fizz Buzz')
        } else if ( i % 3 === 0 ) {
            console.log('Fizz')
        } else if ( i % 5 === 0 ) {
            console.log('Buzz')
        } else {
            console.log(i)
        }
    }

    // 空行
    console.log('')
}

/**
 * 標準入出力のための処理
 */
const reader = require('readline')

process.stdin.resume()
process.stdin.setEncoding('utf8')
const rl = reader.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lines = []
rl.on('line', (line) => {
    lines.push(line)
})

rl.on('close', main)
