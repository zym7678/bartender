// ===== DB =====
const DB={get(k){try{return JSON.parse(localStorage.getItem("cb_"+k))||[]}catch{return[]}},set(k,v){localStorage.setItem("cb_"+k,JSON.stringify(v))},_id(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)},today(){return new Date().toISOString().slice(0,10)}}

// ===== Seed =====
function seedSampleData(){if(DB.get("cabinet").length||DB.get("recipes").length)return
const spirits=[
{type:"金酒",brand:"添加利",openedDate:"2026-06-01",total:750,remaining:387,unit:"ml"},
{type:"波本威士忌",brand:"布克斯",openedDate:"2026-06-01",total:750,remaining:411,unit:"ml"},
{type:"黑麦威士忌",brand:"瑞顿黑麦",openedDate:"2026-06-01",total:750,remaining:584,unit:"ml"},
{type:"白朗姆酒",brand:"百加得",openedDate:"2026-06-01",total:750,remaining:482,unit:"ml"},
{type:"伏特加",brand:"绝对",openedDate:"2026-06-01",total:750,remaining:514,unit:"ml"},
{type:"龙舌兰酒",brand:"奥美加银",openedDate:"2026-06-01",total:750,remaining:676,unit:"ml"},
{type:"干邑白兰地",brand:"轩尼诗VS",openedDate:"2026-06-01",total:700,remaining:551,unit:"ml"},
{type:"皮斯科白兰地",brand:"秘鲁皮斯科",openedDate:"2026-06-01",total:700,remaining:353,unit:"ml"},
{type:"爱尔兰威士忌",brand:"尊美醇",openedDate:"2026-06-01",total:700,remaining:370,unit:"ml"},
{type:"卡沙萨酒",brand:"勒布隆",openedDate:"2026-06-01",total:750,remaining:700,unit:"ml"},
{type:"金巴利苦酒",brand:"金巴利",openedDate:"2026-06-01",total:700,remaining:608,unit:"ml"},
{type:"甜味美思",brand:"马天尼红",openedDate:"2026-06-01",total:750,remaining:386,unit:"ml"},
{type:"干味美思",brand:"马天尼干",openedDate:"2026-06-01",total:750,remaining:534,unit:"ml"},
{type:"君度橙酒",brand:"君度",openedDate:"2026-06-01",total:700,remaining:511,unit:"ml"},
{type:"橙味利口酒",brand:"君度",openedDate:"2026-06-01",total:700,remaining:549,unit:"ml"},
{type:"桃子利口酒",brand:"德库珀",openedDate:"2026-06-01",total:700,remaining:420,unit:"ml"},
{type:"咖啡利口酒",brand:"卡鲁瓦",openedDate:"2026-06-01",total:700,remaining:621,unit:"ml"},
{type:"绿查特酒",brand:"绿查特",openedDate:"2026-06-01",total:700,remaining:468,unit:"ml"},
{type:"Maraschino Liqueur",brand:"鲁克萨多",openedDate:"2026-06-01",total:700,remaining:571,unit:"ml"},
{type:"樱桃白兰地",brand:"鲁克萨多",openedDate:"2026-06-01",total:700,remaining:383,unit:"ml"},
{type:"安格斯特拉苦精",brand:"安高天娜",openedDate:"2026-06-01",total:200,remaining:175,unit:"ml"},
{type:"柠檬汁",brand:"新鲜柠檬",openedDate:"2026-06-01",total:200,remaining:158,unit:"ml"},
{type:"青柠汁",brand:"新鲜青柠",openedDate:"2026-06-01",total:200,remaining:103,unit:"ml"},
{type:"糖浆",brand:"莫林",openedDate:"2026-06-01",total:500,remaining:244,unit:"ml"},
{type:"红石榴糖浆",brand:"莫林",openedDate:"2026-06-01",total:500,remaining:365,unit:"ml"},
{type:"杏仁糖浆",brand:"莫林",openedDate:"2026-06-01",total:500,remaining:459,unit:"ml"},
{type:"苏打水",brand:"怡泉",openedDate:"2026-06-01",total:330,remaining:244,unit:"ml"},
{type:"汤力水",brand:"芬味树",openedDate:"2026-06-01",total:330,remaining:227,unit:"ml"},
{type:"姜汁汽水",brand:"芬味树",openedDate:"2026-06-01",total:330,remaining:241,unit:"ml"},
{type:"葡萄苏打水",brand:"芬味树",openedDate:"2026-06-01",total:330,remaining:229,unit:"ml"},
{type:"蔓越莓汁",brand:"优鲜沛",openedDate:"2026-06-01",total:330,remaining:238,unit:"ml"},
{type:"橙汁",brand:"鲜榨橙汁",openedDate:"2026-06-01",total:330,remaining:197,unit:"ml"},
{type:"番茄汁",brand:"Römerquelle",openedDate:"2026-06-01",total:300,remaining:182,unit:"ml"},
{type:"菠萝汁",brand:"都乐",openedDate:"2026-06-01",total:330,remaining:239,unit:"ml"},
{type:"葡萄柚汁",brand:"鲜榨葡萄柚",openedDate:"2026-06-01",total:330,remaining:311,unit:"ml"},
{type:"椰浆",brand:"佳乐",openedDate:"2026-06-01",total:330,remaining:134,unit:"ml"},
{type:"香槟酒",brand:"酩悦",openedDate:"2026-06-01",total:750,remaining:381,unit:"ml"},
{type:"普罗赛克起泡酒",brand:"普罗赛克DOC",openedDate:"2026-06-01",total:750,remaining:376,unit:"ml"},
{type:"Aperol",brand:"阿佩罗",openedDate:"2026-06-01",total:700,remaining:410,unit:"ml"},
{type:"咖啡",brand:"浓缩咖啡",openedDate:"2026-06-01",total:200,remaining:133,unit:"ml"},
{type:"蛋白",brand:"新鲜鸡蛋",openedDate:"2026-06-01",total:100,remaining:79,unit:"ml"},
{type:"苦艾酒",brand:"力加",openedDate:"2026-06-01",total:700,remaining:538,unit:"ml"},
{type:"伍斯特沙司",brand:"李派林",openedDate:"2026-06-01",total:150,remaining:130,unit:"ml"},
{type:"预调酸甜汁",brand:"自制酸甜汁",openedDate:"2026-06-01",total:500,remaining:437,unit:"ml"},
{type:"桃子果泥",brand:"莫林",openedDate:"2026-06-01",total:500,remaining:213,unit:"ml"},
{type:"薄荷叶",brand:"新鲜薄荷",openedDate:"2026-06-01",total:50,remaining:40,unit:"ml"},
{type:"砂糖",brand:"白砂糖",openedDate:"2026-06-01",total:300,remaining:217,unit:"ml"},
{type:"水",brand:"纯净水",openedDate:"2026-06-01",total:500,remaining:254,unit:"ml"}]
spirits.forEach(s=>{const i=DB.get("cabinet");i.push({id:DB._id(),...s});DB.set("cabinet",i)})
const recipes=[
{name:"沙滩风情",glass:"海波杯（直筒杯）",instructions:"将所有材料（伏特加、桃子利口酒、蔓越莓汁、橙汁）倒入加冰的高球杯中，轻搅，以橙片装饰。",garnish:"橙片",ingredients:[{name:"伏特加",amount:40,unit:"ml"},{name:"桃子利口酒",amount:20,unit:"ml"},{name:"蔓越莓汁",amount:60,unit:"ml"},{name:"橙汁",amount:30,unit:"ml"}]},
{name:"航空",glass:"鸡尾酒杯（三角杯）",instructions:"将金酒、柠檬汁、樱桃白兰地和紫罗兰利口酒与冰块一起摇匀，滤入冰镇鸡尾酒杯，以糖渍樱桃装饰。",garnish:"糖渍樱桃",ingredients:[{name:"金酒",amount:45,unit:"ml"},{name:"柠檬汁",amount:15,unit:"ml"},{name:"Maraschino Liqueur",amount:15,unit:"ml"}]},
{name:"老古巴",glass:"鸡尾酒杯（三角杯）",instructions:"将薄荷叶、白朗姆酒、糖浆、青柠汁和安格斯特拉苦精捣碎，加冰摇匀，Double滤入古典杯，顶部以普罗赛克起泡酒浮层，以薄荷和青柠装饰。",garnish:"普罗赛克起泡酒浮层，以薄荷和青柠",ingredients:[{name:"白朗姆酒",amount:60,unit:"ml"},{name:"糖浆",amount:30,unit:"ml"},{name:"青柠汁",amount:30,unit:"ml"},{name:"安格斯特拉苦精",amount:2,unit:"dash"},{name:"普罗赛克起泡酒",amount:60,unit:"ml"}]},
{name:"古典",glass:"古典杯（岩石杯）",instructions:"将方糖放入古典杯中，用苦精浸润，加入少许清水。捣碎至糖溶解。将杯中加满冰块，倒入波本威士忌。以橙皮扭片和装饰樱桃装饰。",garnish:"橙皮扭片和",ingredients:[{name:"波本威士忌",amount:45,unit:"ml"},{name:"安格斯特拉苦精",amount:2,unit:"dash"},{name:"砂糖",amount:5,unit:"ml"},{name:"水",amount:5,unit:"ml"}]},
{name:"迈泰",glass:"柯林斯杯（高杯）",instructions:"将暗色朗姆酒、白朗姆酒、青柠汁、橙味利口酒和杏仁糖浆与冰块一起摇匀，倒入加满碎冰的高杯，以薄荷枝和青柠装饰。",garnish:"薄荷枝和青柠",ingredients:[{name:"白朗姆酒",amount:30,unit:"ml"},{name:"杏仁糖浆",amount:15,unit:"ml"},{name:"橙味利口酒",amount:15,unit:"ml"},{name:"预调酸甜汁",amount:15,unit:"ml"}]},
{name:"阿美利加诺",glass:"柯林斯杯（高杯）",instructions:"古典杯中加冰，依次倒入金巴利苦酒、甜味美思和金汤力水，以橙片装饰。",garnish:"橙片",ingredients:[{name:"金巴利苦酒",amount:30,unit:"ml"},{name:"甜味美思",amount:30,unit:"ml"},{name:"苏打水",amount:60,unit:"ml"}]},
{name:"莫斯科骡子",glass:"铜马克杯",instructions:"将伏特加和青柠汁倒入铜马克杯加冰的杯中，姜汁汽水补满，轻搅，青柠片装饰。",garnish:"",ingredients:[{name:"伏特加",amount:60,unit:"ml"},{name:"青柠汁",amount:60,unit:"ml"},{name:"姜汁汽水",amount:240,unit:"ml"}]},
{name:"长岛冰茶",glass:"海波杯（直筒杯）",instructions:"海波杯中加冰，依次倒入伏特加、金酒、白朗姆酒、龙舌兰酒和君度橙酒，加入柠檬汁和糖浆，补满可乐（用于上色），以柠檬角装饰。",garnish:"柠檬角",ingredients:[{name:"伏特加",amount:15,unit:"ml"},{name:"金酒",amount:15,unit:"ml"},{name:"白朗姆酒",amount:15,unit:"ml"},{name:"龙舌兰酒",amount:15,unit:"ml"},{name:"君度橙酒",amount:15,unit:"ml"},{name:"柠檬汁",amount:20,unit:"ml"}]},
{name:"椰林飘香",glass:"柯林斯杯（高杯）",instructions:"crushed ice blender smooth. chilled glass, serve.",garnish:"",ingredients:[{name:"白朗姆酒",amount:60,unit:"ml"},{name:"椰浆",amount:60,unit:"ml"},{name:"菠萝汁",amount:90,unit:"ml"}]},
{name:"边车",glass:"鸡尾酒杯（三角杯）",instructions:"将干邑白兰地、橙味利口酒和柠檬汁与冰块一起摇匀，滤入糖边鸡尾酒杯，以橙皮扭片装饰。",garnish:"橙皮扭片",ingredients:[{name:"干邑白兰地",amount:50,unit:"ml"},{name:"君度橙酒",amount:20,unit:"ml"},{name:"柠檬汁",amount:20,unit:"ml"}]},
{name:"皮斯科酸酒",glass:"鸡尾酒杯（三角杯）",instructions:"将皮斯科白兰地、柠檬汁、糖浆和蛋白与冰块一起用力摇匀，滤入冰镇古典杯，苦精滴在表面。",garnish:"",ingredients:[{name:"皮斯科白兰地",amount:60,unit:"ml"},{name:"柠檬汁",amount:30,unit:"ml"},{name:"糖浆",amount:15,unit:"ml"},{name:"蛋白",amount:15,unit:"ml"}]},
{name:"浓缩咖啡马天尼",glass:"鸡尾酒杯（三角杯）",instructions:"将伏特加、咖啡利口酒、浓缩咖啡和糖浆与冰块一起摇匀，滤入冰镇的马天尼杯，以三颗咖啡豆装饰。",garnish:"三颗咖啡豆",ingredients:[{name:"伏特加",amount:50,unit:"ml"},{name:"咖啡利口酒",amount:20,unit:"ml"},{name:"糖浆",amount:10,unit:"ml"}]},
{name:"金普雷",glass:"马天尼杯（三角杯）",instructions:"将金酒和青柠汁与冰块一起摇匀，滤入冰镇鸡尾酒杯，以青柠片装饰。",garnish:"青柠片",ingredients:[{name:"金酒",amount:60,unit:"ml"},{name:"青柠汁",amount:15,unit:"ml"},{name:"糖浆",amount:15,unit:"ml"}]},
{name:"爱尔兰咖啡",glass:"爱尔兰咖啡杯",instructions:"爱尔兰咖啡杯中放入糖和爱尔兰威士忌，倒入热咖啡搅匀，鲜奶油铺于表面。",garnish:"",ingredients:[{name:"爱尔兰威士忌",amount:45,unit:"ml"},{name:"咖啡",amount:180,unit:"ml"},{name:"砂糖",amount:5,unit:"ml"},{name:"搅打奶油",amount:30,unit:"ml"}]},
{name:"戴克利",glass:"鸡尾酒杯（三角杯）",instructions:"将白朗姆酒、青柠汁和糖浆与冰块一起摇匀，滤入冰镇的鸡尾酒杯，以青柠片装饰。",garnish:"青柠片",ingredients:[{name:"白朗姆酒",amount:50,unit:"ml"},{name:"青柠汁",amount:20,unit:"ml"},{name:"糖浆",amount:15,unit:"ml"}]},
{name:"威士忌酸酒",glass:"古典杯（岩石杯）",instructions:"将波本威士忌、柠檬汁、糖浆和蛋白（可选）与冰块一起摇匀，滤入冰镇的古典杯，加冰块，以橙片和樱桃装饰。",garnish:"橙片和樱桃",ingredients:[{name:"波本威士忌",amount:45,unit:"ml"},{name:"柠檬汁",amount:20,unit:"ml"},{name:"糖浆",amount:15,unit:"ml"},{name:"蛋白",amount:15,unit:"ml"}]},
{name:"大都会",glass:"鸡尾酒杯（三角杯）",instructions:"将所有材料（伏特加、君度橙酒、蔓越莓汁、青柠汁）与冰块一起摇匀，滤入冰镇的马天尼杯，以橙皮扭片装饰。",garnish:"橙皮扭片",ingredients:[{name:"伏特加",amount:40,unit:"ml"},{name:"君度橙酒",amount:15,unit:"ml"},{name:"蔓越莓汁",amount:30,unit:"ml"},{name:"青柠汁",amount:10,unit:"ml"}]},
{name:"曼哈顿",glass:"鸡尾酒杯（三角杯）",instructions:"将波本威士忌（或黑麦威士忌）、甜味美思和苦精与冰块一起搅拌，滤入鸡尾酒杯，以糖渍樱桃装饰。",garnish:"糖渍樱桃",ingredients:[{name:"波本威士忌",amount:50,unit:"ml"},{name:"甜味美思",amount:20,unit:"ml"},{name:"安格斯特拉苦精",amount:2,unit:"dash"}]},
{name:"玛格丽特",glass:"鸡尾酒杯（三角杯）",instructions:"将青柠片擦拭杯口，让盐附着在杯缘。注意仅润湿外缘，在上面撒上盐。盐应留在杯口供饮用者取用，切勿混入酒液中。将龙舌兰酒、橙味利口酒和青柠汁与冰块一起摇匀，然后小心倒入杯中。",garnish:"",ingredients:[{name:"龙舌兰酒",amount:45,unit:"ml"},{name:"橙味利口酒",amount:20,unit:"ml"},{name:"青柠汁",amount:15,unit:"ml"}]},
{name:"马天尼",glass:"鸡尾酒杯（三角杯）",instructions:"将金酒和干味美思与冰块一起搅拌，滤入冰镇的鸡尾酒杯，以橄榄或柠檬皮扭片装饰。",garnish:"橄榄或柠檬皮扭片",ingredients:[{name:"金酒",amount:60,unit:"ml"},{name:"干味美思",amount:10,unit:"ml"}]},
{name:"新加坡司令",glass:"飓风杯",instructions:"将所有材料（金酒、樱桃利口酒、君度橙酒、必得利、柠檬汁、菠萝汁、红石榴糖浆、苦精）与冰块一起摇匀，倒入高球杯，石榴糖浆沉底，以菠萝和樱桃装饰。",garnish:"菠萝和樱桃",ingredients:[{name:"金酒",amount:30,unit:"ml"},{name:"樱桃白兰地",amount:15,unit:"ml"},{name:"君度橙酒",amount:7,unit:"ml"},{name:"红石榴糖浆",amount:10,unit:"ml"},{name:"柠檬汁",amount:15,unit:"ml"},{name:"苏打水",amount:60,unit:"ml"}]},
{name:"尼格罗尼",glass:"古典杯（岩石杯）",instructions:"将金酒、金巴利苦酒和甜味美思与冰块一起搅拌，滤入古典杯，以橙片装饰。",garnish:"橙片",ingredients:[{name:"金酒",amount:30,unit:"ml"},{name:"金巴利苦酒",amount:30,unit:"ml"},{name:"甜味美思",amount:30,unit:"ml"}]},
{name:"帕洛玛",glass:"柯林斯杯（高杯）",instructions:"海波杯中加冰，倒入龙舌兰酒和青柠汁，西柚汁和盐边补满，轻搅，西柚片装饰。",garnish:"",ingredients:[{name:"龙舌兰酒",amount:45,unit:"ml"},{name:"青柠汁",amount:15,unit:"ml"},{name:"葡萄苏打水",amount:90,unit:"ml"}]},
{name:"汤姆柯林斯",glass:"柯林斯杯（高杯）",instructions:"海波杯中加冰，倒入金酒、柠檬汁和糖浆，苏打水补满，轻搅，柠檬片和樱桃装饰。",garnish:"",ingredients:[{name:"金酒",amount:45,unit:"ml"},{name:"柠檬汁",amount:30,unit:"ml"},{name:"糖浆",amount:15,unit:"ml"},{name:"苏打水",amount:90,unit:"ml"}]},
{name:"血腥玛丽",glass:"古典杯（岩石杯）",instructions:"海波杯中加冰，倒入伏特加和番茄汁，加入柠檬汁、伍斯特沙司、塔巴斯科辣酱、盐和黑胡椒，轻搅。以芹菜和橄榄装饰。",garnish:"芹菜和橄榄",ingredients:[{name:"伏特加",amount:45,unit:"ml"},{name:"番茄汁",amount:90,unit:"ml"},{name:"柠檬汁",amount:10,unit:"ml"},{name:"伍斯特沙司",amount:3,unit:"ml"}]},
{name:"金汤力",glass:"海波杯（直筒杯）",instructions:"海波杯中加冰，倒入金酒，汤力水补满，轻搅，青柠角装饰。",garnish:"",ingredients:[{name:"金酒",amount:50,unit:"ml"},{name:"汤力水",amount:120,unit:"ml"}]},
{name:"萨泽拉克",glass:"古典杯（岩石杯）",instructions:"用苦艾酒润湿古典杯后倒出。将方糖和安格斯特拉苦精在杯中搅融，加冰倒入黑麦威士忌，轻搅，不滤直接饮用，以橙皮装饰。",garnish:"橙皮",ingredients:[{name:"黑麦威士忌",amount:45,unit:"ml"},{name:"安格斯特拉苦精",amount:2,unit:"dash"},{name:"苦艾酒",amount:5,unit:"ml"},{name:"砂糖",amount:3,unit:"ml"},{name:"水",amount:5,unit:"ml"}]},
{name:"海明威特别款",glass:"鸡尾酒杯（三角杯）",instructions:"将白朗姆酒、葡萄柚汁、柠檬汁和樱桃白兰地与冰块一起摇匀，滤入冰镇鸡尾酒杯，以樱桃装饰。",garnish:"樱桃",ingredients:[{name:"白朗姆酒",amount:45,unit:"ml"},{name:"葡萄柚汁",amount:30,unit:"ml"},{name:"青柠汁",amount:15,unit:"ml"},{name:"Maraschino Liqueur",amount:10,unit:"ml"}]},
{name:"凯匹林纳",glass:"古典杯（岩石杯）",instructions:"青柠切小块，放入杯中，加砂糖轻捣，倒入卡沙萨酒，加冰，轻搅。",garnish:"",ingredients:[{name:"卡沙萨酒",amount:60,unit:"ml"},{name:"青柠",amount:1,unit:"份"},{name:"砂糖",amount:10,unit:"ml"}]},
{name:"贝里尼",glass:"香槟笛形杯",instructions:"将桃子泥倒入冰镇的香槟笛形杯，缓缓倒入普罗赛克起泡酒，无需搅拌，以桃子片装饰。",garnish:"桃子片",ingredients:[{name:"普罗赛克起泡酒",amount:120,unit:"ml"},{name:"桃子果泥",amount:30,unit:"ml"}]},
{name:"莫吉托",glass:"海波杯（直筒杯）",instructions:"在玻璃杯中将新鲜薄荷叶和砂糖捣碎，加入青柠汁。倒入白朗姆酒，加入苏打水，将杯中加满碎冰。以薄荷枝和青柠角装饰。",garnish:"薄荷枝和青柠角",ingredients:[{name:"白朗姆酒",amount:45,unit:"ml"},{name:"青柠汁",amount:20,unit:"ml"},{name:"砂糖",amount:10,unit:"ml"},{name:"苏打水",amount:60,unit:"ml"},{name:"薄荷叶",amount:5,unit:"份"}]},
{name:"林荫大道",glass:"马天尼杯（三角杯）",instructions:"将波本威士忌、金巴利苦酒和甜味美思与冰块一起搅拌，滤入冰镇古典杯，以橙皮扭片装饰。",garnish:"橙皮扭片",ingredients:[{name:"波本威士忌",amount:45,unit:"ml"},{name:"金巴利苦酒",amount:30,unit:"ml"},{name:"甜味美思",amount:30,unit:"ml"}]},
{name:"阿佩罗橙光",glass:"葡萄酒杯",instructions:"放入几块冰块到两个杯中，加入50毫升阿佩罗苦酒。将普罗赛克起泡酒分到杯中，补满苏打水，可根据喜好。以橙片装饰。",garnish:"橙片",ingredients:[{name:"Aperol",amount:100,unit:"ml"},{name:"普罗赛克起泡酒",amount:150,unit:"ml"}]},
{name:"法式七十五",glass:"柯林斯杯（高杯）",instructions:"将金酒、砂糖和柠檬汁与冰块一起摇匀，滤入冰镇的柯林斯杯，补满香槟酒，轻轻搅拌。以橙片和糖渍樱桃装饰。",garnish:"橙片和糖渍樱桃",ingredients:[{name:"金酒",amount:45,unit:"ml"},{name:"柠檬汁",amount:15,unit:"ml"},{name:"砂糖",amount:10,unit:"ml"},{name:"香槟酒",amount:90,unit:"ml"}]},
{name:"最后一杯",glass:"鸡尾酒杯（三角杯）",instructions:"将金酒、绿查特酒、樱桃白兰地和青柠汁与冰块一起摇匀，滤入冰镇鸡尾酒杯。",garnish:"",ingredients:[{name:"绿查特酒",amount:30,unit:"ml"},{name:"Maraschino Liqueur",amount:30,unit:"ml"},{name:"青柠汁",amount:30,unit:"ml"},{name:"金酒",amount:30,unit:"ml"}]}]
recipes.forEach(r=>{const i=DB.get("recipes");i.push({id:DB._id(),...r,createdAt:DB.today()});DB.set("recipes",i)})}
function resetSampleData(){if(!confirm("清空所有数据并重新加载示例数据？"))return;Object.keys(localStorage).filter(k=>k.startsWith("cb_")).forEach(k=>localStorage.removeItem(k));seedSampleData();location.reload()}

