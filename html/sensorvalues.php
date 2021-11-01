<?php
// 提出用データはデータベース情報を伏せています
$pdo = new PDO('mysql:host=############;dbname=############;charset=utf8','############','############');

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $st = $pdo->query("SELECT * FROM sensorvalues");
    echo json_encode($st->fetchAll(PDO::FETCH_ASSOC));
    break;

  case 'POST':
    $in = json_decode(file_get_contents('php://input'), true);
    // file_get_contents => JSONでPOSTされた値の取り出し
    if (!isset($in['id']))
    {
      $st = $pdo->prepare("INSERT INTO sensorvalues(datetime,temp,hum,press) VALUES(:datetime,:temp,:hum,:press)");
    }
    $st->execute($in);

    echo json_encode("normal end");

    break;
}
?>
