function checkSeat(tables, start, groupPeoples) {
    for (let i = start; i < start + groupPeoples; i++) {
        if (i >= tables.length && tables[i-tables.length]) {
            return false
        } else if (tables[i]) {
            return false
        }
    }
    return true;
}

function sitToSeat(tables, start, groupPeoples) {
    for (let i = start; i < start + groupPeoples; i++) {
        if (i > tables.length) {
            tables[i-tables.length] = true
        } else {
            tables[i] = true
        }
    }
    return tables;
}

/**
 *  メイン処理
 *  lines: Array<string> 入力された行(末尾は必ず改行)分の配列
 */
const main = () => {
    const settings = lines[0].split(' ')
    let tables = new Array(Number(settings[0])).fill(false)
    const groups = Number(settings[1])

    for(let i = 1; i <= groups; i++) {
        const group = lines[i].split(' ')
        const groupPeoples = Number(group[0])
        const start = Number(group[1]) - 1

        // 席が埋まっているか確認し、大丈夫なら座る
        if (checkSeat(tables, start, groupPeoples)) {
            tables = sitToSeat(tables, start, groupPeoples)
        }
    }

    const allPeoples = tables.reduce((previousValue, currentValue) => {
        return previousValue + (currentValue ? 1 : 0)
    }, 0)

    console.log(allPeoples)

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
