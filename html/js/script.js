
$(function() {
  // JSONの処理
  $.getJSON("https://daisuke64.me/t_e_s_t/pitemp/sensorvalues.php",function(json){

    // -------------------------
    // 配列のソート
    // -------------------------
    function compare( a, b ){
      var r = 0;
      if( a.id < b.id ){ r = 1; }
      else if( a.id > b.id ){ r = -1; }
      return r;
    }
    json.sort( compare );


    // -------------------------
    // 最終更新日の処理
    // -------------------------
    var latest_date = json[0].datetime + " 更新";
    $("#js-date").text(latest_date);


    // -------------------------
    // 温度の処理
    // -------------------------
    var $temp_box = $("#js-temp");

    // ローディングの停止
    $temp_box.siblings(".loader").hide();

    // 00
    var latest_temp = parseFloat(json[0].temp);
    // 00.0℃
    var latest_temp_point = latest_temp.toFixed() + "<span class='small'>." + latest_temp.toFixed(1).slice(-1) + "&#x2103;</span>";

    // 温度をパーセンテージへ変換 -10℃ = 0% , 30℃ = 100% とした場合
    var latest_temp_percent = (latest_temp + 10)/40*100;

    // コンディション判定
    if ( latest_temp < 5 ) {
      var temp_judgement = "低温注意";
      var temp_judgement_color = "#4293f7";
    } else if ( latest_temp >= 5 && latest_temp < 10 ) {
      var temp_judgement = "良好";
      var temp_judgement_color = "#50fd3b";
    } else if ( latest_temp >= 10 && latest_temp < 15 ) {
      var temp_judgement = "少し暑い";
      var temp_judgement_color = "#ffd61a";
    } else {
      var temp_judgement = "高温注意";
      var temp_judgement_color = "#fd3b3b";
    }

    // 円グラフの表示の準備
    var temp_box_replace = '<div id="js-temp-chart" data-dimension="150" data-text="' + latest_temp_point + '" data-info="' + temp_judgement + '" data-width="20" data-fontsize="32" data-percent="' + latest_temp_percent + '" data-fgcolor="' + temp_judgement_color + '" data-bgcolor="#f2f2f2" class="circliful"></div>';
    $temp_box.html(temp_box_replace);

    // 円グラフ表示の実行・文字色変更
    $("#js-temp-chart").circliful();
    $("#js-temp-chart").find(".circle-info").css("color",temp_judgement_color);


    // -------------------------
    // 湿度の処理
    // -------------------------
    var $hum_box = $("#js-hum");

    // ローディングの停止
    $hum_box.siblings(".loader").hide();

    // 00
    var latest_hum = parseFloat(json[0].hum);
    // 00.0%
    var latest_hum_percent = latest_hum.toFixed() + "<span class='small'>." + latest_hum.toFixed(1).slice(-1) + "%</span>";

    // コンディション判定
    if ( latest_hum >= 90 ) {
      var hum_judgement = "水分過多注意";
      var hum_judgement_color = "#4293f7";
    } else if ( latest_hum < 90 && latest_hum >= 75 ) {
      var hum_judgement = "良好";
      var hum_judgement_color = "#50fd3b";
    } else if ( latest_hum < 75 && latest_hum > 55 ) {
      var hum_judgement = "少し乾燥";
      var hum_judgement_color = "#ffd61a";
    } else {
      var hum_judgement = "乾燥注意";
      var hum_judgement_color = "#fd3b3b";
    }

    // 円グラフの表示の準備
    var hum_box_replace = '<div id="js-hum-chart" data-dimension="150" data-text="' + latest_hum_percent + '" data-info="' + hum_judgement + '" data-width="20" data-fontsize="32" data-percent="' + latest_hum + '" data-fgcolor="' + hum_judgement_color + '" data-bgcolor="#f2f2f2" class="circliful"></div>';
    $hum_box.html(hum_box_replace);

    // 円グラフ表示の実行・文字色変更
    $("#js-hum-chart").circliful();
    $("#js-hum-chart").find(".circle-info").css("color",hum_judgement_color);


  });
});