// ===== Cabinet =====
function saveCabinet(id,type,brand,openedDate,total,remaining){const items=DB.get("cabinet");if(id){const idx=items.findIndex(i=>i.id===id);if(idx>-1)items[idx]={...items[idx],type,brand,openedDate,total,remaining}}else items.push({id:DB._id(),type,brand,openedDate,total,remaining,unit:"ml"});DB.set("cabinet",items);return items}
function deleteCabinet(id){if(!confirm("确定删除？"))return;DB.set("cabinet",DB.get("cabinet").filter(i=>i.id!==id));toast("已删除","ok")}
function getTypeSuggest(){return[...new Set(DB.get("cabinet").map(i=>i.type))]}

// ===== Recipes =====
function saveRecipe(id,name,glass,instructions,garnish,ingredients){const items=DB.get("recipes");if(id){const idx=items.findIndex(i=>i.id===id);if(idx>-1)items[idx]={...items[idx],name,glass,instructions,garnish,ingredients}}else items.push({id:DB._id(),name,glass,instructions,garnish,ingredients,createdAt:DB.today()});DB.set("recipes",items);return items}
function deleteRecipe(id){if(!confirm("确定删除？"))return;DB.set("recipes",DB.get("recipes").filter(i=>i.id!==id));toast("已删除配方","ok")}

