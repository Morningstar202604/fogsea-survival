// v0.7.1 场景补写·老K线（上）：s1~s4
export const ADD_LK1 = {
  'laok_s1_pact/pact': [
    { text: '逐条追问：每条规矩，背后是什么事',
      requires: { skillLevel: { knowledge: 1 } },
      outcomes: [{ text: '他沉默了很久，讲了两个名字。一个死于生水，一个死在夜里替人寻猫。「记住了？」他问。你点头。这三条规矩从今天起有了重量——它们不是条款，是墓志铭。',
        effects: { sanity: -2, relNpc: 'laok', relDelta: 3, setFlags: ['lk_rules_story'], skillXp: { knowledge: 6 } }, goto: 'fire' }] },
    { text: '加第四条：「谁病了，另一个管到底」',
      outcomes: [{ text: '他扳到一半的手指停在半空，看了你足足三秒。「……行。」他说得很轻，像怕说重了会碎。——这一条不在任何向导手册里。这是把后背交给对方的规矩。',
        effects: { relNpc: 'laok', relDelta: 6, setFlags: ['lk_clause_four'], skillXp: { social: 6 } }, goto: 'fire' }] },
    { text: '伸出三根手指逐一碰回去，像击掌那样',
      outcomes: [{ text: '他愣了一下，随即咧嘴笑了——那是你第一次见他笑。「山里结拜都这么干。」他胡扯，但你看见他把伸出的手指又收回去擦了擦掌心，才重新跟你碰了一次。',
        effects: { relNpc: 'laok', relDelta: 5, sanity: 3, skillXp: { social: 5 } }, goto: 'fire' }] },
  ],
  'laok_s1_pact/fire': [
    { text: '装睡，把翻身的动静留给他体面',
      outcomes: [{ text: '你控制着呼吸的节奏，一动没动。黑暗里他坐了很久，最后极轻地叹了口气躺回去。有些噩梦不需要观众，有些陪伴不需要被知道。',
        effects: { relNpc: 'laok', relDelta: 4, skillXp: { social: 4 } } }] },
  ],
  'laok_s1_pact/dawn': [
    { text: '把自己打的绳结全拆掉，让他重教一遍',
      outcomes: [{ text: '「行啊，」他挑眉，「肯拆，说明肯学。」他教得比昨天慢了一倍，每一个扣都让你亲手过三遍。日头爬上篱笆的时候，你的手已经能不看绳子打出一个合格的活扣了。',
        effects: { skillXp: { craft: 6, survival: 3 } } }] },
  ],
  'laok_s2_gift/guide': [
    { text: '掏出本子，把三样技巧连图带注记下来',
      outcomes: [{ text: '导向槽画成了剖面图，活结配了步骤箭头。他凑过来看了一眼，眉毛挑得老高：「……你这是要出书？」嘴上损着，手上却把你画错的一处掰正了——教人的人，最见不得笔记潦草。',
        effects: { setFlags: ['lk_notes'], skillXp: { knowledge: 6, craft: 3 } } }] },
  ],
  'laok_s2_gift/tip': [
    { text: '问他：「烟打转的时候，该往哪儿跑」',
      outcomes: [{ text: '火堆噼啪了一声。他没有立刻回答，久到你以为他不会答了。「往没人的地方跑。」他终于开口，声音平得反常，「别喊我，别回头，别管我。」——这是四句口诀之外，他用不上也不希望你用上的第五句。',
        effects: { sanity: -2, relNpc: 'laok', relDelta: 5, skillXp: { survival: 5, knowledge: 3 } } }] },
  ],
  'laok_s3_photo/glance': [
    { text: '把照片翻过去，只让他看背面那行字',
      outcomes: [{ text: '他凑近了看，呼吸停了一拍——褪色的钢笔字迹，是他自己的。他直起身，眼神复杂地看了你很久：「你收着它多久了？」「捡到那天起。」「……谢了。」他把照片还给你，放回本子的动作轻得像放一块易碎品。',
        effects: { relNpc: 'laok', relDelta: 4, skillXp: { social: 4 } }, goto: 'split' }] },
  ],
  'laok_s3_photo/split': [
    { text: '把饼对半掰开，两块半换着吃',
      outcomes: [{ text: '「搞什么名堂？」「对半分的对半分。」他瞪着你，忽然低声骂了一句什么，把自己那半也掰了一块塞过来。两张饼换来换去，最后谁也没算清谁吃了多少——这大概就是他要的那个字：家。',
        effects: { relNpc: 'laok', relDelta: 5, hunger: 8, sanity: 3, skillXp: { social: 5 } } }] },
  ],
  'laok_s3_photo/names': [
    { text: '只说了四个字：「都在等你」',
      outcomes: [{ text: '他握着水壶的手紧了一下，没有追问。蒸汽漫上来，模糊了他点头的样子。——你知道他听懂了：不说名字，是因为每个名字都要活着去认。',
        effects: { sanity: 2, relNpc: 'laok', relDelta: 3, skillXp: { social: 3 } }, goto: 'watch' }] },
  ],
  'laok_s3_photo/watch': [
    { text: '把石子揣进贴胸的口袋',
      outcomes: [{ text: '「放兜里就完了？」他不满，「贴胸口。哨兵的心跳离岗哨最近。」你依言换了地方。冰凉的石头贴着布料，慢慢焐出了温度——从今晚起，这个家有两个人轮流醒着。',
        effects: { relNpc: 'laok', relDelta: 5, setFlags: ['lk_sentinel_stone'], skillXp: { social: 4 } } }] },
  ],
  'laok_s4_past/ember': [
    { text: '接过画，仔细抚平折角再递还给他',
      requires: { rel: { npc: 'laok', min: 25 } },
      outcomes: [{ text: '他的手指在你抚过的地方停了停。蜡笔的颜色在火光下微微发亮，三个小人的手拉得很紧。「她画人的时候，」他突然说，「从来不画耳朵。我说过她一次，后来再没提过。」——信任到某个刻度，人才会把最细的褶皱翻开给你看。',
        effects: { relNpc: 'laok', relDelta: 5, sanity: 3, skillXp: { social: 5 } }, goto: 'lesson' }] },
    { text: '往火里添了根柴，让火烧得更稳些',
      outcomes: [{ text: '你没有接话，只是起身添了柴。火星升起来，把那张蜡笔画照得更亮了一些。他看着火，把没说完的后半句咽了回去，肩膀却松了下来——有些倾听，是用柴火代替语言的。',
        effects: { relNpc: 'laok', relDelta: 3, skillXp: { survival: 3, social: 3 } }, goto: 'lesson' }] },
  ],
  'laok_s4_past/lesson': [
    { text: '指着另一颗星问：「那颗呢？也叫得出吗」',
      outcomes: [{ text: '「贪心。」他笑骂一声，却还是顺着你的手指望了过去，「那是织女。跟牛郎隔着一条河——你看，星星也得守规矩，越界就得遭灾。」他讲星的时候，声音里有了一种你在末世里从未听过的东西：闲适。',
        effects: { relNpc: 'laok', relDelta: 4, setFlags: ['lk_star_learned'], sanity: 4, skillXp: { knowledge: 6 } } }] },
  ],
  'laok_s4_past/promise': [
    { text: '认真地问：「闺女叫什么名字」',
      outcomes: [{ text: '他明显怔了一下——这些天他叫她「闺女」，别人也是。他清了清嗓子，一字一顿地说了，两个字，说得极郑重，像在登记一件要紧的物资。「记住了？」「记住了。到时候我叫她名字敬酒。」他别过脸去，半天，闷闷地「嗯」了一声。',
        effects: { relNpc: 'laok', relDelta: 6, setFlags: ['lk_girl_name'], sanity: 3, skillXp: { social: 5 } } }] },
  ],
};
