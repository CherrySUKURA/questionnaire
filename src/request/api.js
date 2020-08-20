import {get,post} from './http'

export const aiAddress = p => get('/sys/questionnaire/getTitleInfo',p)
export const Questionnaireinfo = p => post('/sys/questionnaire/getQuestionnaireInfo',p)
export const prizeInfo = p => get('/sys/questionnaire/getPrizeInfo',p)
export const PrizeRuleInfo = p => get('/sys/questionnaire/getPrizeRuleInfo',p)
export const Random = p => get('/sys/questionnaire/getRandom',p)
export const UserInfoPhone = p => get('/sys/questionnaire/getUserInfo',p)