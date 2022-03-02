function invokeClairvoyance(playerTry) {
    return playerTry.map((t) => {
        if (t === 'G') return 5
        if (t === 'C') return 0
        if (t === 'P') return 2
    })
}

function calculateMinLose(allWinTry, fingerCount) {
    const fingerCountDiff = Math.abs(allWinTry.reduce((a, c) => a + c, 0) - fingerCount)
    switch (fingerCountDiff % 5) {
        case 4:
        case 1: return Math.floor(fingerCountDiff / 5) + 2
        case 3:
        case 2: return Math.floor(fingerCountDiff / 5) + 1
        case 0: return Math.floor(fingerCountDiff / 5)
    }
}

/* --------------------------------
N: tryCount = n_g + n_c + n_p
M: fingerCount = (0 * n_g) + (2 * n_c) + (5 * n_p)
-------------------------------- */
/**
 *  メイン処理
 *  lines: Array<string> 入力された行(末尾は必ず改行)分の配列
 */
const main = () => {
    const settings = lines[0].split(' ')
    let tryCount = Number(settings[0])
    const fingerCount = Number(settings[1])
    const playerTry = Array.from(lines[1])

    // 全勝するパターンを算出
    const allWinTry = invokeClairvoyance(playerTry)

    // 全勝の指の数と目標とする指の数との差で最小何回手を変えるべきか算出
    const minLose = calculateMinLose(allWinTry, fingerCount)

    // 最大勝ち数を出力
    console.log(tryCount - minLose)

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
