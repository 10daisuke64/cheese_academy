# ラズパイでチーズの保存環境を監視してみた

## プロダクトの紹介

- 普段コーディングの仕事をしているので、手持ちのカードではなく、新しいカードを入手してチャレンジしよう、ということでRaspberry Piを注文
- Raspberry Pi4にBME280センサーモジュールを接続し、温度・湿度・気圧を測定
- Pi側のPythonのプログラムから、HTTP通信のPOSTメソッドを使って、JSONデータをWEBサーバーへ送信
- WEBサーバー側にはMySQLで作ったデータベースを用意しておきデータを格納
- JavaScriptでチーズの保存環境に適した温湿度かどうかを判定し、最新結果をブラウザに表示
- Pi側のPythonプログラムは1時間ごとのcronを回している

## 工夫した点，こだわった点

- 結果が表示されるまでの待ち時間にローディングアニメーションが出てくる
- 結果によってグラフの色や文字色を変更し、状況把握がしやすいようにした
- ただの温湿度計で終わるのはつまらないので、温湿度が一定条件を満たすとモーターが動いて弁が開放されて外気が入るなど、次のステップにいけたらと思う

## 苦戦した点，共有したいハマりポイントなど

- この手のUIを作ったのが初めてだったので、本当に円グラフでよかったのか？などの反省あり
- 基本的に[このサイト](http://independence-sys.net/main/?p=3860)と、やりたいことが一緒だったので参考にしたが、コードを拝借しただけでは動かず
- 個人用のレンタルサーバーで動かしたが、SSL化されているがためにPOSTメソッドでエラーが発生したため、urllib.requestモジュールを追加するなどしてハマった
- Raspberry Pi4にはデフォルトで、Python2系と3系が入っていて、3系で動かす場合には、"$ python3" のようにバージョンを明示的に記述する必要があったのでハマった
- そもそもPythonを触るのが初めてだったので全体的にハマった
- cronの書き方が間違っていて、1分ごとに回りはじめた時は焦った
- 10年ぶりのハンダ付けが下手くそすぎた
