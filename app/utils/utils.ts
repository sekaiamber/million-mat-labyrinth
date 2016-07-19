import {Controller} from 'corona'

export function ExposedMethod(target: Controller, propertyKey: string, descriptor: PropertyDescriptor) {
  let init = target.init;
  
  target.init = function (...args) {
    this.expose(propertyKey)
    return init.apply(this, args);
  }
  return {
    value: function (...args: any[]) {
      var result = descriptor.value.apply(this, args);
      return result;
    }
  }
}

let name_prefix = ['假细心', '放荡', '淫贱', '荒唐', '离谱', '头尖额窄无厘贵格', '肚满肠肥', '两面三刀', '反革命', '红卫兵', '沙沙尘尘', '猪甘蠢', '猪', '无脑', '大唔透', '玩世不恭', '眼大无神', '大细超', '白鸽眼', '咸湿', '浪漫', '靓仔', '靓女', '猛男', '咸猪手', '西施', '好色', '色狼', '色魔', '畜牲', '食碗面反碗底', '抵死', '恶死', '曾眉凸眼', '眉耒眼去', '狐狸精', '二手货', '无离头', '大快活', '井底蛙', '伟大', '墙头草', '平易近人', '贪心', '贪得无厌', '有良心', '牙尖嘴利', '牙刷刷', '大手笔', '孤寒', '怕死', '胆生毛', '胆粗粗', '神经病', '不拘小节', '狠毒', '开朗', '开明', '开通', '固执', '醒目', '钝', '好', '坏', '有情', '负心', '出风头', '演野', '八卦', '麻甩佬', '霎熟狗头', '衰婆', '八婆']

let name_infix = ['马尔科姆', '琼', '尼基', '贝蒂', '琳达', '惠特尼', '丽丽', '芭芭拉', '伊丽莎白', '海伦', '凯瑟琳', '李', '安', '戴安娜', '菲奥纳', '朱迪', '杜丽丝', '鲁迪', '阿曼达', '雪莉', '琼', '特蕾西', '雪莉', '爱米莉', '索菲亚', '维维安', '莉莉安', '乔埃', '罗丝', '朱莉', '格罗里亚', '卡萝尔', '泰勒', '温迪', '格里斯', '维维安', '卡罗琳', '萨曼达', '玛利亚', '凯特', '戴米', '萨妮', '温迪', '阿瓦', '克里斯蒂娜', '朱迪', '苏珊', '格里斯', '爱丽丝', '乔西', '萨丽', '玛格莉特', '丽贝卡', '特里莎', '里塔', '杰西卡', '伊丽莎白', '凯丽', '玫', '朱莉', '阿曼达', '菲奥纳']

let name_suffix = ['', '二世', '·默罕穆德']
export function RandomName() {
  return name_prefix[Math.floor(Math.random() * name_prefix.length)] + '的' + name_infix[Math.floor(Math.random() * name_infix.length)] + name_suffix[Math.floor(Math.random() * name_suffix.length)];
}