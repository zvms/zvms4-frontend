import type { ActivityMember } from 'types/activity.v2';

export { default as categories } from './categories.json'

export function composeDurationRecommendation(lte?: number, gte?: number, unlimited?: boolean, documented?: boolean, lang?: string, attachment?: number): string {
  const attachmentText = {
    1: lang === 'zh-CN' ? "附件一《常见义工活动时间核准参照表Ⅰ》" : "Attachment I: Common Volunteer Activity Time Approval Reference Table",
    2: lang === 'zh-CN' ? "附件二《常见义工活动时间核准参照表Ⅱ》" : "Attachment II: Common Volunteer Activity Time Approval Reference Table",
  }
  const attachmentName = (attachment === 1) ? attachmentText[1] : (attachment === 2 ? attachmentText[2] : '')
  const base = lang === 'zh-CN' ? `根据《镇海中学学生义工管理细则》（2025 年 2 月修订）${attachmentName}，` : `According to the 'Volunteer Management Regulations of Zhenhai High School' (Revised in February 2025) ${attachmentName}, `;
  if (lte && !gte && !unlimited) {
    return base + (lang === 'zh-CN' ? `该义工时长发放不应超过 ${lte} 小时。` : `The volunteer hours granted should not exceed ${lte} hours.`);
  }
  if (gte && !lte && !unlimited) {
    return base + (lang === 'zh-CN' ? `该义工时长发放不应低于 ${gte} 小时。` : `The volunteer hours granted should not be less than ${gte} hours.`);
  }
  if (lte && gte && !unlimited) {
    return base + (lang === 'zh-CN' ? `该义工时长发放应在 ${gte} 至 ${lte} 小时之间。` : `The volunteer hours granted should be between ${gte} and ${lte} hours.`);
  }
  if (unlimited && !documented) {
    return base + (lang === 'zh-CN' ? `在该计入模式下封顶全满（中途退出减一半以上）。` : `In this mode, the cap is full (exiting halfway counts as more than half).`);
  }
  if (unlimited && documented) {
    return base + (lang === 'zh-CN' ? `在该计入模式下封顶全满（视成果分层发放）。` : `In this mode, the cap is full (distribution is based on results).`);
  }
  return '';
}