// ===== Make / Check =====
function checkMissing(recipe){const cab=DB.get("cabinet");return recipe.ingredients.filter(ing=>{const match=cab.filter(c=>c.type===ing.name&&c.remaining>=ing.amount);return!match.length}).map(m=>({name:m.name}))}
function getAvailBrands(typeName,needAmt){return DB.get("cabinet").filter(c=>c.type===typeName&&c.remaining>=needAmt)}
let pendingMakeId=null;let brandSelections={}

function makeDrink(recipeId){const recipe=DB.get("recipes").find(x=>x.id===recipeId);if(!recipe)return;const miss=checkMissing(recipe);if(miss.length){toast("⚠️ 缺少 "+miss.map(m=>m.name).join("、")+"，换一杯吧","warn");return}
const multi=[];recipe.ingredients.forEach(ing=>{const b=getAvailBrands(ing.name,ing.amount);if(b.length>1)multi.push({name:ing.name,brands:b,amount:ing.amount,unit:ing.unit})});if(multi.length){pendingMakeId=recipeId;showBrandModal(recipe,multi)}else{executeMake(recipe,{})}}
function showBrandModal(recipe,multi){document.getElementById("brand-recipe-name").textContent="为「"+recipe.name+"」选择品牌";brandSelections={};const list=document.getElementById("brand-pick-list");list.innerHTML=multi.map(m=>{const sid="bs_"+m.name.replace(/\s/g,"");brandSelections[m.name]=m.brands[0].id;return"<div class=brand-pick-item><label>"+esc(m.name)+"（需要 "+m.amount+" "+m.unit+"）</label><select id="+sid+">"+m.brands.map(b=>"<option value="+esc(b.id)+">"+esc(b.brand)+"（剩 "+b.remaining+" ml）</option>").join("")+"</select></div>"}).join("");setTimeout(()=>{multi.forEach(m=>{const sel=document.getElementById("bs_"+m.name.replace(/\s/g,""));if(sel)sel.addEventListener("change",()=>{brandSelections[m.name]=sel.value})})},50);showModal("brand")}
function confirmBrandPick(){closeModal("brand");if(pendingMakeId)executeMake(DB.get("recipes").find(r=>r.id===pendingMakeId),brandSelections);pendingMakeId=null}
function executeMake(recipe,brandMap){const cab=DB.get("cabinet");recipe.ingredients.forEach(ing=>{const b=getAvailBrands(ing.name,ing.amount);let t;if(b.length===1)t=b[0];else t=cab.find(c=>c.id===brandMap[ing.name]);if(t)t.remaining=Math.round((t.remaining-ing.amount)*10)/10});DB.set("cabinet",cab);const log=DB.get("log");log.unshift({id:DB._id(),recipeName:recipe.name,recipeId:recipe.id,drankAt:new Date().toISOString(),ingredients:recipe.ingredients.map(i=>({...i}))});DB.set("log",log);toast("🥂 干杯！已扣减库存","ok")}

