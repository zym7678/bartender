// ===== DB =====
const DB={get(k){try{return JSON.parse(localStorage.getItem("cb_"+k))||[]}catch{return[]}},set(k,v){localStorage.setItem("cb_"+k,JSON.stringify(v))},_id(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)},today(){return new Date().toISOString().slice(0,10)}}

// ===== Seed =====
function seedSampleData(){if(DB.get("cabinet").length||DB.get("recipes").length)return
const spirits=[{type:"金酒",brand:"孟买蓝宝石",openedDate:"2026-03-10",total:750,remaining:620,unit:"ml"},{type:"金酒",brand:"添加利",openedDate:"2026-05-01",total:750,remaining:750,unit:"ml"},{type:"威士忌",brand:"杰克丹尼",openedDate:"2026-02-15",total:700,remaining:430,unit:"ml"},{type:"威士忌",brand:"尊美醇",openedDate:"2026-04-20",total:700,remaining:700,unit:"ml"},{type:"白朗姆酒",brand:"百加得",openedDate:"2026-01-08",total:750,remaining:280,unit:"ml"},{type:"伏特加",brand:"绝对",openedDate:"2026-03-22",total:750,remaining:550,unit:"ml"},{type:"龙舌兰",brand:"奥美加",openedDate:"2026-05-15",total:750,remaining:720,unit:"ml"},{type:"甜味美思",brand:"马天尼红",openedDate:"2026-04-01",total:750,remaining:500,unit:"ml"},{type:"干味美思",brand:"马天尼干",openedDate:"2026-04-01",total:750,remaining:680,unit:"ml"},{type:"橙皮利口酒",brand:"君度",openedDate:"2026-02-20",total:700,remaining:410,unit:"ml"},{type:"苦精",brand:"安高天娜",openedDate:"2025-12-01",total:200,remaining:160,unit:"ml"},{type:"青柠汁",brand:"新鲜青柠",openedDate:DB.today(),total:200,remaining:200,unit:"ml"},{type:"柠檬汁",brand:"新鲜柠檬",openedDate:DB.today(),total:200,remaining:200,unit:"ml"},{type:"糖浆",brand:"莫林",openedDate:"2026-01-15",total:500,remaining:350,unit:"ml"},{type:"苏打水",brand:"怡泉",openedDate:"2026-06-10",total:330,remaining:330,unit:"ml"},{type:"番茄汁",brand:"Römerquelle",openedDate:"2026-06-01",total:300,remaining:300,unit:"ml"},{type:"金巴利",brand:"金巴利",openedDate:"2026-03-05",total:700,remaining:460,unit:"ml"}]
spirits.forEach(s=>{const i=DB.get("cabinet");i.push({id:DB._id(),...s});DB.set("cabinet",i)})
const recipes=[{name:"尼格罗尼",glass:"古典杯",instructions:"将所有配料加冰搅拌约20秒，滤入古典杯加冰。橙皮装饰。",garnish:"橙皮",ingredients:[{name:"金酒",amount:30,unit:"ml"},{name:"金巴利",amount:30,unit:"ml"},{name:"甜味美思",amount:30,unit:"ml"}]},{name:"马天尼",glass:"马天尼杯",instructions:"加冰搅拌金酒和干味美思约20秒，滤入冰过的马天尼杯。",garnish:"橄榄或柠檬皮",ingredients:[{name:"金酒",amount:60,unit:"ml"},{name:"干味美思",amount:10,unit:"ml"}]},{name:"古典",glass:"古典杯",instructions:"杯中放糖浆和苦精，加大块冰，倒入威士忌搅拌。橙皮装饰。",garnish:"橙皮",ingredients:[{name:"威士忌",amount:60,unit:"ml"},{name:"糖浆",amount:5,unit:"ml"},{name:"苦精",amount:2,unit:"dash"}]},{name:"莫吉托",glass:"海波杯",instructions:"青柠、薄荷和糖浆捣压，加碎冰，倒朗姆酒，苏打水补满。",garnish:"薄荷枝",ingredients:[{name:"白朗姆酒",amount:45,unit:"ml"},{name:"青柠汁",amount:20,unit:"ml"},{name:"糖浆",amount:15,unit:"ml"},{name:"苏打水",amount:80,unit:"ml"}]},{name:"威士忌酸",glass:"酸酒杯",instructions:"所有材料加冰用力摇约15秒，滤入冰过的酸酒杯。",garnish:"樱桃",ingredients:[{name:"威士忌",amount:50,unit:"ml"},{name:"柠檬汁",amount:25,unit:"ml"},{name:"糖浆",amount:15,unit:"ml"}]},{name:"玛格丽特",glass:"玛格丽特杯",instructions:"杯口蘸盐边。所有材料加冰摇匀滤入。",garnish:"盐边+青柠角",ingredients:[{name:"龙舌兰",amount:45,unit:"ml"},{name:"橙皮利口酒",amount:20,unit:"ml"},{name:"青柠汁",amount:15,unit:"ml"}]},{name:"金汤力",glass:"海波杯",instructions:"加冰，倒金酒，苏打水补满，轻搅。",garnish:"青柠角",ingredients:[{name:"金酒",amount:50,unit:"ml"},{name:"苏打水",amount:120,unit:"ml"}]},{name:"得其利",glass:"鸡尾酒杯",instructions:"所有材料加冰用力摇匀，滤入冰过的鸡尾酒杯。",garnish:"",ingredients:[{name:"白朗姆酒",amount:50,unit:"ml"},{name:"青柠汁",amount:20,unit:"ml"},{name:"糖浆",amount:15,unit:"ml"}]},{name:"血腥玛丽",glass:"海波杯",instructions:"加冰倒入所有材料轻轻摇匀，滤入装冰杯中。",garnish:"芹菜杆+柠檬角",ingredients:[{name:"伏特加",amount:45,unit:"ml"},{name:"番茄汁",amount:90,unit:"ml"},{name:"柠檬汁",amount:10,unit:"ml"}]}]
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
