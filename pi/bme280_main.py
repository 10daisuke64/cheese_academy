#coding: utf-8
 
import bme280_custom
import datetime
from web import uploadSensorValues
 
#センサー値をカンマ区切りで取得
csv = bme280_custom.readData()
list = csv.split(",")
 
#カンマ区切りを別々の変数に格納
press = list[0]
temp = list[1]
hum = list[2]
 
#それぞれを表示
print(temp)
print(hum)
print(press)
 
#webへPOST
uploadSensorValues(temp,hum,press);
