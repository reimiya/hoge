/* --------------------------------
N: tryCount = n_g + n_c + n_p
M: fingerCount = (0 * n_g) + (2 * n_c) + (5 * n_p)
-------------------------------- */

const powerSet = (arr = []) => {
    const res = []
    const { length } = arr
    const numberOfCombinations = 2 ** length
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
        const subSet = []
        for (let setElementIndex = 0; setElementIndex < arr.length;
             setElementIndex += 1) {
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(arr[setElementIndex])
            }
        }
        res.push(subSet)
    }
    return res;
}
 const getCombinations = (tryCount, fingerCount) => {
     let arr = []
     for (let i = 0; i < tryCount; i++) {
         arr.push(0, 2, 5)
     }
     return powerSet(arr).filter((a) => a.length === tryCount && a.reduce((p, c) => p+c, 0) === fingerCount)
}

/**
 *  メイン処理
 *  lines: Array<string> 入力された行(末尾は必ず改行)分の配列
 */
const main = () => {
    const settings = lines[0].split(' ')
    let tryCount = Number(settings[0])
    const fingerCount = Number(settings[1])

    // 組み合わせのパターン網羅
    // 指の数に合うパターンに絞り込み
    const combinations = getCombinations(tryCount, fingerCount)
    console.log(combinations)

    // 順番網羅

    // 勝ち数の集計


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
