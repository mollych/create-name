// 豆包API配置（替换成你自己的key）
import { API_CONFIG } from './config.js'
const API_KEY = API_CONFIG.API_KEY
const API_URL = API_CONFIG.API_URL
console.log('API_KEY--------', API_KEY)
// 统一请求豆包API
export async function requestDoubao(messages) {
  try {
	  /* let res = {
		  "data": 
				{"choices":[{"finish_reason":"stop","index":0,"logprobs":null,"message":{"content":"[{\n    \"name\":\"杨紫\",\n    \"score\": \"85\",\n    \"chineseZodiac\": \"兔\",\n    \"constellation\": \"水瓶座\",\n    \"meaning\":\"杨姓是中国最常见的姓氏之一，具有深厚的历史文化底蕴。紫字在传统文化中代表着高贵、神秘和祥瑞，常用于形容珍贵、美好的事物。\",\n    \"poem\":\"暂无相关诗词\",\n    \"glyph\": \"杨紫的字形简洁明快，易于书写和识别。\",\n    \"temperament\": \"杨紫的音律优美动听，读起来朗朗上口。\",\n    \"fiveele\": \"杨紫的五行属性为木，与水相生，具有生机勃勃、积极向上的特点。\",\n    \"samerate\": \"杨紫是一个比较常见的名字，重名率相对较高。\"\n}]","role":"assistant"}}],"created":1773655019,"id":"02177365501574170efbf1cf5c1ae3d0b3f284807454d29816b57","model":"doubao-lite-32k-character-250228","service_tier":"default","object":"chat.completion","usage":{"completion_tokens":181,"prompt_tokens":172,"total_tokens":353,"prompt_tokens_details":{"cached_tokens":0},"completion_tokens_details":{"reasoning_tokens":0}}}
		
		}
		console.log('requestDoubao reuqest-----', res)
		return res.data?.choices?.[0]?.message?.content || "生成失败" */
	
	
	/* let res = {
		"data": {
			"choices": [{
				"finish_reason": "stop",
				"index": 0,
				"logprobs": null,
				"message": {
					"content": "[{\n  \"name\":\"张逸飞\",\n  \"meaning\":\"逸有着飞扬、超越之意，飞代表着高高飞翔，象征着追求自由、积极向上，寓意着男孩能够自由自在地追逐梦想，不断超越自我。\",\n  \"poem\":\"长风破浪会有时，直挂云帆济沧海。——李白《行路难·其一》\",\n  \"glyph\": \"逸字为半包围结构，飞字为单一结构，整体字形搭配合理，书写美观。\",\n  \"temperament\": \"该名字读音为平仄，朗朗上口，富有节奏感。\",\n  \"fiveele\": \"逸字五行属土，飞字五行属水，土克水，寓意着男孩能够在生活中克服困难，勇往直前。\",\n  \"samerate\": \"重名率相对较低。\"\n},\n{\n  \"name\":\"张宇轩\",\n  \"meaning\":\"宇有广阔无垠之意，轩表示气宇轩昂，象征着男孩有着广阔的胸怀和不凡的气质，寓意着他能够在未来的人生道路上展现出自己的风采。\",\n  \"poem\":\"会当凌绝顶，一览众山小。——杜甫《望岳》\",\n  \"glyph\": \"宇字为上下结构，轩字为左右结构，字形结构稳定，给人一种稳重的感觉。\",\n  \"temperament\": \"名字的音律为平仄，读起来顺口且响亮。\",\n  \"fiveele\": \"宇字五行属土，轩字五行属土，土生金，寓意着男孩能够拥有坚强的意志和出色的才华。\",\n  \"samerate\": \"重名率适中。\"\n},\n{\n  \"name\":\"张睿渊\",\n  \"meaning\":\"睿表示聪明、睿智，渊代表深邃、有内涵，寓意着男孩聪明伶俐，有着深厚的学识和内涵，是一个有智慧的人。\",\n  \"poem\":\"问渠那得清如许？为有源头活水来。——朱熹《观书有感·其一》\",\n  \"glyph\": \"睿字为上下结构，渊字为左右结构，书写时注意笔画的搭配，整体较为美观。\",\n  \"temperament\": \"该名字的音律为仄平，平仄相间，富有韵律感。\",\n  \"fiveele\": \"睿字五行属金，渊字五行属水，金生水，象征着男孩的智慧如同源源不断的水流，不断丰富和充实自己。\",\n  \"samerate\": \"重名率不高。\"\n},\n{\n  \"name\":\"张晨熙\",\n  \"meaning\":\"晨代表着早晨，朝气蓬勃，熙表示光明、和乐，寓意着男孩充满活力，生活幸福美满，给人一种积极向上的感觉。\",\n  \"poem\":\"一年之计在于春，一日之计在于晨。——萧绎《纂要》\",\n  \"glyph\": \"晨字为上下结构，熙字为上下结构，结构紧凑，书写流畅。\",\n  \"temperament\": \"名字的读音为平平，音韵和谐，朗朗上口。\",\n  \"fiveele\": \"晨字五行属金，熙字五行属水，金水相生，寓意着男孩的生活充满希望和活力。\",\n  \"samerate\": \"重名率相对较低。\"\n},\n{\n  \"name\":\"张梓豪\",\n  \"meaning\":\"梓有生机勃勃、茁壮成长之意，豪代表豪迈、豪爽，象征着男孩有着强大的生命力和豪爽的性格，寓意着他能够在人生的道路上勇往直前，成就一番事业。\",\n  \"poem\":\"恰同学少年，风华正茂；书生意气，挥斥方遒。——毛泽东《沁园春·长沙》\",\n  \"glyph\": \"梓字为左右结构，豪字为上下结构，字形美观大方，易于书写。\",\n  \"temperament\": \"该名字的音律为仄平，读起来响亮有力，富有气势。\",\n  \"fiveele\": \"梓字五行属木，豪字五行属水，水生木，寓意着男孩能够得到贵人相助，事业顺利。\",\n  \"samerate\": \"重名率适中。\"\n}]",
					"role": "assistant"
				}
			}],
			"created": 1773383904,
			"id": "0217733838868918f8ea30227d9931fee346cda39788dd1c4889a",
			"model": "doubao-lite-32k-character-250228",
			"service_tier": "default",
			"object": "chat.completion",
			"usage": {
				"completion_tokens": 916,
				"prompt_tokens": 126,
				"total_tokens": 1042,
				"prompt_tokens_details": {
					"cached_tokens": 0
				},
				"completion_tokens_details": {
					"reasoning_tokens": 0
				}
			}
		}
	}
	console.log('requestDoubao reuqest-----', res)
	return res.data?.choices?.[0]?.message?.content || "生成失败" */
	
    let res = await uni.request({
      url: API_URL,
      method: "POST",
      header: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      data: {
        model: "doubao-lite-32k-character-250228",
        messages: messages
      }
    })
	
    return res.data?.choices?.[0]?.message?.content || "生成失败"
  } catch (err) {
    console.error(err)
    uni.showToast({ icon: "none", title: "API请求失败" })
    return ""
  }
}