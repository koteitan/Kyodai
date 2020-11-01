/*
    Buchholz Hydraの動きを真似する.
    理想的なコンピュータで動かした場合
    calc(n) ≒ HH[ψ_0(ε_{Ω_ω+1})](n)になると思われる(ψはBuchholz ψ).
*/
function calc(n) {
    //Aはペアの左(1,2,3,4,...) Bはペアの右(1,0,0,0,...)
    //1基準で動く 0はωと同じ振る舞いをする
    var A = [...Array(n)].map((_, a) => a + 1);
    var B = new Array(n).fill(0);
    var end;
    B[0]++;

    //配列が空になるまで動きます
    while (A.length != 0) {
        //活性化関数
        n++;

        //配列の一番最後のインデックス
        end = A.length - 1;

        if (A[end] == 1 && B[end] == 1) {
            //(1,1)は問答無用で消去
            A.pop();
            B.pop();
        } else if (B[end] == 0) {
            //0はωとして振る舞うので 現在のnでラベルし直し
            //(m,0) -> (m,n)
            B[end] = n;
        } else if (B[end] == 1) {
            //bad rootを探索
            var br = end - 1;
            while (A[br] >= A[end]) br--;

            //good partとbad partに分ける
            var GA = A.slice(0, br);
            var BA = A.slice(br, end);
            var GB = B.slice(0, br);
            var BB = B.slice(br, end);

            //n回コピーし連結
            for (var i = 0; i < n; i++) {
                GA = GA.concat(BA);
                GB = GB.concat(BB);
            }

            //連結が終わったものを代入
            A = GA;
            B = GB;
        } else {
            //bad rootを探索
            //ペア数列システムのbad root探索を参考に、0をωとして扱うようにアレンジ
            var br = end - 1;
            while (B[br] >= B[end] || A[br] != Math.min(...A.slice(br)) || B[br] == 0) br--;

            //good partとbad partに分ける
            var GA = A.slice(0, br);
            var BA = A.slice(br, end);
            var GB = B.slice(0, br);
            var BB = B.slice(br, end);

            //上昇分
            var delta = A[end] - A[br];

            GA = GA.concat(BA);
            GB = GB.concat(BB);
            BA = BA.map(a => delta + a)

            //ラベルし直し
            BB[0] = B[end] - 1;

            //n-1回コピーし連結
            for (var i = 0; i < n - 1; i++) {
                GA = GA.concat(BA);
                GB = GB.concat(BB);
                BA = BA.map(a => delta + a);
            }

            //連結が終わったものを代入
            A = GA;
            B = GB;
        }
    }
    return n;
}


/*
    理想的なコンピュータで実行したら
    H[ψ_0(ε_{Ω_ω+1})×ω](8)ほどの数値をコンソール上に出力します
*/

console.log(calc(calc(calc(calc(calc(calc(calc(calc(6)))))))))