// ===== Log =====
function deleteLogEntry(id){if(!confirm("删除这条？"))return;DB.set("log",DB.get("log").filter(e=>e.id!==id));toast("已删除","ok")}
function clearLog(){if(!confirm("清空所有记录？"))return;DB.set("log",[]);toast("已清空","ok")}

// ===== Modal =====
function showModal(t){const el=document.getElementById("modal-"+t);if(el)el.classList.add("active")}
function closeModal(t){const el=document.getElementById("modal-"+t);if(el)el.classList.remove("active")}
document.addEventListener("click",function(e){if(e.target.classList.contains("modal-overlay"))e.target.classList.remove("active")})

// ===== Toast =====
function toast(m,t){t=t||"";const e=document.getElementById("toast")||function(){const d=document.createElement("div");d.id="toast";d.className="toast";document.body.appendChild(d);return d}();e.textContent=m;e.className="toast show "+t;clearTimeout(e._timer);e._timer=setTimeout(()=>e.classList.remove("show"),2500)}

// ===== Util =====
function esc(s){if(!s)return"";const d=document.createElement("div");d.textContent=s;return d.innerHTML}
function getPage(){const p=location.pathname.split("/").pop().toLowerCase();return p.replace(".html","")||"index"}
function highlightNav(){document.querySelectorAll("nav a").forEach(a=>{const h=a.getAttribute("href").toLowerCase().replace(".html","");a.classList.toggle("active",h===getPage()||(getPage()==="index"&&h===""))})}

// ===== Init seed on first load =====
seedSampleData()