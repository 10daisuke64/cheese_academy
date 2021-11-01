import json
import urllib.request

from datetime import datetime

def uploadSensorValues(temp, hum, press):

    url = 'https://daisuke64.me/t_e_s_t/pitemp/sensorvalues.php'

    sensorsdata = {'datetime':datetime.now().strftime("%Y/%m/%d %H:%M:%S"),'temp':temp,'hum':hum,'press':press}

    print(json.dumps(sensorsdata))

    headers = {'content-type': 'application/json'}

    req = urllib.request.Request(url, json.dumps(sensorsdata).encode(), headers)
    with urllib.request.urlopen(req) as res:
        body = res.read()

    pass