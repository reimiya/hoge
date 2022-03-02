function invokeClairvoyance(playerTry) {
    return playerTry.reduce((a, c) => {
        if (c === 'G') a.P++
        if (c === 'C') a.G++
        if (c === 'P') a.C++
        return a
    }, {G: 0, C: 0, P: 0})
}

function adjustFingerCount(allWinTry, diff, t5, t3, t2, ti5, ti3, ti2) {
    const adjustedTry = {...allWinTry}
    const changeLog = {t5: 0, t3: 0, t2: 0, ti5: 0, ti3: 0, ti2: 0}
    let minLose = 0
    while (adjustedTry[t5] > 0 && diff >= 5) {
        adjustedTry[t5]--
        changeLog.t5++
        minLose++
        diff -= 5
    }
    while (adjustedTry[t3] > 0 && diff >= 3) {
        adjustedTry[t3]--
        changeLog.t3++
        minLose++
        diff -= 3
    }
    while (adjustedTry[t2] > 0 && diff >= 2) {
        adjustedTry[t2]--
        changeLog.t2++
        minLose++
        diff -= 2
    }

    while (adjustedTry[t3] > 1 && changeLog.t5 > 0 && diff >= 1) {
        adjustedTry[t3] -= 2
        adjustedTry[t5]++
        changeLog.t3 += 2
        changeLog.t5--
        minLose++
        diff--
    }
    while (adjustedTry[t2] > 1 && changeLog.t3 > 0 && diff >= 1) {
        adjustedTry[t2] -= 2
        adjustedTry[t3]++
        changeLog.t2 += 2
        changeLog.t3--
        minLose++
        diff--
    }
    while (adjustedTry[t2] > 2 && changeLog.t5 > 0 && diff >= 1) {
        adjustedTry[t2] -= 3
        adjustedTry[t5]++
        changeLog.t2 += 3
        changeLog.t5--
        minLose += 2
        diff--
    }

    while (adjustedTry[t3] > 0 && adjustedTry[ti2] > 0 && diff >= 1) {
        adjustedTry[t3]--
        adjustedTry[ti2]--
        changeLog.t3--
        changeLog.ti2--
        minLose += 2
        diff--
    }
    return minLose;
}

function calculateMinLose(allWinTry, fingerCount) {
    // 全勝の場合との指定の指の数の差(allWinTry.G*0=0のため省略)
    const fingerCountDiff = allWinTry.C * 2 + allWinTry.P * 5 +  - fingerCount

    // 正の場合は減らす調整、負の場合は増やす調整をして指定の指の数に合わせるための変更数を出す
    if (fingerCountDiff > 0) {
        return adjustFingerCount(allWinTry, Math.abs(fingerCountDiff), 'P', 'P', 'C', 'G', 'C', 'G')
    } else if (fingerCountDiff < 0) {
        return adjustFingerCount(allWinTry, Math.abs(fingerCountDiff), 'G', 'C', 'G', 'P', 'P', 'C')
    } else {
        return 0
    }
}

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
