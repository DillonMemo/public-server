# env.dev
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=dillon
DB_PASSWORD=12345
DB_NAME=public-server

COIN_MARKETCAP_API_KEY=f1872f4c-702f-4b06-be7c-61cf3767a89c

---

워커 - 커먼 - 가격낮은순
워커 - 커먼 - 가격높은순
워커 - 커먼 - 최근등록순

워커 - 언커먼 - 가격낮은순
워커 - 언커먼 - 가격높은순
워커 - 언커먼 - 최근등록순

워커 - 레어 - 가격낮은순
워커 - 레어 - 가격높은순
워커 - 레어 - 최근등록순

워커 - 에픽 - 가격낮은순
워커 - 에픽 - 가격높은순
워커 - 에픽 - 최근등록순

(12 * 4) * 20(page) = 48번 api request

시속 => 분속 변환
5km/h => 5000m/h
ex) 
워커 유저 40% > 0.4
조거 유저 30% > 0.3
러너 유저 10% > 0.1
트레이너 유저 20% > 0.2
계산공식)
워커 : ((15시 10분 - 15시 5분) / 3000) * 0.4
조거 : ((15시 10분 - 15시 5분) / 6000) * 0.3
러너 : ((15시 10분 - 15시 5분) / 10000) * 0.1
트레이너 : ((15시 10분 - 15시 5분) / 5000) * 0.2

# param

특정 상품 Detail 예제: [https://apilb.stepn.com/run/orderdata?orderId=313441986&sessionID=Ru8WAboN3TQIPdBW%3A1681027803391%3A123917&timestamp=1681027828954]

```json
// 상품이 판매중 일 경우
{"code":0,"data":{"id":105028746651,"state":1230,"type":3,"dataID":100112,"chain":103,"level":8,"quality":1,"hp":100,"isRun":false,"remain":320,"attrs":[16,72,50,59,0,0,0,0,0,0,0,0],"extAttrs":[],"endTime":0,"upLeveTime":32400000,"coolDownE":86400000,"canSend":false,"price":0,"speedMin":223,"speedMax":556,"breed":2,"breedT":1680864485625,"otd":825985634,"hpLimit":100,"isTest":false,"shoeImg":"3/36/m218710_88ff1e9730ff88ddffff1689ea88ff1e3188_67.png","lifeRatio":10000,"totalGmt":0,"category":0,"relatives":[{"type":1,"otd":110098893,"dataId":100069,"img":"0/22/m2186e5_0c70ef00e42fa355efe011d4faa3d1e32471_67.png","shoeId":101377045647},{"type":1,"otd":672548571,"dataId":100107,"img":"22/29/m21870b_bfcdcd5b88ff8dbb1bffd111ffd93ae43809_67.png","shoeId":84545989461},{"type":2,"otd":405214582,"dataId":100117,"img":"32/33/m218715_b4b12b23a2618863df66aefe16d6a1112286_67.png","shoeId":129877753041},{"type":2,"otd":583024323,"dataId":100064,"img":"27/19/m2186e0_52dd1a2b2cf563164e357179564488cb7b77_67.png","shoeId":102500432543},{"type":2,"otd":385527262,"dataId":100112,"img":"25/11/m218710_1c83ffb165ffaf472e46d4ffb6de160ff724_67.png","shoeId":144522622419}],"holes":[{"index":0,"type":1,"quality":0,"price":1000,"dataID":0,"gemId":0,"addv":0,"gAddv":0,"hAddv":0},{"index":1,"type":1,"quality":-1,"price":0,"dataID":0,"gemId":0,"addv":0,"gAddv":0,"hAddv":0},{"index":2,"type":1,"quality":-1,"price":0,"dataID":0,"gemId":0,"addv":0,"gAddv":0,"hAddv":0},{"index":3,"type":2,"quality":-1,"price":0,"dataID":0,"gemId":0,"addv":0,"gAddv":0,"hAddv":0}]}}
```
```json
// 상품이 판매중이 아닐 경우
{"code":212017,"msg":"Order does not exist"}
```


type 
- 600: sneakers
- 601: sneakers | walker
- 602: sneakers | jogger
- 603: sneakers | runner
- 604: sneakers | trainer
- 301: shoeboxes
- 614: rainbow
- 615: special skin

quality
- 1: common


## figma plugin server