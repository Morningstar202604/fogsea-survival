// v0.7.1 第二轮补写：中段关键拍再添一选
import { readFileSync, writeFileSync } from 'node:fs';

const P = 'assets/resources/configs/scenes.json';
let raw = readFileSync(P, 'utf8');
const bom = raw.charCodeAt(0) === 0xFEFF;
if (bom) raw = raw.slice(1);
const j = JSON.parse(raw);

const ADD = {
  'duoduo_s3_letters/dusk': [
    { text: '把残页凑近火光，辨认水渍下晕开的字',
      requires: { skillLevel: { knowledge: 2 } },
      outcomes: [{ text: '水渍晕开的地方，你辨出了半个「航」字，和一小截虚线——那不是装饰，是航线。你不动声色地把残页折好还给她：「等你能念整句了，它就是个宝贝。」她似懂非懂地抱紧了课本。',
        effects: { sanity: 2, skillXp: { knowledge: 6 } } }] },
  ],
  'duoduo_s4_bear/hug': [
    { text: '郑重其事地给熊也安排岗位：「它管看家」',
      outcomes: [{ text: '她立刻把熊摆在正对门的窗台上，调整了三次角度，让那只缺口的扣子眼睛正好盯着篱笆。「站好岗哦。」她压低声音叮嘱。从这天起，你家有了第三名住户，编制：门卫。',
        effects: { relNpc: 'kid', relDelta: 4, sanity: 3, skillXp: { social: 4 } } }] },
  ],
  'duoduo_s7_shelter/watch': [
    { text: '搓了一根草绳圈成环，套在她手腕上',
      outcomes: [{ text: '「怕的时候就转它。」你说，「绳子在，承诺就在。」她低头转了两圈，忽然抬起头：「那哥哥你也戴。」——于是这个家里多了两条一模一样的草绳，一条大人尺寸，一条孩子尺寸。',
        effects: { relNpc: 'kid', relDelta: 5, setFlags: ['dd_rope_ring'], sanity: 3, skillXp: { craft: 3, social: 3 } } }] },
  ],
  'laok_s3_photo/names': [
    { text: '讲完后轻声问：「你弟弟……叫什么？」',
      outcomes: [{ text: '他握着照片的手紧了紧。「阿远。」他说。这两个字他好像很久没大声说过了，说完自己怔了一下，又低低重复了一遍，「——阿远。」名字被说出来的时候，死去的人才真正活过。',
        effects: { sanity: 3, relNpc: 'laok', relDelta: 5, skillXp: { knowledge: 3, social: 3 } }, goto: 'watch' }] },
  ],
  'laok_s4_past/lesson': [
    { text: '借着星光，把北斗的形状描进本子里',
      outcomes: [{ text: '七颗点，三笔连线，旁边注上「勺口延长五倍」。他探头看了一眼你的手绘，难得没有损你，只是用炭条在角上补了个小小的箭头标着北。「这样，」他说，「我教的就不只在你脑子里了。」',
        effects: { skillXp: { knowledge: 4, craft: 4 } } }] },
  ],
  'laok_s6_secret/letter': [
    { text: '替他读出声——只读到抬头两个字就停下',
      outcomes: [{ text: '「弟——」你就停在这里，把信纸递了过去。剩下的字他自己读了，读得很慢。读完他没有哭，只是把信折好贴身收了，然后极用力地拍了拍你的肩。有些代读，读到称呼就够了。',
        effects: { relNpc: 'laok', relDelta: 6, sanity: -2, skillXp: { social: 4 } } }] },
  ],
  'laok_s7_plan/night': [
    { text: '朝着兽群吼一嗓子，替自己壮胆',
      requires: { skillLevel: { combat: 1 } },
      outcomes: [
        { weight: 70, text: '人声撕开兽潮的嘶吼的那一瞬间，你听见自己的心跳落回了胸腔里。老K在旁边骂了句「疯子」，嗓门却比你还大——两个疯子的吼声叠在一起，居然把最近那头逼得顿了半步。',
          effects: { sanity: 5, skillXp: { combat: 5 } } },
        { weight: 30, text: '吼声出口的瞬间你就后悔了——黑压压的洪流里，十几颗歪着的头同时转向了你。老K一把把你按回掩体后：「想活着就把嘴闭上！」冷汗浸透了后背。',
          effects: { sanity: -6, hp: -4 } },
      ] },
  ],
  'laok_s7_plan/stubborn': [
    { text: '在心里默数呼吸，从一数到一千',
      outcomes: [{ text: '一，二，三……外面的天崩地裂被数字隔在了很远的地方。数到六百多的时候你数乱了，索性从头再来。数完第二个一千，鸡叫了头遍。——撑过去的方法从来不高深，就是把一夜拆成一万个可以数完的一。',
        effects: { sanity: 4, skillXp: { survival: 4 } } }] },
  ],
  'laok_s8_oath/repair': [
    { text: '提议把缺口栅栏改成可拆卸的活扣结构',
      requires: { skillLevel: { survival: 1 } },
      outcomes: [{ text: '「平时拆下来当桥板，兽潮时三分钟装回去。」他围着缺口转了一圈，拿钉子敲敲木桩试牢度，最后点头：「行，就这么改——向导搭营地也这思路，路要能走，也得能断。」',
        effects: { relNpc: 'laok', relDelta: 3, skillXp: { craft: 5, survival: 3 } } }] },
  ],
  'laok_s2_gift/tip': [
    { text: '抓一把湿草，学着他的样子撒上去',
      outcomes: [{ text: '烟起来了，歪歪扭扭往一边倒。「手腕压低，风向要从掌心感觉。」他捏着你的手腕调了个角度。第二把烟直直升了三尺才散。「有点样子了。」他说得吝啬，眼里的笑却很满。',
        effects: { skillXp: { survival: 5, knowledge: 3 } } }] },
  ],
  'duoduo_s8_dawn/crane': [
    { text: '问她：「纸鹤要飞去哪儿呀」',
      outcomes: [{ text: '她想了想，很认真地回答：「先飞去妈妈那儿报个信，再飞回来接我们。」说完她自己把纸鹤捧到窗口，松开手——纸鹤晃晃悠悠滑了两米，落在篱笆上。她一点也不失望：「它说了，等直升机一起飞。」',
        effects: { sanity: 4, relNpc: 'kid', relDelta: 3, skillXp: { social: 3 } } }] },
  ],
};

const nodeIndex = new Map();
for (const sc of j.scenes) nodeIndex.set(sc.id, new Map(sc.nodes.map(n => [n.id, n])));
let added = 0; const errors = [];
for (const [key, choices] of Object.entries(ADD)) {
    const slash = key.indexOf('/');
    const nd = nodeIndex.get(key.slice(0, slash))?.get(key.slice(slash + 1));
    if (!nd) { errors.push(key); continue; }
    for (const c of choices) {
        if (nd.choices.some(x => x.text === c.text)) continue;
        nd.choices.push(structuredClone(c)); added++;
    }
}
if (errors.length) { console.error('MISSING:', errors); process.exit(1); }
writeFileSync(P, (bom ? '\uFEFF' : '') + JSON.stringify(j, null, 2) + '\n', 'utf8');
console.log('round2 added:', added);
let tc = 0, tn = 0; const thin = [];
for (const sc of j.scenes) for (const nd of sc.nodes) {
    tn++; tc += nd.choices.length;
    if (nd.choices.length < 2) thin.push(sc.id + '/' + nd.id);
}
console.log(`total: ${tc}/${tn}, avg ${(tc / tn).toFixed(1)}, <2: ${thin.length}`);
