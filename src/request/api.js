import {get,post} from './http'

export const aiAddress = p => get('/questionnaire/getTitleInfo',p)
export const Questionnaireinfo = p => post('/questionnaire/getQuestionnaireInfo',p)
export const prizeInfo = p => get('/questionnaire/getPrizeInfo',p)
export const PrizeRuleInfo = p => get('/questionnaire/getPrizeRuleInfo',p)
export const Random = p => get('/questionnaire/getRandom',p)
export const UserInfoPhone = p => get('/questionnaire/getUserInfo',p)