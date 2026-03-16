<template>
	<view class="page">
		<view class="result-section">
			<view class="card">
			  <view class="name">{{ result.name }}</view>
			  <view class="section"><text class="label">生肖：</text>{{ result.chineseZodiac }}</view>
			  <view class="section"><text class="label">星座：</text>{{ result.constellation }}</view>
			  <view class="section"><text class="label">综合评分：</text>{{ result.score }}</view>
			  <view class="section"><text class="label">寓意：</text>{{ result.meaning }}</view>
			  <view class="section"><text class="label">诗词：</text>{{ result.poem }}</view>
			   <view class="section"><text class="label">字形：</text>{{ result.glyph }}</view>
				<view class="section"><text class="label">音律：</text>{{ result.temperament }}</view>
				 <view class="section"><text class="label">五行：</text>{{ result.fiveele }}</view>
				  <view class="section"><text class="label">重名率：</text>{{ result.samerate }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { requestDoubao } from '@/util/api.js'
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
const result = ref(null)
// 表单数据
const formData = ref({
  surname: '',
  name: '',
  gender: '0',
  birthday: ''
})
onLoad((options) => {
	formData.value = JSON.parse(decodeURIComponent(options.form));
	console.log('onLoad score======', formData.value)
	generateName()
})
async function generateName() {
	const genderName = formData.value.gender === '0' ? '男孩' : formData.value.gender === '1' ? '女孩' : ''
	const nameNum = formData.value.nameType === 'all' ? '2或3' : formData.value.nameType
	const birthTxt = formData.value.birthday ? `请分析出生日期${formData.value.birthday}的生肖和星座` : ''
	const prompt = `
	  ${birthTxt ? birthTxt : ''},请给${genderName ? genderName : ''}名字【${formData.value.surname}${formData.value.name}】从寓意、诗词溯源、字形、音律、五行、重名率等六个方面打分。
	  返回格式严格用JSON，不要其他内容：
	  {
	    "name":"名字",
		"score": "综合评分",
		"chineseZodiac": "生肖",
		"constellation": 星座",
	    "meaning":"寓意",
	    "poem":"诗词溯源",
		  "glyph": "字形",
		  "temperament": "音律",
		  "fiveele": "五行",
		  "samerate": "重名率"
	  }
	`
	console.log('prompt----', prompt)
	console.log('formData-----', formData)
	uni.showLoading({
		title: '生成中...'
	})
	// return
	let text = await requestDoubao([{ role: 'user', content: prompt }])
	console.log('text-----', text, JSON.parse(text))
	uni.hideLoading()
	try {
	  result.value = JSON.parse(text)[0]
	  console.log('result', result.value)
	} catch (e) {
	  console.log('catch e----', e)
	  uni.showToast({ icon: 'none', title: '解析失败' })
	}
}
</script>

<style scoped>
.page {
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
  position: relative;
  padding-bottom: 100rpx;
}
/* 结果区 */
.result-section {
  margin: 0 20rpx 20rpx;
}

.card {
  background: #fff8f8; /* #f8fdff; #fff; */
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.name {
  font-size: 48rpx;
  color: #1a365d;
  text-align: center;
  margin: 20rpx 0;
  font-weight: bold;
}

.section {
  margin: 10rpx 0;
  line-height: 1.6;
}

.label {
  color: #1a365d;
  font-weight: bold;
}

.flex-row {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
  justify-content: center;
}

.change-btn {
  padding: 15rpx 40rpx;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 8rpx;
  font-size: 26rpx;
  border: none;
}
</style>